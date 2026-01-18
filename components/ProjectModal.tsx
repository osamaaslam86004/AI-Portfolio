
import React, { useEffect, useRef, useState } from 'react';
import { X, Github, ExternalLink, Code2, Layers, CheckCircle2, Share2, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Store the element that had focus before opening the modal
    previousFocus.current = document.activeElement as HTMLElement;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleTabTrap);
    document.body.style.overflow = 'hidden';

    // Focus the first focusable element (the close button)
    const firstButton = modalRef.current?.querySelector('button');
    if (firstButton instanceof HTMLElement) {
      firstButton.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = 'unset';
      // Return focus to the trigger element
      previousFocus.current?.focus();
    };
  }, [onClose]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#project-${project.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
      role="presentation"
    >
      <div 
        ref={modalRef}
        className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Close Button - Placed first in DOM for screen reader discovery */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-950/50 hover:bg-slate-800 text-white rounded-full transition-all z-10 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 outline-none group"
          aria-label="Close project details modal"
        >
          <X size={24} aria-hidden="true" className="group-hover:scale-110 transition-transform" />
          <span className="sr-only">Press escape to close</span>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Visual Side */}
          <div className="lg:w-1/2 p-6 lg:p-10 bg-slate-950/30">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6 border border-slate-800">
              <img 
                src={project.image} 
                alt={`Hero image for ${project.title}`} 
                className="w-full h-auto object-cover"
              />
            </div>
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="grid grid-cols-2 gap-4" role="group" aria-label="Project screenshots">
                {project.screenshots.map((src, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-slate-800">
                    <img src={src} alt={`Screenshot ${idx + 1} of ${project.title}`} className="w-full h-auto" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-8 lg:p-12 space-y-8">
            <header>
              <div className="flex flex-wrap gap-2 mb-4" aria-label="Technology stack">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-mono text-indigo-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {project.title}
              </h2>
              <div id="modal-description" className="text-slate-400 text-lg leading-relaxed">
                {project.longDescription || project.description}
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <section className="space-y-3" aria-labelledby="features-heading">
                <h4 id="features-heading" className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Code2 size={16} aria-hidden="true" /> Key Features
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} aria-hidden="true" className="text-indigo-500 mt-1 flex-shrink-0" /> 
                    <span>Scalable Backend Architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} aria-hidden="true" className="text-indigo-500 mt-1 flex-shrink-0" /> 
                    <span>Real-time Data Synchronization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} aria-hidden="true" className="text-indigo-500 mt-1 flex-shrink-0" /> 
                    <span>Multi-tenant Security</span>
                  </li>
                </ul>
              </section>
              <section className="space-y-3" aria-labelledby="stack-heading">
                <h4 id="stack-heading" className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Layers size={16} aria-hidden="true" /> Stack Detail
                </h4>
                <p className="text-sm text-slate-400">
                  Built with industrial-grade standards, prioritizing performance and maintainability using the modern Python ecosystem.
                </p>
              </section>
            </div>

            <nav className="flex flex-wrap gap-4 pt-4" aria-label="Project interactive links">
              {project.link && project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 outline-none"
                >
                  <ExternalLink size={20} aria-hidden="true" /> 
                  <span>Live Demo</span>
                </a>
              )}
              {project.github && project.github !== "#" && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 outline-none"
                >
                  <Github size={20} aria-hidden="true" /> 
                  <span>GitHub</span>
                </a>
              )}
              <button 
                onClick={handleShare}
                className={`flex-1 min-w-[140px] px-6 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 outline-none ${
                  copied 
                  ? 'bg-green-600 text-white focus-visible:ring-green-400' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white focus-visible:ring-slate-500'
                }`}
                aria-label={copied ? "Link copied to clipboard" : "Share project link"}
              >
                {copied ? <Check size={20} aria-hidden="true" /> : <Share2 size={20} aria-hidden="true" />}
                <span>{copied ? "Copied!" : "Share"}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
