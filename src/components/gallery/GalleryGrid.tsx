import React, { useState, useMemo, useCallback } from 'react';
import { Project, ProjectCategory } from '@/types/project';
import ProjectCard from './ProjectCard';
import Lightbox from './Lightbox';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface GalleryGridProps {
  projects: Project[];
  activeCategory: ProjectCategory;
  itemsPerPage?: number;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  projects,
  activeCategory,
  itemsPerPage = 12,
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // Reset visible count when category changes
  React.useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [activeCategory, itemsPerPage]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + itemsPerPage, filteredProjects.length));
      setIsLoading(false);
    }, 300);
  }, [itemsPerPage, filteredProjects.length]);

  const openLightbox = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
  }, []);

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mb-6">
          <span className="text-4xl">🏗️</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No projects found
        </h3>
        <p className="text-muted-foreground max-w-md">
          We don't have any projects in this category yet. Check back soon or explore other categories.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Masonry Grid */}
      <section
        id="gallery-grid"
        className="masonry-grid"
        role="tabpanel"
        aria-label="Project gallery"
      >
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => openLightbox(project)}
          />
        ))}
      </section>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className={cn(
              'ripple-btn flex items-center gap-3 px-8 py-4 rounded-full',
              'font-display font-semibold text-sm uppercase tracking-wider',
              'glass-card border border-primary/30 text-primary',
              'hover:glow-primary hover:border-primary/60 transition-all duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Projects
                <span className="text-xs text-muted-foreground">
                  ({filteredProjects.length - visibleCount} remaining)
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Results count */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        Showing {visibleProjects.length} of {filteredProjects.length} projects
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <Lightbox
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={closeLightbox}
        />
      )}
    </>
  );
};

export default GalleryGrid;
