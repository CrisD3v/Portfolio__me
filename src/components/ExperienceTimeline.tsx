import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';

export function ExperienceTimeline() {
  const { t, i18n } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const roles = t('experience.roles', { returnObjects: true }) as Array<{
    role: string;
    company: string;
    date: string;
    description: string;
  }>;

  useEffect(() => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      anime({
        targets: items,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutQuart',
      });
    }
  }, [i18n.language]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto" id="experience">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {t('experience.title')}
        </h2>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {t('experience.subtitle')}
        </p>
      </div>
      
      <div className="relative" ref={timelineRef}>
        {/* Central Vertical Line for Desktop, Left Line for Mobile */}
        <div className="absolute left-6 md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>

        <div className="flex flex-col gap-12">
          {roles.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`relative flex items-center w-full timeline-item opacity-0 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                {/* Desktop Empty Space (Opposite side) */}
                <div className="hidden md:block md:w-1/2"></div>
                
                {/* Center dot + Horizontal Connector */}
                <div className="absolute left-6 md:left-1/2 flex items-center justify-center -translate-x-1/2 z-10 w-4 h-4">
                  <div className="w-2.5 h-2.5 bg-teal-500 rounded-full relative z-20"></div>
                </div>
                
                {/* Horizontal line connecting dot to card (Desktop only) */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-slate-200 dark:bg-slate-800 w-12 z-0 ${isLeft ? 'left-1/2 -ml-12' : 'right-1/2 -mr-12'}`}></div>
                
                {/* Content Card container */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 flex ${isLeft ? 'md:pr-12 md:justify-end' : 'md:pl-12 md:justify-start'}`}>
                  
                  <div className="w-full max-w-xl p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors relative shadow-sm dark:shadow-none">
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-3 mb-5">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/20 rounded-full w-fit">
                        {item.date}
                      </span>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {item.company}
                      </span>
                    </div>
                    
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {item.role}
                    </h3>
                    
                    <p className="relative z-10 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {item.role.includes("Backend") ? (
                        ['Node.js', 'AWS Lambda', 'DynamoDB', 'API Gateway'].map(tag => (
                          <span key={tag} className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
                            {tag}
                          </span>
                        ))
                      ) : (
                        ['React', 'TypeScript', 'Express.js', 'Jest', 'Cypress'].map(tag => (
                          <span key={tag} className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
                            {tag}
                          </span>
                        ))
                      )}
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
