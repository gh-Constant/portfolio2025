'use client'
import React from 'react';
import Link from 'next/link';
import { Parallax } from 'react-scroll-parallax';
import { projects } from '../data/projects';
import Image from 'next/image';

const ProjectsSection: React.FC = () => {
  return (
    <section className="relative z-10 min-h-screen w-full py-40">
      <div className="container mx-auto px-6">
        <Parallax speed={-10}>
          <h2 className="text-[clamp(4rem,12vw,10rem)] nohemi-heading-xl mb-16 text-black text-center leading-none">
            SELECTED <br />
            <span className="italic">PROJECTS</span>
          </h2>
        </Parallax>
        
        <div className="space-y-32 max-w-none">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const offsetClass = isEven ? 'ml-0 mr-auto' : 'ml-auto mr-0';
            const widthClass = project.size === 'large' ? 'w-[80vw]' : project.size === 'medium' ? 'w-[70vw]' : 'w-[60vw]';
            
            return (
              <Link 
                key={project.id}
                href={`/projects/${project.id}`}
                className={`
                  group relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-500 hover:scale-[1.02]
                  ${widthClass} h-[50vh] ${offsetClass} block cursor-hover-target
                `}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={95}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDEyMDAgODAwIj48cmVjdCBmaWxsPSIjMmEyYTJhIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiLz48L3N2Zz4="
                    className="object-cover"
                    sizes={`(max-width: 768px) 100vw, ${project.size === 'large' ? '80vw' : project.size === 'medium' ? '70vw' : '60vw'}`}
                    priority={index < 2}
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white text-xl md:text-2xl nohemi-heading-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base nohemi-body mb-4 line-clamp-3">
                  {project.description}
                </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs nohemi-caption"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <button 
                        className="px-4 py-2 border border-white text-white rounded-full text-sm nohemi-heading-sm transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        GitHub
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;