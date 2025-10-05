export interface ProjectSection {
  type: 'text' | 'image' | 'title' | 'video';
  content?: string;
  image?: string;
  video?: string;
  caption?: string;
  muted?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  demo?: string;
  download?: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
  status?: 'available' | 'closed' | 'not-online';
  // Extended fields for detailed project pages
  longDescription?: string;
  year?: string;
  technologies?: string[];
  sections?: ProjectSection[];
}

// Function to load project translations
export const loadProjectTranslation = async (projectId: string, language: 'en' | 'fr') => {
  try {
    const translation = await import(`../../translations/projects/${language}/${projectId}.json`);
    return translation.default;
  } catch {
    console.warn(`Translation not found for project ${projectId} in language ${language}`);
    return null;
  }
};

// Function to get translated project data
export const getTranslatedProject = async (projectId: string, language: 'en' | 'fr'): Promise<Project | null> => {
  const translation = await loadProjectTranslation(projectId, language);
  if (!translation) return null;

  const baseProject = projects.find(p => p.id === projectId);
  if (!baseProject) return null;

  return {
    ...baseProject,
    title: translation.title,
    description: translation.description,
    longDescription: translation.longDescription,
    year: translation.year,
    technologies: translation.technologies,
    sections: translation.sections
  };
};

// Function to get all translated projects
export const getTranslatedProjects = async (language: 'en' | 'fr'): Promise<Project[]> => {
  return await Promise.all(
    projects.map(async (project) => {
      const translatedProject = await getTranslatedProject(project.id, language);
      return translatedProject || project; // Fallback to original if translation fails
    })
  );
};

export const projects: Project[] = [
  {
    id: 'chronosync',
    title: 'ChronoSync',
    description: 'A modern time management app tool built for developers. Designed to help you focus on what matters most.',
    image: '/images/Chronosync.png',
    tags: ['Nuxt.Js', 'Vue.Js', 'Tailwind CSS', 'C++ Application', 'Express.Js', 'PostgreSQL'],
    link: 'https://example.com',
    github: 'https://github.com/gh-Constant/mono-chronosync',
    status: 'closed',
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
        type: 'title',
        content: 'Architecture'
      },
      {
        type: 'image',
        image: '/images/chronosync/nx.png',
        caption: 'Architecture monorepo NX pour une gestion optimisée du projet'
      },
      {
        type: 'text',
        content: 'ChronoSync est construit sur une architecture moderne utilisant un monorepo NX pour une gestion optimisée du code et des dépendances. Cette approche permet une meilleure organisation du code, des builds plus rapides et une maintenance simplifiée entre les différents composants de l\'application.'
      },
      {
        type: 'image',
        image: '/images/chronosync/backend.png',
        caption: 'API Express.js pour la gestion centralisée des données et services'
      },
      {
        type: 'text',
        content: 'Le backend est développé avec Express.js, offrant une API REST robuste et performante. Cette architecture permet une communication fluide entre les applications web et desktop, avec une gestion centralisée des données et de l\'authentification.'
      },
      {
        type: 'title',
        content: 'Authentification Web'
      },
      {
        type: 'image',
        image: '/images/chronosync/login.png',
        caption: 'Interface de connexion web avec système d\'authentification moderne'
      },
      {
        type: 'text',
        content: 'L\'interface de connexion web offre une expérience d\'authentification moderne et intuitive avec un design responsive et une gestion sécurisée des identifiants.'
      },
      {
        type: 'title',
        content: 'Application Desktop'
      },
      {
        type: 'image',
        image: '/images/chronosync/logindesktop.png',
        caption: 'Écran de connexion de l\'application desktop avec style natif'
      },
      {
        type: 'text',
        content: 'L\'application desktop dispose d\'un écran de connexion natif qui s\'intègre parfaitement au système d\'exploitation tout en maintenant les mêmes standards de sécurité que la version web.'
      },
      {
        type: 'title',
        content: 'Gestion des Tokens & URI'
      },
      {
        type: 'video',
        video: '/videos/chronosync/URIshowcase.mp4',
        caption: 'Démonstration des requêtes URI montrant la génération et gestion des tokens d\'authentification',
        muted: true
      },
      {
        type: 'text',
        content: 'Le système d\'authentification démontre comment les requêtes URI gèrent la génération et la gestion des tokens pour un accès sécurisé à l\'application desktop.'
      },
      {
        type: 'title',
        content: 'Fonctionnalités Principales'
      },
      {
        type: 'image',
        image: '/images/chronosync/database.png',
        caption: 'Architecture de base de données et système de gestion des données'
      },
      {
        type: 'image',
        image: '/images/chronosync/email.png',
        caption: 'Système de notifications email pour les mises à jour de projets et rappels'
      },
      {
        type: 'text',
        content: 'L\'application propose un tableau de bord complet pour le suivi du temps, la gestion de projets et l\'analyse de productivité. Les utilisateurs peuvent basculer facilement entre les interfaces web et desktop tout en maintenant des données synchronisées.'
      },
      {
        type: 'title',
        content: 'Algorithmes Avancés'
      },
      {
        type: 'image',
        image: '/images/chronosync/blurryAlgorithm.png',
        caption: 'Algorithme de détection de flou pour le suivi de concentration et mesure de productivité'
      },
      {
        type: 'image',
        image: '/images/chronosync/closeAlgorithm.png',
        caption: 'Algorithme de fermeture de session pour le suivi automatique du temps et préservation des données'
      },
      {
        type: 'text',
        content: 'ChronoSync implémente des algorithmes sophistiqués pour l\'optimisation du temps et l\'analyse de productivité, incluant la détection de flou pour le suivi de concentration et la gestion intelligente des sessions.'
      },
      {
        type: 'title',
        content: 'Intégrations'
      },
      {
        type: 'image',
        image: '/images/chronosync/clickup.png',
        caption: 'Intégration ClickUp pour un workflow de gestion de projet fluide'
      },
      {
        type: 'text',
        content: 'La plateforme s\'intègre parfaitement avec les outils de gestion de projet populaires et fournit un accès API complet pour les workflows personnalisés et applications tierces.'
      },
      {
        type: 'title',
        content: 'Stack Technique'
      },
      {
        type: 'text',
        content: 'Frontend développé avec Nuxt.js et Vue.js, exploitant le rendu côté serveur pour des performances optimales. Backend Express.js avec PostgreSQL pour une gestion robuste des données. Application desktop en C++ pour des performances natives.'
      }
    ]
  },
  {
    id: 'medieval-event',
    title: 'Medieval Event',
    description: 'A comprehensive event management platform for a medieval-themed festival, featuring interactive maps, multilingual support, and real-time updates.',
    image: '/images/medievalevent/logo.png',
    tags: ['Vue.js', 'Express', 'Prisma ORM', 'i18n', 'Tailwind CSS', 'NX CLI', 'Agile', 'Swagger API'],
    link: 'http://livrable.constantsuchet.fr/',
    github: 'https://github.com/gh-Constant/SAE_Project_BUT2',
    status: 'available',
    featured: true,
    size: 'medium',
    longDescription: 'Medieval Event is a modern web application designed to manage and showcase a medieval-themed festival. The platform features interactive maps, multilingual support, user authentication, and real-time event information, providing an immersive experience for festival attendees.',
    year: '2024-2025',
    technologies: ['Vue.js', 'Express', 'Prisma ORM', 'i18n', 'Tailwind CSS', 'NX CLI', 'Auto Deploy', 'Agile', 'Swagger API'],
    sections: [
      {
        type: 'title',
        content: 'Project Overview'
      },
      {
        type: 'text',
        content: 'Medieval Event is a comprehensive event management platform designed specifically for medieval-themed festivals. The application provides attendees with essential information, interactive features, and a seamless user experience across multiple languages.'
      },
      {
        type: 'title',
        content: 'Authentication System'
      },
      {
        type: 'image',
        image: '/images/medievalevent/login.png',
        caption: 'Secure authentication system with modern design and user-friendly interface'
      },
      {
        type: 'text',
        content: 'The platform features a secure authentication system that allows users to create accounts, log in, and access personalized features. The login interface is designed with a medieval aesthetic while maintaining modern usability standards.'
      },
      {
        type: 'title',
        content: 'Interactive Event Map'
      },
      {
        type: 'image',
        image: '/images/medievalevent/interactivemap.png',
        caption: 'Interactive map showing event locations, activities, and points of interest'
      },
      {
        type: 'text',
        content: 'An interactive map helps attendees navigate the festival grounds, locate activities, food vendors, and important facilities. The map provides real-time information and can be easily explored on any device.'
      },
      {
        type: 'title',
        content: 'Multilingual Support'
      },
      {
        type: 'image',
        image: '/images/medievalevent/language.png',
        caption: 'Complete internationalization support with multiple language options for global accessibility'
      },
      {
        type: 'text',
        content: 'The application includes comprehensive i18n support, allowing users to switch between languages seamlessly. This ensures that the festival information is accessible to international visitors and enhances the overall user experience.'
      },
      {
        type: 'title',
        content: 'Technical Implementation'
      },
      {
        type: 'text',
        content: 'Built with Next.js and TypeScript, the platform leverages modern web technologies for optimal performance and maintainability. Tailwind CSS provides a responsive design system, while the i18n implementation ensures seamless multilingual support across all features.'
      }
    ]
  },
  {
    id: 'pauvocoder',
    title: 'Pauvocoder',
    description: 'Simplified implementation of a vocoder allowing audio signal manipulation, specifically focused on pitch shifting while preserving the speech tempo.',
    image: '/images/Pauvocoder.PNG',
    tags: ['Java'],
    github: 'https://github.com/gh-Constant/Pauvocoder',
    status: 'available',
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
    id: 'puissancex',
    title: 'PuissanceX',
    description: 'A modified version of Connect 4 with X win condition created in Java with the framework Boardifier.',
    image: '/images/PuissanceX.PNG',
    tags: ['Java', 'JavaFX', 'JUnit', 'Maven'],
    github: 'https://github.com/gh-Constant/SAE_PuissanceX',
    demo: 'https://youtu.be/BuV9MnWdidI',
    download: 'https://github.com/gh-Constant/SAE_PuissanceX/releases',
    status: 'available',
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
