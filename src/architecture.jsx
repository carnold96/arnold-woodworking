import React from 'react';
import { Database, Globe, Layout, Image, FolderOpen, Code } from 'lucide-react';

export default function WoodworkingArchitecture() {
  const layers = [
    {
      title: "Frontend Layer",
      color: "bg-blue-50 border-blue-300",
      items: [
        { name: "React", icon: Code, desc: "Modern UI framework" },
        { name: "React Router", icon: Globe, desc: "Page navigation" },
        { name: "Tailwind CSS", icon: Layout, desc: "Styling" }
      ]
    },
    {
      title: "Content Layer",
      color: "bg-green-50 border-green-300",
      items: [
        { name: "Project Data", icon: FolderOpen, desc: "JSON/CMS" },
        { name: "Image Assets", icon: Image, desc: "Optimized photos" },
        { name: "Categories", icon: Database, desc: "Furniture, Decor, etc." }
      ]
    },
    {
      title: "Hosting Layer",
      color: "bg-purple-50 border-purple-300",
      items: [
        { name: "Vercel/Netlify", icon: Globe, desc: "Static hosting" },
        { name: "CDN", icon: Image, desc: "Fast image delivery" }
      ]
    }
  ];

  const pages = [
    { name: "Landing Page", route: "/", features: "Hero, category tabs" },
    { name: "Category View", route: "/category/:type", features: "Project grid" },
    { name: "Project Detail", route: "/project/:id", features: "Photo gallery, description" }
  ];

  const dataStructure = {
    project: {
      id: "unique-id",
      title: "Dining Table",
      category: "furniture",
      thumbnail: "url",
      images: ["url1", "url2"],
      description: "Walnut dining table...",
      date: "2024-01"
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Woodworking Portfolio Architecture</h1>
        <p className="text-gray-600">Modern, fast, and easy to maintain</p>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-6 mb-8">
        {layers.map((layer, idx) => (
          <div key={idx} className={`border-2 rounded-lg p-6 ${layer.color}`}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{layer.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {layer.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Page Structure */}
      <div className="bg-white rounded-lg border-2 border-gray-300 p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Page Structure</h2>
        <div className="space-y-3">
          {pages.map((page, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-mono text-sm text-blue-600 mb-1">{page.route}</div>
                <div className="font-semibold text-gray-800">{page.name}</div>
                <div className="text-sm text-gray-600">{page.features}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Structure */}
      <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Data Structure</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(dataStructure, null, 2)}
        </pre>
      </div>

      {/* Recommended Tech Stack */}
      <div className="mt-8 bg-amber-100 border-2 border-amber-400 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">💡 Recommended Stack</h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Frontend:</strong> React + React Router + Tailwind CSS</li>
          <li><strong>Image Optimization:</strong> Next.js Image component or Cloudinary</li>
          <li><strong>Content:</strong> JSON files or headless CMS (Sanity/Contentful)</li>
          <li><strong>Hosting:</strong> Vercel or Netlify (free tier works great)</li>
          <li><strong>Gallery:</strong> React library like react-image-gallery or Swiper</li>
        </ul>
      </div>

      {/* User Flow */}
      <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">📱 User Flow</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="px-3 py-2 bg-white rounded-lg border border-blue-300 font-semibold">Landing Page</span>
          <span className="text-2xl">→</span>
          <span className="px-3 py-2 bg-white rounded-lg border border-blue-300 font-semibold">Click Category Tab</span>
          <span className="text-2xl">→</span>
          <span className="px-3 py-2 bg-white rounded-lg border border-blue-300 font-semibold">See Project Grid</span>
          <span className="text-2xl">→</span>
          <span className="px-3 py-2 bg-white rounded-lg border border-blue-300 font-semibold">Click Project</span>
          <span className="text-2xl">→</span>
          <span className="px-3 py-2 bg-white rounded-lg border border-blue-300 font-semibold">View Gallery & Details</span>
        </div>
      </div>
    </div>
  );
}