# Arnold Woodworking Portfolio


A modern, responsive portfolio website showcasing handcrafted woodworking projects. Built with React 18, Vite, and Tailwind CSS v4.

## Tech Stack

- **React 18** - Component-based UI library
- **React Router DOM 7** - Client-side routing
- **Vite 6** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Icon library

## Project Structure

```
personal_website/
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Router and route definitions
│   ├── index.css              # Global styles (Tailwind imports)
│   ├── components/
│   │   ├── Layout.jsx         # Main layout (header, sidebar, footer)
│   │   └── Logo.jsx           # SVG logo component
│   ├── pages/
│   │   ├── LandingPage.jsx    # Home page with hero and project grid
│   │   ├── CategoryPage.jsx   # Projects filtered by category
│   │   ├── ProjectPage.jsx    # Individual project detail view
│   │   ├── AboutPage.jsx      # Company information
│   │   ├── ContactPage.jsx    # Contact details and hours
│   │   └── QuotePage.jsx      # Quote request form
│   └── data/
│       └── projects.json      # Project data
└── node_modules/              # Dependencies (not tracked)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The optimized output will be in the `dist/` folder.

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | LandingPage | Hero section with category tabs and project grid |
| `/category/:type` | CategoryPage | Projects filtered by category (furniture, decor, outdoor) |
| `/project/:id` | ProjectPage | Individual project with image gallery |
| `/about` | AboutPage | Company philosophy and information |
| `/contact` | ContactPage | Contact details, location, and hours |
| `/quote` | QuotePage | Quote request form |

## How to Modify

### Adding a New Project

Edit `src/data/projects.json` and add a new object:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "category": "furniture",
  "thumbnail": "https://example.com/thumb.jpg",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "description": "A detailed description of the project...",
  "date": "2024-01"
}
```

**Categories:** `furniture`, `decor`, `outdoor`

### Adding a New Page

1. Create a new component in `src/pages/`:

```jsx
// src/pages/NewPage.jsx
export default function NewPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white">New Page</h1>
    </div>
  );
}
```

2. Add the route in `src/App.jsx`:

```jsx
import NewPage from './pages/NewPage';

// Inside the Routes component:
<Route path="/new-page" element={<NewPage />} />
```

3. Add navigation link in `src/components/Layout.jsx`:

```jsx
<Link to="/new-page" className="block py-2 px-4 hover:text-amber-500">
  New Page
</Link>
```

### Modifying the Layout

The main layout is in `src/components/Layout.jsx`. It contains:

- **Header** - Logo and mobile menu toggle
- **Sidebar** - Navigation links (collapsible on mobile)
- **Footer** - Tagline
- **Background** - Fixed wood grain image with overlay

### Changing Styles

This project uses Tailwind CSS. Common customizations:

**Accent color:** Search for `amber-` classes and replace with your color (e.g., `blue-500`)

**Background:** Edit the background image URL in `Layout.jsx`:
```jsx
<div
  className="fixed inset-0 bg-cover bg-center"
  style={{ backgroundImage: 'url("YOUR_IMAGE_URL")' }}
/>
```

**Typography:** The Cormorant Garamond font is loaded in `index.html`. Change the Google Fonts link to use a different font.

### Adding New Categories

1. Add projects with the new category in `projects.json`
2. Update the category tabs in `src/pages/LandingPage.jsx`:

```jsx
const categories = ['All', 'Furniture', 'Decor', 'Outdoor', 'NewCategory'];
```

3. Update the category mapping if needed (categories are lowercase in the data)

## Component Overview

### Layout.jsx
Wraps all pages with consistent header, sidebar navigation, footer, and background. Uses React Router's `<Outlet />` to render child routes.

### LandingPage.jsx
Displays a hero section, category filter tabs, and a responsive grid of project cards. Clicking a category filters the displayed projects.

### ProjectPage.jsx
Shows detailed project view with:
- Image gallery with prev/next navigation
- Thumbnail strip for direct image selection
- Project metadata (title, date, category, description)
- Related projects section

### QuotePage.jsx
Contact form with fields for:
- Name, Email, Phone
- Project Type (dropdown)
- Description (textarea)
- Budget Range, Timeline

## Deployment

The built `dist/` folder can be deployed to any static hosting:

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
Update `vite.config.js` with your base path, then deploy the `dist/` folder.

## License

All rights reserved.
