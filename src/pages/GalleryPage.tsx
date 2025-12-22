import React, { useState, useMemo } from 'react';
import { ProjectCategory, CATEGORIES } from '@/types/project';
import { PROJECTS } from '@/data/projects';
import FilterBar from '@/components/gallery/FilterBar';
import GalleryGrid from '@/components/gallery/GalleryGrid';

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  // Calculate project counts per category
  const projectCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      all: PROJECTS.length,
      'high-rise': 0, 'villas-residential': 0, 'commercial-offices': 0,
      'hospitality-hotels': 0, 'healthcare': 0, 'education': 0,
      'infrastructure': 0, 'industrial': 0, 'sustainable-green': 0, 'iconic-landmark': 0,
    };
    PROJECTS.forEach((p) => { counts[p.category]++; });
    return counts;
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
            Our Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of Grade 1 construction excellence — from iconic skyscrapers to sustainable innovations.
          </p>
        </header>

        {/* Filter Bar */}
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          projectCounts={projectCounts}
        />

        {/* Gallery Grid */}
        <GalleryGrid
          projects={PROJECTS}
          activeCategory={activeCategory}
          itemsPerPage={12}
        />
      </div>
    </main>
  );
};

export default GalleryPage;
