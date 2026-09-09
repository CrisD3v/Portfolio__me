import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

import krescendoImg from '../assets/proyects/Krescendo_landing.png';
import krescendoCatalogImg from '../assets/proyects/Krescendo_catalog.png';
import noddpayImg from '../assets/proyects/Noddpay_landing.png';
import noddpayWalletImg from '../assets/proyects/Noddpay_Wallet.png';
import sistegraImg from '../assets/proyects/Sistegra.png';

export function Projects() {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const projectsData = [
    {
      id: 'krescendo',
      images: [krescendoImg, krescendoCatalogImg],
      tags: ['AWS', 'Node.js', 'API Gateway', 'Lambda', 'React', 'DynamoDB'],
      link: 'https://krescendo.io',
      disableRepo: true
    },
    {
      id: 'noddpay',
      images: [noddpayImg, noddpayWalletImg],
      tags: ['AWS', 'Node.js', 'Lambda', 'Next.js', 'DynamoDB'],
      link: 'https://www.noddpay.com/',
      disableRepo: true
    },
    {
      id: 'sistegra',
      images: [sistegraImg],
      tags: ['PHP', 'Laravel', 'React', 'MySQL', 'Inertia'],
      link: 'https://sistegra.com/',
      disableRepo: true
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="projects">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-teal-400 uppercase bg-teal-500/10 border border-teal-500/20 rounded-full">
            + Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            {t('projects.title').split(' ').map((word, i, arr) => (
              i === 1 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(20,184,166,0.4)]">{word} </span> : <span key={i}>{word} </span>
            ))}
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end md:pb-2">
          <p className="max-w-md text-lg text-slate-400 mb-6 md:text-right">
            {t('projects.subtitle')}
          </p>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-3 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-teal-600 transition-colors" aria-label="Previous project">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollNext} className="p-3 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-teal-600 transition-colors" aria-label="Next project">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {projectsData.map((project) => {
            const highlights = t(`projects.items.${project.id}.highlights`, { returnObjects: true }) as string[];

            return (
              <div key={project.id} className="flex-[0_0_100%] min-w-0 px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-0 bg-[#0a1128]/80 rounded-3xl overflow-hidden border border-teal-900/40 shadow-2xl group">
                  
                  {/* Image Section */}
                  <div className={`lg:w-5/12 bg-slate-900 p-8 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent"></div>
                    
                    <div className="relative w-full flex items-center justify-center" style={{ perspective: '1000px' }}>
                      {project.images.slice().reverse().map((img, reversedIndex) => {
                        const originalIndex = project.images.length - 1 - reversedIndex;
                        const isFront = originalIndex === 0;
                        const hasMultiple = project.images.length > 1;
                        
                        return (
                          <img 
                            key={originalIndex}
                            src={img.src} 
                            alt={t(`projects.items.${project.id}.title`)} 
                            className={`w-full h-auto rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out border border-teal-900/30 
                              ${isFront ? 
                                `relative z-20 ${hasMultiple ? 'group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:-rotate-2 group-hover:scale-105' : 'group-hover:scale-105'}` : 
                                'absolute top-0 left-0 z-10 translate-y-3 translate-x-3 rotate-3 scale-95 opacity-60 group-hover:translate-y-8 group-hover:translate-x-8 group-hover:rotate-6 group-hover:opacity-100 group-hover:scale-100'
                              }
                            `}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className={`lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center`}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-3 py-1 text-xs font-bold text-teal-400 bg-teal-900/30 rounded-full tracking-wider uppercase">
                        {t(`projects.items.${project.id}.category`)}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold text-slate-400 bg-slate-800 rounded-full">
                        {t(`projects.items.${project.id}.date`)}
                      </span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-white mb-2">
                      {t(`projects.items.${project.id}.title`)}
                    </h3>
                    
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      {t(`projects.items.${project.id}.description`)}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">{t('projects.labels.highlights')}</h4>
                      <ul className="space-y-3">
                        {highlights && highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-300">
                            <span className="mr-3 text-teal-500 mt-0.5 flex-shrink-0 text-lg leading-none">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-10">
                      <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">{t('projects.labels.stack')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-auto">
                      <a 
                        href="#" 
                        className={`flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold text-sm rounded-full shadow-lg transition-all ${project.disableRepo ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:shadow-xl hover:scale-105'}`}
                        aria-disabled={project.disableRepo}
                      >
                        {t('projects.buttons.repository')}
                        <ExternalLink size={16} className="text-teal-600" />
                      </a>
                      <a href={project.link || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-transparent text-white font-semibold text-sm rounded-full border border-slate-700 hover:bg-slate-800 transition-all">
                        {t('projects.buttons.live')}
                      </a>
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
