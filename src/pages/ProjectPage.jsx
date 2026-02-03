import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import projects from '../data/projects.json';
import { getImageUrl } from '../utils/imagePath';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagePaths = project ? project.images : [];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/" className="text-amber-400 hover:text-amber-300 cursor-pointer">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imagePaths.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imagePaths.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header area */}
      <div className="py-8 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-amber-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-black/20 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={getImageUrl(project.images[currentImageIndex])}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                        index === currentImageIndex
                          ? 'border-amber-500'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-fit">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <Link
                  to={`/category/${project.category}`}
                  className="text-sm font-semibold text-amber-400 uppercase tracking-wide hover:text-amber-300 cursor-pointer"
                >
                  {project.categoryName}
                </Link>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>

              <div className="flex items-center gap-2 text-white/60 mb-6">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>

              <p className="text-lg text-white/80 leading-relaxed">
                {project.description}
              </p>

              {/* Related Projects */}
              {projects.filter(p => p.category === project.category && p.id !== project.id).length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">More in {project.categoryName}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {projects
                      .filter(p => p.category === project.category && p.id !== project.id)
                      .slice(0, 2)
                      .map(relatedProject => (
                        <Link
                          key={relatedProject.id}
                          to={`/project/${relatedProject.id}`}
                          className="group cursor-pointer"
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2 border border-white/10">
                            <img
                              src={getImageUrl(relatedProject.thumbnail)}
                              alt={relatedProject.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-medium text-white/80 group-hover:text-amber-300 transition-colors">
                            {relatedProject.title}
                          </h3>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
