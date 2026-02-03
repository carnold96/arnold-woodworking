#!/usr/bin/env python3
"""
Generate projects.json from Google Drive folder structure and sync images locally.

Performs incremental sync:
    - Only downloads new or modified files (compares size and MD5 checksum)
    - Removes local files that no longer exist in Google Drive
    - Cleans up empty directories
    - Sorts images by date (newest first) within each project
    - Uses the newest image as the project thumbnail
    - Sorts projects by their newest image date

Requirements:
    pip install google-api-python-client requests

Setup:
    1. Create a Google Cloud project at console.cloud.google.com
    2. Enable the Google Drive API
    3. Create an API key (for public folders) or Service Account credentials
    4. Set the GOOGLE_API_KEY environment variable or place credentials.json in this directory
    5. Set GOOGLE_DRIVE_FOLDER_ID to your root folder ID

Folder structure expected in Google Drive:
    Root Folder/
    ├── Bowls/
    │   ├── Project Name 1/
    │   │   ├── image1.jpg
    │   │   └── image2.jpg
    │   └── Project Name 2/
    │       └── ...
    ├── Furniture/
    │   └── ...
    └── ...

Local output structure:
    public/images/
    ├── bowls/
    │   ├── project-name-1/
    │   │   ├── image1.jpg
    │   │   └── image2.jpg
    │   └── project-name-2/
    │       └── ...
    └── furniture/
        └── ...
"""

import hashlib
import json
import os
import re
from pathlib import Path

import requests
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


def compute_md5(file_path):
    """Compute MD5 checksum of a local file."""
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def file_needs_update(local_path, remote_size, remote_md5):
    """Check if a local file needs to be updated based on remote metadata."""
    if not local_path.exists():
        return True

    # Check file size first (quick check)
    local_size = local_path.stat().st_size
    if remote_size and local_size != int(remote_size):
        return True

    # Check MD5 if available
    if remote_md5:
        local_md5 = compute_md5(local_path)
        if local_md5 != remote_md5:
            return True

    return False

# Configuration - set these via environment variables
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
GOOGLE_DRIVE_FOLDER_ID = os.environ.get('GOOGLE_DRIVE_FOLDER_ID')

# Web-compatible image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}

# MIME types for images and their file extensions
IMAGE_MIME_TYPES = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp'
}

# MIME type for folders
FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder'


def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text


def get_drive_service():
    """Create and return a Google Drive API service instance."""
    if not GOOGLE_API_KEY:
        raise ValueError(
            "GOOGLE_API_KEY environment variable not set. "
            "Get an API key from console.cloud.google.com"
        )
    return build('drive', 'v3', developerKey=GOOGLE_API_KEY)


def list_folders(service, parent_id):
    """List all folders within a parent folder."""
    query = f"'{parent_id}' in parents and mimeType='{FOLDER_MIME_TYPE}' and trashed=false"
    results = service.files().list(
        q=query,
        fields="files(id, name)",
        orderBy="name"
    ).execute()
    return results.get('files', [])


def list_images(service, folder_id):
    """List all images within a folder."""
    # Build query for image MIME types
    mime_queries = [f"mimeType='{mt}'" for mt in IMAGE_MIME_TYPES.keys()]
    mime_filter = f"({' or '.join(mime_queries)})"
    query = f"'{folder_id}' in parents and {mime_filter} and trashed=false"

    results = service.files().list(
        q=query,
        fields="files(id, name, mimeType, size, md5Checksum, createdTime)",
        orderBy="name"
    ).execute()
    return results.get('files', [])


def download_image(file_id, dest_path, api_key):
    """Download an image from Google Drive to a local path."""
    # Use the Drive API download URL with API key
    url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&key={api_key}"

    response = requests.get(url, stream=True)

    if response.status_code == 200:
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    else:
        print(f"    Failed to download {file_id}: HTTP {response.status_code}")
        return False


def get_file_extension(filename, mime_type):
    """Get file extension from filename or mime type."""
    ext = Path(filename).suffix.lower()
    if ext in IMAGE_EXTENSIONS:
        return ext
    # Fall back to mime type
    return IMAGE_MIME_TYPES.get(mime_type, '.jpg')


def get_image_date(img):
    """Extract date from image, preferring createdTime, then filename pattern."""
    # Try createdTime from Google Drive metadata
    created_time = img.get('createdTime')
    if created_time:
        # Format: 2024-01-15T10:30:00.000Z
        return created_time[:10]  # Returns YYYY-MM-DD

    # Fall back to filename pattern (YYYYMMDD)
    name = img.get('name', '')
    match = re.search(r'(\d{4})(\d{2})(\d{2})', name)
    if match:
        year, month, day = match.groups()
        return f"{year}-{month}-{day}"

    return "1970-01-01"  # Default for sorting


def sort_images_by_date(images):
    """Sort images by date, newest first."""
    return sorted(images, key=lambda img: get_image_date(img), reverse=False)


def main():
    if not GOOGLE_DRIVE_FOLDER_ID:
        raise ValueError(
            "GOOGLE_DRIVE_FOLDER_ID environment variable not set. "
            "Find this in your Google Drive folder URL: "
            "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE"
        )

    print(f"Connecting to Google Drive...")
    service = get_drive_service()

    script_dir = Path(__file__).parent.resolve()
    images_dir = script_dir / "public" / "images"

    # Remove old symlink if it exists
    if images_dir.is_symlink():
        images_dir.unlink()

    # Create images directory if it doesn't exist
    images_dir.mkdir(parents=True, exist_ok=True)

    # Track all current files to detect orphans later
    current_files = set()

    projects = []

    # Get category folders from root
    print(f"Fetching categories from folder: {GOOGLE_DRIVE_FOLDER_ID}")
    category_folders = list_folders(service, GOOGLE_DRIVE_FOLDER_ID)

    if not category_folders:
        print("No category folders found. Make sure:")
        print("  1. The folder ID is correct")
        print("  2. The folder is shared publicly (Anyone with the link)")
        print("  3. The API key has access to Google Drive API")
        return

    for category_folder in category_folders:
        category_name = category_folder['name']
        category_id = category_folder['id']
        category_slug = slugify(category_name)

        print(f"Processing category: {category_name}")

        # Get project folders within this category
        project_folders = list_folders(service, category_id)

        for project_folder in project_folders:
            project_name = project_folder['name']
            project_id = project_folder['id']
            project_slug = slugify(project_name)

            # Get images in this project folder
            images = list_images(service, project_id)

            if not images:
                print(f"  Skipping {project_name}: no images found")
                continue

            # Sort images by date (newest first)
            images = sort_images_by_date(images)
            newest_image_date = get_image_date(images[0])

            print(f"  Processing: {project_name} ({len(images)} images, newest: {newest_image_date})")

            # Create project directory
            project_dir = images_dir / category_slug / project_slug
            project_dir.mkdir(parents=True, exist_ok=True)

            # Download images and build local paths with timestamps
            images_dict = {}
            for idx, img in enumerate(images):
                file_id = img['id']
                filename = img['name']
                mime_type = img.get('mimeType', 'image/jpeg')
                remote_size = img.get('size')
                remote_md5 = img.get('md5Checksum')
                created_time = img.get('createdTime', '1970-01-01T00:00:00.000Z')

                # Generate clean filename (lowercase and slugified)
                ext = get_file_extension(filename, mime_type)
                # Slugify the filename (without extension)
                name_without_ext = Path(filename).stem
                safe_filename = f"{slugify(name_without_ext)}{ext}"

                local_path = project_dir / safe_filename
                web_path = f"/images/{category_slug}/{project_slug}/{safe_filename}"

                # Track this file as current
                current_files.add(local_path)

                # Check if file needs to be downloaded/updated
                if file_needs_update(local_path, remote_size, remote_md5):
                    print(f"    Downloading: {filename}")
                    if download_image(file_id, local_path, GOOGLE_API_KEY):
                        images_dict[web_path] = created_time
                else:
                    print(f"    Up to date: {filename}")
                    images_dict[web_path] = created_time

            if not images_dict:
                print(f"  Skipping {project_name}: no images downloaded")
                continue

            # Use newest image date for project date (YYYY-MM format)
            project_date = newest_image_date[:7]  # YYYY-MM

            # Find thumbnail: prefer image named "thumbnail", otherwise use newest
            image_paths = list(images_dict.keys())
            thumbnail_path = image_paths[0]  # Default to newest image
            for path in image_paths:
                filename = path.split('/')[-1].lower()
                if filename.startswith('thumbnail.'):
                    thumbnail_path = path
                    break

            project = {
                "id": project_slug,
                "title": project_name,
                "category": category_slug,
                "categoryName": category_name,
                "thumbnail": thumbnail_path,
                "images": images_dict,
                "description": f"Handcrafted {project_name.lower()} from the {category_name} collection.",
                "date": project_date
            }

            projects.append(project)
            print(f"  Added: {project_name} ({len(images_dict)} images)")

    # Sort projects by date (newest first)
    projects.sort(key=lambda p: p["date"], reverse=False)

    # Clean up orphaned files (files that exist locally but not in Drive)
    print("\nChecking for orphaned files...")
    orphan_count = 0
    for file_path in images_dir.rglob('*'):
        if file_path.is_file() and file_path not in current_files:
            print(f"  Removing orphan: {file_path.relative_to(images_dir)}")
            file_path.unlink()
            orphan_count += 1

    # Remove empty directories
    for dir_path in sorted(images_dir.rglob('*'), reverse=True):
        if dir_path.is_dir() and not any(dir_path.iterdir()):
            print(f"  Removing empty dir: {dir_path.relative_to(images_dir)}")
            dir_path.rmdir()

    if orphan_count > 0:
        print(f"Removed {orphan_count} orphaned files")

    # Write to projects.json
    output_path = script_dir / "src" / "data" / "projects.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)

    print(f"\nGenerated {len(projects)} projects")
    print(f"Images synced to: {images_dir}")
    print(f"Saved to: {output_path}")


if __name__ == "__main__":
    main()