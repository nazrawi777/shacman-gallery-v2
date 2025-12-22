export type ProjectCategory =
  | 'all'
  | 'high-rise'
  | 'villas-residential'
  | 'commercial-offices'
  | 'hospitality-hotels'
  | 'healthcare'
  | 'education'
  | 'infrastructure'
  | 'industrial'
  | 'sustainable-green'
  | 'iconic-landmark';

export interface ProjectMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  aspectRatio?: number;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  year: number;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  media: ProjectMedia[];
  featured?: boolean;
}

export const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'high-rise', label: 'High-Rise Buildings' },
  { id: 'villas-residential', label: 'Villas & Residential' },
  { id: 'commercial-offices', label: 'Commercial & Offices' },
  { id: 'hospitality-hotels', label: 'Hospitality & Hotels' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'sustainable-green', label: 'Sustainable & Green' },
  { id: 'iconic-landmark', label: 'Iconic & Landmark' },
];
