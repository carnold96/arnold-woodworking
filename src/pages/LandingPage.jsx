import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, Soup, RectangleHorizontal, Armchair, UtensilsCrossed, Shapes, Wrench } from 'lucide-react';
import projects from '../data/projects.json';
import { getImageUrl } from '../utils/imagePath';

const categories = [
  { id: 'all', name: 'All Projects', icon: Grid3X3 },
  { id: 'bowls', name: 'Bowls', icon: Soup },
  { id: 'cutting-boards', name: 'Cutting Boards', icon: RectangleHorizontal },
  { id: 'furniture', name: 'Furniture', icon: Armchair },
  { id: 'kitchen-utensils', name: 'Kitchen Utensils', icon: UtensilsCrossed },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: Shapes },
  { id: 'tools', name: 'Tools', icon: Wrench },
];

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Handmade Woodworking</h1>
          <p className="text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            A catalogue of nearly all the woodworking projects I've dont. Ranging from wine stoppers to dining room tables,
            I look to work on interesting and new designs that help me grow my ability
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
                    activeCategory === category.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-black/40 transition-all duration-300 hover:-translate-y-1 border border-white/10 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getImageUrl(project.thumbnail)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                    {project.categoryName}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-white/60">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
