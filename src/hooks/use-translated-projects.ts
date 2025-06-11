'use client';

import { useState, useEffect } from 'react';
import { getTranslatedProjects, getTranslatedProject, type Project } from '../app/data/projects';
import { useLanguage } from '../app/contexts/LanguageContext';

// Hook to get all translated projects
export const useTranslatedProjects = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const translatedProjects = await getTranslatedProjects(language);
        setProjects(translatedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [language]);

  return { projects, loading, error };
};

// Hook to get a single translated project
export const useTranslatedProject = (projectId: string) => {
  const { language } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const translatedProject = await getTranslatedProject(projectId, language);
        setProject(translatedProject);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId, language]);

  return { project, loading, error };
};