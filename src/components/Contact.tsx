import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Trigger backdrop fade-in immediately after mount
      setTimeout(() => setShowBackdrop(true), 10);
      // Trigger modal slide-in after backdrop starts
      setTimeout(() => setShowModal(true), 250);
    };
    window.addEventListener('open-contact', handleOpen);
    return () => window.removeEventListener('open-contact', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => setShowBackdrop(false), 200);
    setTimeout(() => setIsOpen(false), 500);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        handleClose();
      }, 2000);
    }, 1500);
  };

  const socials = [
    { 
      name: t('contact.social.linkedin'), 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, 
      href: "https://www.linkedin.com/in/crisdeveg/"
    },
    { 
      name: t('contact.social.github'), 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>, 
      href: "https://github.com/CrisD3v"
    },
    {
      name: t('contact.social.email'),
      icon: <Mail size={20} />,
      href: "mailto:crisdevenginer@gmail.com"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-white/80 dark:bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 ${showBackdrop ? 'opacity-100' : 'opacity-0'}`} 
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-400 ease-out ${showModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-8'}`}
      >
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-2 z-20 bg-slate-100 dark:bg-slate-800/30 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          {/* Left Panel */}
          <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950/50 p-8 md:p-10 flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/50">
            <div className="mb-auto">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                {t('contact.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 mt-8 md:mt-0">
              {socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
                >
                  <span className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-teal-400 dark:group-hover:border-teal-500/30 group-hover:bg-teal-50 dark:group-hover:bg-teal-500/5 transition-colors">
                    {social.icon}
                  </span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:col-span-3 p-8 md:p-10 bg-white dark:bg-slate-900">
            <form onSubmit={handleSubmit} className="space-y-8 flex flex-col h-full">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                    placeholder={t('contact.form.name_placeholder')}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                    placeholder={t('contact.form.email_placeholder')}
                  />
                </div>
              </div>
              
              <div className="space-y-2 text-left flex-1 flex flex-col pt-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">{t('contact.form.message')}</label>
                <textarea 
                  id="message" 
                  required
                  className="w-full flex-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/50 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none min-h-[120px] shadow-inner"
                  placeholder={t('contact.form.message_placeholder')}
                ></textarea>
              </div>

              <div className="pt-4 mt-auto">
                <button 
                  type="submit" 
                  disabled={formState !== 'idle'}
                  className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed sm:ml-auto"
                >
                  {formState === 'idle' && <>{t('contact.form.send')} <Send size={16} /></>}
                  {formState === 'sending' && <span className="animate-pulse">{t('contact.form.sending')}</span>}
                  {formState === 'success' && <><CheckCircle2 size={16} /> {t('contact.form.success')}</>}
                  {formState === 'error' && <><AlertCircle size={16} /> {t('contact.form.error')}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
