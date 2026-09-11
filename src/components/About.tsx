import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';
import { Server, Cloud, Database, Shield, Code, Cpu, ArrowRight } from 'lucide-react';

export function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: contentRef.current?.children,
              translateY: [30, 0],
              opacity: [0, 1],
              delay: anime.stagger(150),
              duration: 1000,
              easing: 'easeOutQuart'
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { icon: <Server size={24} />, name: "Node.js", color: "text-green-500" },
    { icon: <Code size={24} />, name: "TypeScript", color: "text-blue-500" },
    { icon: <Cloud size={24} />, name: "AWS Serverless", color: "text-orange-500" },
    { icon: <Database size={24} />, name: "DynamoDB", color: "text-blue-400" },
    { icon: <Shield size={24} />, name: "Security & MFA", color: "text-red-400" },
    { icon: <Cpu size={24} />, name: "Event-Driven", color: "text-purple-400" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[80vh] flex items-center">
      <div className="w-full" ref={contentRef}>
        <div className="mb-16 opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-teal-500"></div>
            <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase">
              {t('about.title')}
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('about.subtitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center opacity-0">
          <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            <p>
              {t('about.description_p1')}
            </p>
            <p>
              {t('about.description_p2')}
            </p>
            <div className="pt-8">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))} 
                className="group px-6 py-3 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 font-medium text-sm rounded-lg border border-teal-200 dark:border-teal-500/20 hover:border-teal-300 dark:hover:border-teal-400/50 hover:bg-teal-100 dark:hover:bg-teal-500/20 transition-all flex items-center gap-2"
              >
                {t('contact.title')} 
                <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16} /></span>
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Editor Window */}
            <div className="relative bg-[#1e1e1e] border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-sm">
              {/* Editor Header */}
              <div className="bg-[#2d2d2d] flex items-center px-4 border-b border-black/40">
                <div className="flex gap-2 py-3 mr-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
                </div>
                <div className="flex px-4 py-2 bg-[#1e1e1e] text-slate-300 text-xs border-t-2 border-teal-500 select-none">
                  {t('about.skills_title')}
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-6">
                <div className="text-slate-400 mb-4 flex flex-wrap">
                  <span className="text-blue-400">const</span>&nbsp;<span className="text-blue-300">coreStack</span>:&nbsp;<span className="text-teal-400">Skill</span>[] = [
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 md:pl-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 group whitespace-nowrap">
                      <div className="flex">
                        <span className="text-slate-600 select-none">{`{`}</span>
                      </div>
                      <div className={`p-1.5 rounded-md bg-[#252526] border border-slate-700/30 group-hover:bg-[#2d2d2d] transition-colors ${skill.color}`}>
                        {React.cloneElement(skill.icon, { size: 16 })}
                      </div>
                      <div className="flex">
                        <span className="text-orange-300 group-hover:text-orange-200 transition-colors">
                          "{skill.name}"
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-slate-600 select-none">{`},`}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-slate-400 mt-4 flex items-center">
                  ];
                  <style>
                    {`
                      @keyframes terminal-blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                      }
                      .animate-terminal-blink {
                        animation: terminal-blink 1s step-end infinite;
                      }
                    `}
                  </style>
                  <span className="inline-block w-[2px] h-4 bg-slate-300 ml-1 animate-terminal-blink"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
