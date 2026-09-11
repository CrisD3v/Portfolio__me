import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';
import profileImg from '../assets/profile_teal.jpg';
import { Mail, ArrowRight, ArrowDown } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && textRef.current && imgRef.current) {
      anime({
        targets: [titleRef.current.children, textRef.current, imgRef.current],
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 1000,
        easing: 'easeOutQuart'
      });
    }
  }, []);

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen flex items-center justify-center">
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12 relative z-10">
        
        {/* Text Content */}
        <div className="flex-1 text-left">
          <div ref={titleRef}>
            <p className="text-sm font-bold text-teal-400 tracking-widest uppercase mb-4 opacity-0">
              {t('hero.pre_title')}
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white leading-none opacity-0">
              Cristian <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">
                Londoño
              </span>
            </h1>
            <div className="flex items-center gap-4 mb-6 opacity-0">
              <div className="h-px w-12 bg-slate-600"></div>
              <span className="text-lg sm:text-xl font-medium text-slate-300">
                {t('hero.title')}
              </span>
            </div>
          </div>
          
          <p ref={textRef} className="text-base text-slate-400 opacity-0 max-w-lg leading-relaxed mb-10">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#about" className="group px-6 py-3 bg-slate-900/80 text-white font-medium text-sm rounded-lg border border-slate-700 hover:border-teal-400/50 hover:bg-slate-800 transition-all flex items-center gap-2">
              {t('hero.buttons.about')} <ArrowRight size={16} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="px-6 py-3 bg-transparent text-slate-300 font-medium text-sm rounded-lg border border-slate-800 hover:border-slate-600 hover:text-white transition-all">
              {t('hero.buttons.projects')}
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="https://github.com/CrisD3v" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
              </svg> {t('hero.github')}
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail size={16} /> {t('hero.contact')}
            </button>
          </div>
        </div>

        {/* Glowing Aura Background */}
        <div className="flex-shrink-0 relative w-full max-w-sm md:w-[400px]" ref={imgRef}>
          <div className="absolute -inset-4 bg-gradient-to-tr from-teal-400 via-emerald-500 to-teal-700 rounded-3xl blur-[80px] opacity-40 animate-pulse"></div>
          
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] bg-slate-900">
            {/* The image should cover the container */}
            <img 
              src={profileImg.src} 
              alt="Cristian Londoño" 
              className="w-full h-full object-cover relative z-10 mix-blend-normal"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 z-30 bg-[#0a1128] border border-slate-800 px-4 py-3 rounded-xl shadow-xl flex flex-col items-center gap-1 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              {t('hero.badge')}
            </span>
            <div className="mt-1 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-8 h-auto rounded-[2px] shadow-sm">
                <rect width="3" height="2" fill="#FCD116" />
                <rect y="1" width="3" height="1" fill="#003893" />
                <rect y="1.5" width="3" height="0.5" fill="#CE1126" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">{t('hero.explore_more')}</span>
        <ArrowDown size={16} className="text-slate-400" />
      </div>
    </section>
  );
}
