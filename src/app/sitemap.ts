import { MetadataRoute } from 'next';
import { projects } from './data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://constantsuchet.com'; // TODO: Confirm domain

  // Static routes
  const routes = [
    '',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic project routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
