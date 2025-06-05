export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'ASEAN Student\'s Forum 2024',
    description: 'Visual identity, event design, and publication materials for the ASEAN Student\'s Forum 2024. A comprehensive branding project showcasing cultural diversity and academic excellence.',
    image: '/images/project1.png',
    tags: ['Visual Identity', 'Event Design', 'Publication'],
    link: 'https://example.com',
    featured: true,
    size: 'large'
  },
  {
    id: '2',
    title: 'Wayfinding System',
    description: 'Modern wayfinding and signage system design for educational institutions. Clean, accessible design with clear visual hierarchy.',
    image: '/images/project2.jpg',
    tags: ['Wayfinding', 'Signage', 'UX Design'],
    featured: true,
    size: 'medium'
  },
  {
    id: '3',
    title: 'Creative Project 3',
    description: 'Description for your third project. Easy to customize and modify.',
    image: '/images/project3.jpg',
    tags: ['Design', 'Creative'],
    size: 'small'
  },
  {
    id: '4',
    title: 'Creative Project 4',
    description: 'Description for your fourth project. Easy to customize and modify.',
    image: '/images/project4.jpg',
    tags: ['Design', 'Creative'],
    size: 'medium'
  }
];