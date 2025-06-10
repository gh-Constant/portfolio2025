export interface ProjectSection {
  type: 'text' | 'image' | 'title';
  content?: string;
  image?: string;
  caption?: string;
}

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
  // Extended fields for detailed project pages
  longDescription?: string;
  year?: string;
  technologies?: string[];
  sections?: ProjectSection[];
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
    size: 'large',
    longDescription: 'ChronoSync is a comprehensive time management solution designed specifically for developers and creative professionals. The application combines modern web technologies with a native desktop application to provide seamless time tracking across all platforms.',
    year: '2024',
    technologies: ['Nuxt.js', 'Vue.js', 'Tailwind CSS', 'C++', 'Express.js', 'PostgreSQL'],
    sections: [
      {
        type: 'title',
        content: 'Project Overview'
      },
      {
        type: 'text',
        content: 'ChronoSync represents a modern approach to time management, specifically designed for developers and creative professionals. The application seamlessly integrates web and desktop technologies to provide a unified experience across all platforms.'
      },
      {
        type: 'image',
        image: '/images/project1.png',
        caption: 'Main dashboard interface showing time tracking and project management features'
      },
      {
        type: 'title',
        content: 'Technical Implementation'
      },
      {
        type: 'text',
        content: 'The frontend is built with Nuxt.js and Vue.js, leveraging server-side rendering for optimal performance. The backend utilizes Express.js with PostgreSQL for robust data management, while the desktop application is developed in C++ for native performance.'
      }
    ]
  },
  {
    id: '2',
    title: 'Wayfinding System',
    description: 'Modern wayfinding and signage system design for educational institutions. Clean, accessible design with clear visual hierarchy.',
    image: '/images/project2.jpg',
    tags: ['Wayfinding', 'Signage', 'UX Design'],
    featured: true,
    size: 'medium',
    longDescription: 'A comprehensive wayfinding and signage system designed for modern educational institutions, focusing on accessibility, clarity, and visual appeal.',
    year: '2023',
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch'],
    sections: [
      {
        type: 'title',
        content: 'Design Challenge'
      },
      {
        type: 'text',
        content: 'Creating an intuitive wayfinding system for a modern educational campus that serves diverse user groups including students, faculty, visitors, and people with disabilities.'
      },
      {
        type: 'image',
        image: '/images/project2.jpg',
        caption: 'Final signage system implementation showing clear visual hierarchy and accessibility features'
      },
      {
        type: 'title',
        content: 'Design Solution'
      },
      {
        type: 'text',
        content: 'Developed a modular design system with high contrast colors, multiple language support, and tactile elements. The system balances functionality with the institution\'s brand identity.'
      }
    ]
  },
  {
    id: '3',
    title: 'Creative Project 3',
    description: 'Description for your third project. Easy to customize and modify.',
    image: '/images/project3.jpg',
    tags: ['Design', 'Creative'],
    size: 'small',
    longDescription: 'A creative exploration into modern design principles and user experience.',
    year: '2023',
    technologies: ['Figma', 'Adobe Creative Suite'],
    sections: [
      {
        type: 'title',
        content: 'Creative Exploration'
      },
      {
        type: 'text',
        content: 'This project explores the intersection of creativity and functionality in modern digital design, pushing the boundaries of conventional design patterns.'
      },
      {
        type: 'image',
        image: '/images/project3.jpg',
        caption: 'Creative design exploration showcasing innovative visual approaches'
      }
    ]
  },
  {
    id: '4',
    title: 'Creative Project 4',
    description: 'Description for your fourth project. Easy to customize and modify.',
    image: '/images/project4.jpg',
    tags: ['Design', 'Creative'],
    size: 'medium',
    longDescription: 'An innovative approach to solving complex design challenges.',
    year: '2023',
    technologies: ['Figma', 'Adobe Creative Suite'],
    sections: [
      {
        type: 'title',
        content: 'Innovation in Design'
      },
      {
        type: 'text',
        content: 'This project demonstrates innovative solutions to complex design challenges, showcasing a methodical approach to problem-solving in creative contexts.'
      },
      {
        type: 'image',
        image: '/images/project4.jpg',
        caption: 'Innovative design solutions addressing complex user experience challenges'
      }
    ]
  }
];