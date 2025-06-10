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
    image: '/images/Chronosync.png',
    tags: ['Nuxt.Js', 'Vue.Js', 'Tailwind CSS', 'C++ Application', 'Express.Js', 'PostgreSQL'],
    link: 'https://example.com',
    featured: true,
    size: 'large'
  },
  {
    id: '2',
    title: 'Roblox Inventory',
    description: 'Inventory System for games featuring Drag&Drop, item size system, hotbar etc (inspired of Tarkov inventory).',
    image: '/images/InventoryRoblox.png',
    tags: ['Roblox', 'Lua', 'UI/UX'],
    featured: true,
    size: 'medium'
  },
  {
    id: '3',
    title: 'Pauvocoder',
    description: 'Simplified implementation of a vocoder allowing audio signal manipulation, specifically focused on pitch shifting while preserving the speech tempo.',
    image: '/images/Pauvocoder.png',
    tags: ['Java'],
    size: 'medium'
  },
  {
    id: '4',
    title: 'PuissanceX',
    description: 'A modified version of Connect 4 with X win condition created in Java with the framework Boardifier.',
    image: '/images/PuissanceX.png',
    tags: ['Java', 'JavaFX', 'JUnit', 'Maven'],
    size: 'large'
  }
];