import { Project } from '@/types/project';

// Placeholder images using picsum for demo - will be replaced with generated images
const img = (id: number, w = 800, h = 600) => 
  `https://picsum.photos/seed/construction${id}/${w}/${h}`;

export const PROJECTS: Project[] = [
  {
    id: '1', title: 'Skyline Tower One', location: 'Dubai, UAE', year: 2024,
    category: 'high-rise', categoryLabel: 'High-Rise',
    media: [
      { id: '1a', type: 'image', src: img(1, 800, 1000), alt: 'Skyline Tower exterior' },
      { id: '1b', type: 'image', src: img(2, 800, 600), alt: 'Tower lobby' },
    ]
  },
  {
    id: '2', title: 'Azure Heights Complex', location: 'Singapore', year: 2023,
    category: 'high-rise', categoryLabel: 'High-Rise',
    media: [
      { id: '2a', type: 'image', src: img(3, 800, 1100), alt: 'Azure Heights' },
      { id: '2b', type: 'image', src: img(4, 800, 600), alt: 'Interior view' },
    ]
  },
  {
    id: '3', title: 'Palm Oasis Villa', location: 'Malibu, USA', year: 2024,
    category: 'villas-residential', categoryLabel: 'Villas & Residential',
    media: [
      { id: '3a', type: 'image', src: img(5, 900, 600), alt: 'Palm Oasis exterior' },
      { id: '3b', type: 'image', src: img(6, 800, 600), alt: 'Pool area' },
    ]
  },
  {
    id: '4', title: 'Serenity Estate', location: 'Monaco', year: 2023,
    category: 'villas-residential', categoryLabel: 'Villas & Residential',
    media: [
      { id: '4a', type: 'image', src: img(7, 800, 700), alt: 'Serenity Estate' },
    ]
  },
  {
    id: '5', title: 'Nexus Business Hub', location: 'London, UK', year: 2024,
    category: 'commercial-offices', categoryLabel: 'Commercial & Offices',
    media: [
      { id: '5a', type: 'image', src: img(8, 800, 1000), alt: 'Nexus Hub exterior' },
      { id: '5b', type: 'image', src: img(9, 800, 600), alt: 'Office floor' },
    ]
  },
  {
    id: '6', title: 'Tech Park Central', location: 'Berlin, Germany', year: 2022,
    category: 'commercial-offices', categoryLabel: 'Commercial & Offices',
    media: [
      { id: '6a', type: 'image', src: img(10, 900, 600), alt: 'Tech Park' },
    ]
  },
  {
    id: '7', title: 'Grand Marina Resort', location: 'Bali, Indonesia', year: 2024,
    category: 'hospitality-hotels', categoryLabel: 'Hospitality & Hotels',
    media: [
      { id: '7a', type: 'image', src: img(11, 800, 600), alt: 'Marina Resort' },
      { id: '7b', type: 'image', src: img(12, 800, 800), alt: 'Resort pool' },
    ]
  },
  {
    id: '8', title: 'Alpine Luxury Lodge', location: 'Zermatt, Switzerland', year: 2023,
    category: 'hospitality-hotels', categoryLabel: 'Hospitality & Hotels',
    media: [
      { id: '8a', type: 'image', src: img(13, 800, 700), alt: 'Alpine Lodge' },
    ]
  },
  {
    id: '9', title: 'Metro General Hospital', location: 'Toronto, Canada', year: 2024,
    category: 'healthcare', categoryLabel: 'Healthcare',
    media: [
      { id: '9a', type: 'image', src: img(14, 900, 700), alt: 'Hospital exterior' },
    ]
  },
  {
    id: '10', title: 'Horizon University Campus', location: 'Sydney, Australia', year: 2023,
    category: 'education', categoryLabel: 'Education',
    media: [
      { id: '10a', type: 'image', src: img(15, 800, 600), alt: 'University campus' },
      { id: '10b', type: 'image', src: img(16, 800, 800), alt: 'Library interior' },
    ]
  },
  {
    id: '11', title: 'Cross-Bay Bridge', location: 'San Francisco, USA', year: 2024,
    category: 'infrastructure', categoryLabel: 'Infrastructure',
    media: [
      { id: '11a', type: 'image', src: img(17, 900, 500), alt: 'Bridge view' },
    ]
  },
  {
    id: '12', title: 'Global Logistics Center', location: 'Rotterdam, Netherlands', year: 2023,
    category: 'industrial', categoryLabel: 'Industrial',
    media: [
      { id: '12a', type: 'image', src: img(18, 900, 600), alt: 'Logistics center' },
    ]
  },
  {
    id: '13', title: 'EcoVerde Headquarters', location: 'Copenhagen, Denmark', year: 2024,
    category: 'sustainable-green', categoryLabel: 'Sustainable & Green',
    media: [
      { id: '13a', type: 'image', src: img(19, 800, 900), alt: 'EcoVerde building' },
      { id: '13b', type: 'image', src: img(20, 800, 600), alt: 'Green roof' },
    ]
  },
  {
    id: '14', title: 'The Helix Tower', location: 'Tokyo, Japan', year: 2024,
    category: 'iconic-landmark', categoryLabel: 'Iconic & Landmark',
    media: [
      { id: '14a', type: 'image', src: img(21, 700, 1100), alt: 'Helix Tower' },
    ]
  },
  {
    id: '15', title: 'Coastal Medical Center', location: 'Miami, USA', year: 2023,
    category: 'healthcare', categoryLabel: 'Healthcare',
    media: [
      { id: '15a', type: 'image', src: img(22, 800, 600), alt: 'Medical Center' },
    ]
  },
];
