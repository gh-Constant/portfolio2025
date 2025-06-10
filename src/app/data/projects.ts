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
    image: '/images/Chronosync.png',
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
    title: 'Roblox Inventory',
    description: 'Inventory System for games featuring Drag&Drop, item size system, hotbar etc (inspired of Tarkov inventory).',
    image: '/images/InventoryRoblox.png',
    tags: ['Roblox', 'Lua', 'UI/UX'],
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
    title: 'Pauvocoder',
    description: 'Simplified implementation of a vocoder allowing audio signal manipulation, specifically focused on pitch shifting while preserving the speech tempo.',
    image: '/images/Pauvocoder.PNG',
    tags: ['Java'],
    size: 'medium',
    longDescription: 'Pauvocoder is a sophisticated audio processing application that implements vocoder technology for real-time audio manipulation. The project focuses on pitch shifting algorithms while maintaining speech intelligibility and temporal characteristics.',
    year: '2024',
    technologies: ['Java', 'Audio Processing', 'Signal Processing'],
    sections: [
      {
        type: 'title',
        content: 'Audio Processing Innovation'
      },
      {
        type: 'text',
        content: 'This project implements advanced vocoder algorithms for real-time audio manipulation, focusing on pitch shifting while preserving speech tempo and clarity. The application demonstrates deep understanding of digital signal processing principles.'
      },
      {
        type: 'image',
        image: '/images/Pauvocoder.PNG',
        caption: 'Pauvocoder interface showing real-time audio processing controls and visualization'
      },
      {
        type: 'title',
        content: 'Technical Implementation'
      },
      {
        type: 'text',
        content: 'Built with Java, the application utilizes advanced signal processing techniques including FFT analysis, phase vocoding, and time-domain pitch shifting algorithms to achieve high-quality audio manipulation.'
      }
    ]
  },
  {
    id: '4',
    title: 'PuissanceX',
    description: 'A modified version of Connect 4 with X win condition created in Java with the framework Boardifier.',
    image: '/images/PuissanceX.PNG',
    tags: ['Java', 'JavaFX', 'JUnit', 'Maven'],
    size: 'large',
    longDescription: 'PuissanceX is an innovative take on the classic Connect 4 game, introducing dynamic win conditions and enhanced gameplay mechanics. Built with modern Java technologies and following best practices for game development.',
    year: '2024',
    technologies: ['Java', 'JavaFX', 'JUnit', 'Maven', 'Boardifier Framework'],
    sections: [
      {
        type: 'title',
        content: 'Game Design Innovation'
      },
      {
        type: 'text',
        content: 'PuissanceX reimagines the classic Connect 4 game by introducing variable win conditions and enhanced gameplay mechanics. The project demonstrates advanced object-oriented programming and game development principles.'
      },
      {
        type: 'image',
        image: '/images/PuissanceX.PNG',
        caption: 'PuissanceX game interface showing the enhanced Connect 4 gameplay with dynamic win conditions'
      },
      {
        type: 'title',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'Developed using the Boardifier framework with JavaFX for the user interface, the project follows MVC architecture patterns and includes comprehensive unit testing with JUnit. Maven is used for dependency management and build automation.'
      }
    ]
  }
];