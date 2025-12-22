import React, { useRef, useEffect, useState } from 'react';
import { CATEGORIES, ProjectCategory } from '@/types/project';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FilterBarProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  projectCounts?: Record<ProjectCategory, number>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onCategoryChange,
  projectCounts,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      className="relative w-full py-6"
      role="navigation"
      aria-label="Project category filters"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />

      <div className="relative flex items-center gap-2">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className={cn(
            'flex-shrink-0 p-2 rounded-full glass-card transition-all duration-300',
            canScrollLeft
              ? 'opacity-100 hover:glow-primary'
              : 'opacity-0 pointer-events-none'
          )}
          aria-label="Scroll filters left"
          tabIndex={canScrollLeft ? 0 : -1}
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        {/* Scrollable filter container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex-1 flex gap-3 overflow-x-auto scrollbar-thin py-2 px-1"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            const count = projectCounts?.[category.id];

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls="gallery-grid"
                className={cn(
                  'filter-btn whitespace-nowrap font-medium',
                  isActive && 'active'
                )}
              >
                <span>{category.label}</span>
                {count !== undefined && (
                  <span
                    className={cn(
                      'ml-2 text-xs px-2 py-0.5 rounded-full transition-colors',
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className={cn(
            'flex-shrink-0 p-2 rounded-full glass-card transition-all duration-300',
            canScrollRight
              ? 'opacity-100 hover:glow-primary'
              : 'opacity-0 pointer-events-none'
          )}
          aria-label="Scroll filters right"
          tabIndex={canScrollRight ? 0 : -1}
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </nav>
  );
};

export default FilterBar;
