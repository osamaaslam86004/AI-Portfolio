
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 px-6 max-w-7xl mx-auto border-b border-slate-900 last:border-0 ${className}`}>
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          <span className="text-indigo-500 font-mono mr-2">&lt;</span>
          {title}
          <span className="text-indigo-500 font-mono ml-2">/&gt;</span>
        </h2>
        {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
};

export default Section;
