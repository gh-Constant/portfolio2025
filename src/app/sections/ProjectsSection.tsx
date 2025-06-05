'use client'
import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { projects } from '../data/projects';

const ProjectsSection: React.FC = () => {
  return (
    <section className="relative z-10 min-h-screen w-full py-40">
      <div className="container mx-auto px-6">
        <Parallax speed={-10}>
          <h2 className="text-[clamp(4rem,12vw,10rem)] offbit-font mb-16 text-black text-center leading-none">
            Selected <br />
            <span className="italic">Projects</span>
          </h2>
        </Parallax>
        
        <div className="space-y-32 max-w-none">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const offsetClass = isEven ? 'ml-0 mr-auto' : 'ml-auto mr-0';
            const widthClass = project.size === 'large' ? 'w-[80vw]' : project.size === 'medium' ? 'w-[70vw]' : 'w-[60vw]';
            
            return (
              <div 
                key={project.id}
                className={`
                  group relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-500 hover:scale-[1.02]
                  ${widthClass} h-[50vh] ${offsetClass}
                `}
              >
                {/* Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                  {/* Replace with actual image when you add them */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <span className="text-sm">Image: {project.title}</span>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white text-xl md:text-2xl offbit-font mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base offbit-font mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs offbit-font"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.link && (
                      <a 
                        href={project.link}
                        className="px-4 py-2 bg-white text-black rounded-full text-sm offbit-font hover:bg-gray-200 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        className="px-4 py-2 border border-white text-white rounded-full text-sm offbit-font hover:bg-white hover:text-black transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;