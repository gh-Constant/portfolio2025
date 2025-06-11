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
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
              <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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

                  {/* Content - Right Side */}
                  <div className="space-y-8">
                    {/* Name */}
                    <Parallax translateY={[-10, 10]}>
                      <h1 className="nohemi-display text-6xl lg:text-7xl font-bold text-black leading-tight">
                        {t('about.title').split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index === 0 && <br />}
                          </span>
                        ))}
                      </h1>
                    </Parallax>

                    {/* Description */}
                    <Parallax translateY={[-5, 15]}>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h2 className="nohemi-heading-lg text-2xl font-semibold text-black">
                            {t('about.subtitle')}
                          </h2>
                          <p className="nohemi-body-regular text-lg text-gray-700 leading-relaxed">
                            {t('about.description')}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="nohemi-heading-md text-xl font-semibold text-black">
                            {t('about.philosophy.title')}
                          </h3>
                          <p className="nohemi-body-regular text-gray-700 leading-relaxed">
                            {t('about.philosophy.description')}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="nohemi-heading-md text-xl font-semibold text-black">
                            {t('about.skills.title')}
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="nohemi-heading-sm font-medium text-black">{t('about.skills.frontend')}</h4>
                              <p className="nohemi-body-light text-sm text-gray-600">
                                {t('about.skills.frontend.tech')}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="nohemi-heading-sm font-medium text-black">{t('about.skills.backend')}</h4>
                              <p className="nohemi-body-light text-sm text-gray-600">
                                {t('about.skills.backend.tech')}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="nohemi-heading-sm font-medium text-black">{t('about.skills.design')}</h4>
                              <p className="nohemi-body-light text-sm text-gray-600">
                                {t('about.skills.design.tech')}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="nohemi-heading-sm font-medium text-black">{t('about.skills.tools')}</h4>
                              <p className="nohemi-body-light text-sm text-gray-600">
                                {t('about.skills.tools.tech')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Call to Action */}
                        <Parallax translateY={[5, -5]}>
                          <div className="pt-8">
                            <a 
                              href="#contact"
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
          </main>
        </div>
      </div>
    </ParallaxProvider>
  );
}