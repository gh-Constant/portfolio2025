'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object
const translations = {
  en: {
    // Navigation
    'nav.projects': 'PROJECTS',
    'nav.about': 'ABOUT',
    'nav.resume': 'RESUME',
    'nav.contact': 'CONTACT',
    
    // Hero Section
    'hero.title': 'CONSTANT SUCHET',
    
    // Contact Section
    'contact.title': "LET'S WORK\nTOGETHER",
    'contact.button': "Let's Create Something Amazing",
    
    // About Page
    'about.title': 'CONSTANT\nSUCHET',
    'about.subtitle': 'Creative Developer & Designer',
    'about.description': "I'm a passionate full-stack developer with a keen eye for design and user experience. I specialize in creating innovative digital solutions that bridge the gap between functionality and aesthetics.",
    'about.philosophy.title': 'My Philosophy',
    'about.philosophy.description': 'I believe in crafting experiences that not only solve problems but also delight users. Every project is an opportunity to push boundaries and explore new possibilities in the intersection of technology and creativity.',
    'about.skills.title': 'Skills & Expertise',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.design': 'Design',
    'about.skills.tools': 'Tools',
    'about.skills.frontend.tech': 'React, Next.js, TypeScript, Three.js',
    'about.skills.backend.tech': 'Node.js, Python, PostgreSQL, MongoDB',
    'about.skills.design.tech': 'UI/UX, Figma, Adobe Creative Suite',
    'about.skills.tools.tech': 'Git, Docker, AWS, Vercel',
    'about.experience.title': 'Experience',
    'about.experience.description': 'With several years of experience in web development and design, I have worked on diverse projects ranging from e-commerce platforms to interactive web applications. I enjoy collaborating with teams and bringing creative visions to life.',
    'about.contact.title': 'Get In Touch',
    'about.contact.description': "I'm always interested in new opportunities and exciting projects. Whether you have a specific idea in mind or just want to explore possibilities, I'd love to hear from you.",
    'about.contact.button': 'Start a Conversation',
    
    // Projects
    'projects.title': 'SELECTED PROJECTS',
    'projects.viewProject': 'View Project',
    'projects.viewGithub': 'View on GitHub',
    
    // Language Switch
    'language.switch': 'Language',
    'language.english': 'English',
    'language.french': 'Français',
  },
  fr: {
    // Navigation
    'nav.projects': 'PROJETS',
    'nav.about': 'À PROPOS',
    'nav.resume': 'CV',
    'nav.contact': 'CONTACT',
    
    // Hero Section
    'hero.title': 'CONSTANT SUCHET',
    
    // Contact Section
    'contact.title': 'TRAVAILLONS\nENSEMBLE',
    'contact.button': 'Créons Quelque Chose d\'Incroyable',
    
    // About Page
    'about.title': 'CONSTANT\nSUCHET',
    'about.subtitle': 'Développeur Créatif & Designer',
    'about.description': 'Je suis un développeur full-stack passionné avec un œil aiguisé pour le design et l\'expérience utilisateur. Je me spécialise dans la création de solutions numériques innovantes qui comblent le fossé entre fonctionnalité et esthétique.',
    'about.philosophy.title': 'Ma Philosophie',
    'about.philosophy.description': 'Je crois en la création d\'expériences qui non seulement résolvent des problèmes mais ravissent aussi les utilisateurs. Chaque projet est une opportunité de repousser les limites et d\'explorer de nouvelles possibilités à l\'intersection de la technologie et de la créativité.',
    'about.skills.title': 'Compétences & Expertise',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.design': 'Design',
    'about.skills.tools': 'Outils',
    'about.skills.frontend.tech': 'React, Next.js, TypeScript, Three.js',
    'about.skills.backend.tech': 'Node.js, Python, PostgreSQL, MongoDB',
    'about.skills.design.tech': 'UI/UX, Figma, Adobe Creative Suite',
    'about.skills.tools.tech': 'Git, Docker, AWS, Vercel',
    'about.experience.title': 'Expérience',
    'about.experience.description': 'Avec plusieurs années d\'expérience en développement web et design, j\'ai travaillé sur des projets divers allant des plateformes e-commerce aux applications web interactives. J\'aime collaborer avec des équipes et donner vie aux visions créatives.',
    'about.contact.title': 'Prenons Contact',
    'about.contact.description': 'Je suis toujours intéressé par de nouvelles opportunités et des projets passionnants. Que vous ayez une idée spécifique en tête ou que vous souhaitiez simplement explorer les possibilités, j\'aimerais avoir de vos nouvelles.',
    'about.contact.button': 'Commencer une Conversation',
    
    // Projects
    'projects.title': 'PROJETS SÉLECTIONNÉS',
    'projects.viewProject': 'Voir le Projet',
    'projects.viewGithub': 'Voir sur GitHub',
    
    // Language Switch
    'language.switch': 'Langue',
    'language.english': 'English',
    'language.french': 'Français',
  },
};