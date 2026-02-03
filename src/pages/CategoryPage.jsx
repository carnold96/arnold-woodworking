import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import projects from '../data/projects.json';
import { getImageUrl } from '../utils/imagePath';

export default function CategoryPage() {
  const { type } = useParams();
  const categoryProjects = projects.filter(p => p.category === type);
  const categoryName = categoryProjects.length > 0 ? categoryProjects[0].categoryName : type;

  return (
    <div className="min-h-screen">
      {/* Header area */}
      <div className="py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-amber-300 mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl font-bold drop-shadow-lg">{categoryName}</h1>
          <p className="text-white/80 mt-2 text-lg drop-shadow">
            {categoryProjects.length} project{categoryProjects.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProjects.map(project => (
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
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {categoryProjects.length === 0 && (
            <div className="text-center py-12 text-white/60">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
