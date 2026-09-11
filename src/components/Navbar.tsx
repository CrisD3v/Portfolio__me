import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeProvider } from './ThemeProvider';
import { Moon, Sun, Globe } from 'lucide-react';
import '../i18n/config';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-teal-100 dark:border-teal-900 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2 text-xl font-bold text-white tracking-wide">
            Cristian.
          </div>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors">{t('nav.home')}</a>
            <a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
            <a href="#experience" className="hover:text-white transition-colors">{t('nav.experience')}</a>
            <a href="#projects" className="hover:text-white transition-colors">{t('nav.projects')}</a>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))} className="hover:text-white transition-colors cursor-pointer">{t('nav.contact')}</button>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition-colors border border-slate-700 text-slate-300"
              aria-label="Toggle language"
            >
              {mounted && <span className="uppercase">{i18n.language}</span>}
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-slate-800 transition-colors text-slate-300 border border-slate-700"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />
              ) : (
                <div className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NavbarWithTheme() {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}
