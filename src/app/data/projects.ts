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
    title: 'ChronoSync',
    description: 'A modern time management app tool built for developers. Designed to help you focus on what matters most.',
    image: '/images/project1.png',
    tags: ['Nuxt.Js', 'Vue.Js', 'Tailwind CSS', 'C++ Application', 'Express.Js', 'PostgreSQL'],
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