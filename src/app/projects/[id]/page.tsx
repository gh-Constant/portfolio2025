'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProjectSection } from '../../data/projects';
import GridLines from '../../components/GridLines';
import { notFound } from 'next/navigation';
import { useTranslatedProject } from '../../../hooks/use-translated-projects';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

function ProjectSectionComponent({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case 'title':
      return (
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="nohemi-heading-lg text-3xl font-bold text-gray-900 mb-12">
            {section.content}
          </h2>
        </div>
      );
    
    case 'text':
      return (
        <div className="max-w-4xl mx-auto mb-16">
          <p className="nohemi-body-regular text-lg text-gray-700 leading-relaxed">
            {section.content}
          </p>
        </div>
      );
    
    case 'image':
      return (
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-50">
            <Image
              src={section.image || ''}
              alt={section.caption || 'Project image'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          {section.caption && (
            <p className="text-center text-gray-500 nohemi-caption mt-6">
              {section.caption}
            </p>
          )}
        </div>
      );
    
    case 'video':
      return (
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <video
              src={section.video || ''}
              controls
              muted={section.muted || false}
              controlsList={section.muted ? "novolume" : undefined}
              disablePictureInPicture={section.muted || false}
              className="w-full h-full object-cover"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          {section.caption && (
            <p className="text-center text-gray-500 nohemi-caption mt-4">
              {section.caption}
            </p>
          )}
        </div>
      );
    
    default:
      return null;
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setProjectId(resolved.id);
    };
    resolveParams();
  }, [params]);

  const { project, loading, error } = useTranslatedProject(projectId);
  
  if (loading) {
    return (
      <div className="relative bg-black min-h-screen w-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  if (error || !project) {
    notFound();
  }

  return (
    <div className="relative bg-black min-h-screen w-full">
        <div className="relative bg-white flex flex-col rounded-b-[4rem] overflow-hidden border-[8px] border-white shadow-xl min-h-screen">
          <GridLines />
          
          {/* Back Button */}
          <div className="absolute top-8 left-8 z-20">
            <Link 
              href="/#projects"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 cursor-hover-target"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>

          <main className="flex-1 relative pt-32 pb-20">
            {/* Hero Section */}
            <section className="relative px-6 mb-20">
              <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Project Image */}
                  <div className="relative">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm nohemi-caption"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h1 className="nohemi-display text-5xl lg:text-6xl font-bold text-black leading-tight">
                        {project.title}
                      </h1>
                      <p className="nohemi-body-regular text-xl text-gray-600 leading-relaxed">
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 gap-6">
                      {project.year && (
                        <div>
                          <h3 className="nohemi-heading-sm font-semibold text-black mb-2">Year</h3>
                          <p className="nohemi-body-light text-gray-600">{project.year}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-8 py-4 bg-black text-white nohemi-heading-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 cursor-hover-target"
                        >
                          View Live Project
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-8 py-4 border-2 border-black text-black nohemi-heading-sm font-medium rounded-full hover:bg-black hover:text-white transition-colors duration-300 cursor-hover-target"
                        >
                          View Code
                          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technologies Section */}
            {project.technologies && (
              <section className="px-6 mb-20">
                <div className="container mx-auto max-w-6xl">
                  <h2 className="nohemi-heading-xl text-4xl font-bold text-black mb-12 text-center">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-6 py-3 bg-gray-900 text-white rounded-full nohemi-heading-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}



            {/* Project Documentation Sections */}
            {project.sections && project.sections.length > 0 && (
              <section className="px-6 mb-20">
                <div className="container mx-auto max-w-6xl">
                  <h2 className="nohemi-heading-xl text-4xl font-bold text-black mb-16 text-center">
                    Project Documentation
                  </h2>
                  
                  <div className="space-y-16">
                    {project.sections.map((section, index) => (
                      <div key={index}>
                        <ProjectSectionComponent section={section} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}





            {/* Navigation to Other Projects */}
            <section className="px-6">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center">
                  <h2 className="nohemi-heading-xl text-4xl font-bold text-black mb-12">
                    Explore More Projects
                  </h2>
                  <Link 
                    href="/#projects"
                    className="inline-flex items-center px-8 py-4 bg-black text-white nohemi-heading-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 cursor-hover-target"
                  >
                    View All Projects
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
  );
}