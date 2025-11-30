'use client'

import React from 'react';
import Image from 'next/image';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import GridLines from '../components/GridLines';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <ParallaxProvider>
      <div className="relative bg-black min-h-screen w-full">
        <div className="relative bg-white flex flex-col
          rounded-b-[4rem] overflow-hidden border-[8px] border-white shadow-xl min-h-screen"
        >
          <GridLines />
          <main className="flex-1 relative">
            {/* About Section */}
            <section className="relative py-20 px-6">
              <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Profile Image - Left Side */}
                  <Parallax translateY={[-20, 20]} className="relative">
                    <div className="relative w-full max-w-md mx-auto lg:mx-0">
                      <div className="aspect-square rounded-3xl overflow-hidden bg-gray-200 shadow-2xl relative">
                        <Image
                          src="/images/profile.png"
                          alt="Constant Suchet"
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </Parallax>

                  {/* About Me - Right Side */}
                  <div className="space-y-8">
                    <Parallax translateY={[-10, 10]}>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        </div>
                        <h2 className="nohemi-display text-5xl font-bold text-black italic">
                          {t('about.heading')}
                        </h2>
                      </div>
                    </Parallax>

                    <Parallax translateY={[-5, 15]}>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h1 className="nohemi-heading-lg text-4xl font-semibold text-black">
                            {t('about.name')}
                          </h1>
                          <h2 className="nohemi-heading-md text-2xl font-medium text-gray-700">
                            {t('about.role')}
                          </h2>
                        </div>

                        <div className="space-y-6">
                          <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-black mt-3 flex-shrink-0"></div>
                            <p className="nohemi-body-regular text-xl text-gray-700 leading-relaxed">
                              {t('about.p1')}
                            </p>
                          </div>

                          <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-black mt-3 flex-shrink-0"></div>
                            <p className="nohemi-body-regular text-xl text-gray-700 leading-relaxed">
                              {t('about.p2')}
                            </p>
                          </div>

                          <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-black mt-3 flex-shrink-0"></div>
                            <p className="nohemi-body-regular text-xl text-gray-700 leading-relaxed">
                              {t('about.p3')}
                            </p>
                          </div>

                          <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-black mt-3 flex-shrink-0"></div>
                            <p className="nohemi-body-regular text-xl text-gray-700 leading-relaxed">
                              {t('about.p4')}
                            </p>
                          </div>
                        </div>

                        {/* Call to Action */}
                        <Parallax translateY={[5, -5]}>
                          <div className="pt-4">
                            <a
                              href="mailto:constantsuchet@gmail.com"
                              className="inline-flex items-center px-8 py-4 bg-black text-white nohemi-heading-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 interactive cursor-hover-target"
                            >
                              {t('about.contact.button')}
                              <svg
                                className="ml-2 w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                />
                              </svg>
                            </a>
                          </div>
                        </Parallax>
                      </div>
                    </Parallax>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="relative py-20 px-6 bg-gray-50">
              <div className="container mx-auto max-w-7xl">
                <Parallax translateY={[-10, 10]}>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    </div>
                    <h2 className="nohemi-display text-5xl font-bold text-black italic">
                      {t('skills.title')}
                    </h2>
                  </div>
                </Parallax>

                <div className="space-y-0 border-t border-gray-300">
                  {[
                    {
                      category: t('skills.web'),
                      skills: t('skills.web.tech')
                    },
                    {
                      category: t('skills.application'),
                      skills: t('skills.application.tech')
                    },
                    {
                      category: t('skills.data'),
                      skills: t('skills.data.tech')
                    },
                    {
                      category: t('skills.devops'),
                      skills: t('skills.devops.tech')
                    },
                    {
                      category: t('skills.scripting'),
                      skills: t('skills.scripting.tech')
                    }
                  ].map((skill, index) => (
                    <Parallax key={index} translateY={[-5, 5]}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8 border-b border-gray-300 hover:bg-white transition-colors duration-300">
                        <div className="lg:col-span-1">
                          <h3 className="nohemi-heading-lg text-2xl font-semibold text-black">
                            {skill.category}
                          </h3>
                        </div>
                        <div className="lg:col-span-2 flex items-center">
                          <p className="nohemi-body-regular text-gray-700 leading-relaxed">
                            {skill.skills}
                          </p>
                        </div>
                      </div>
                    </Parallax>
                  ))}
                </div>
              </div>
            </section>

            {/* Experiences Section */}
            <section className="relative py-20 px-6">
              <div className="container mx-auto max-w-7xl">
                <Parallax translateY={[-10, 10]}>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    </div>
                    <h2 className="nohemi-display text-5xl font-bold text-black italic">
                      {t('experience.title')}
                    </h2>
                  </div>
                </Parallax>

                <div className="space-y-0 border-t border-gray-300">
                  {[
                    {
                      title: t('experience.fiverr.title'),
                      company: t('experience.fiverr.company'),
                      period: t('experience.fiverr.period'),
                      description: t('experience.fiverr.description')
                    },
                    {
                      title: t('experience.humard.title'),
                      company: t('experience.humard.company'),
                      period: t('experience.humard.period'),
                      description: t('experience.humard.description')
                    }
                  ].map((exp, index) => (
                    <Parallax key={index} translateY={[-5, 5]}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8 border-b border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                        <div className="lg:col-span-2">
                          <h3 className="nohemi-heading-lg text-2xl font-semibold text-black mb-2">
                            {exp.title} @ {exp.company}
                          </h3>
                          <p className="nohemi-body-regular text-gray-700 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                        <div className="flex lg:justify-end items-start">
                          <span className="nohemi-heading-sm text-lg font-medium text-gray-900">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </Parallax>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Contact Section - Outside the white container */}
        <div className="relative">
          <section id="contact" className="relative z-10 min-h-[60vh] w-full bg-[#111] flex flex-col items-center justify-center">
            <Parallax speed={-20}>
              <div className="relative">
                <h2 className="text-[clamp(2rem,8vw,7rem)] nohemi-heading-xl mb-4 text-white text-center leading-none">
                  {t('contact.title').split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </h2>
                <div className="relative mt-8 w-fit mx-auto overflow-hidden">
                  <a
                    href="mailto:constantsuchet@gmail.com"
                    className="relative px-12 py-4 border border-white rounded-full text-white nohemi-heading-md text-lg block hover:bg-white hover:text-black transition-all duration-300 z-10 min-w-[280px] text-center cursor-hover-target interactive"
                  >
                    {t('contact.button')}
                  </a>
                </div>
              </div>
            </Parallax>
          </section>
        </div>
      </div>
    </ParallaxProvider>
  );
}