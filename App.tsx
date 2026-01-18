
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Menu, 
  X, 
  Terminal,
  ChevronRight,
  Code,
  Layout,
  Database,
  Cloud,
  Cpu,
  Filter
} from 'lucide-react';
import Section from './components/Section';
import GeminiAssistant from './components/GeminiAssistant';
import ProjectModal from './components/ProjectModal';
import { DEVELOPER_INFO, PROJECTS, SKILLS, NAV_LINKS } from './constants';
import { Project } from './types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter(project => project.tags.includes(activeFilter));
  }, [activeFilter]);

  const categoryData = [
    { name: 'Backend', value: 40, color: '#6366f1' },
    { name: 'Frontend', value: 25, color: '#818cf8' },
    { name: 'DevOps', value: 20, color: '#a5b4fc' },
    { name: 'Database', value: 15, color: '#c7d2fe' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Project Detailed Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4 shadow-lg' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
              <Terminal className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              {DEVELOPER_INFO.name.split(' ')[0]}<span className="text-indigo-500">.dev</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8" role="menubar">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                role="menuitem"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20"
            >
              Hire Me
            </a>
          </div>

          <button 
            className="md:hidden text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col items-center justify-center gap-8 md:hidden" role="dialog" aria-label="Mobile navigation">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold text-slate-300 hover:text-indigo-500"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header id="home" className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-screen">
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-mono animate-pulse">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white tracking-tighter">
            Building robust <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              digital ecosystems
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {DEVELOPER_INFO.bio}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#projects" className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl">
              View Projects
            </a>
            <a href="#ask-ai" className="px-8 py-4 bg-slate-900 text-white border border-slate-700 font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2">
              Talk to AI Twin <ChevronRight size={18} />
            </a>
          </div>
          <div className="flex justify-center lg:justify-start gap-6 pt-4">
            <a href={DEVELOPER_INFO.github} className="text-slate-500 hover:text-white transition-colors" aria-label="Github Profile"><Github size={24} /></a>
            <a href={DEVELOPER_INFO.linkedin} className="text-slate-500 hover:text-white transition-colors" aria-label="LinkedIn Profile"><Linkedin size={24} /></a>
            <a href={DEVELOPER_INFO.twitter} className="text-slate-500 hover:text-white transition-colors" aria-label="Twitter Profile"><Twitter size={24} /></a>
            <a href={`mailto:${DEVELOPER_INFO.email}`} className="text-slate-500 hover:text-white transition-colors" aria-label="Email Alex"><Mail size={24} /></a>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="absolute -inset-10 bg-indigo-500/20 blur-[100px] rounded-full"></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden shadow-2xl group" aria-hidden="true">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <p className="text-indigo-400"># Developer Profile</p>
              <div className="flex gap-4">
                <span className="text-slate-600">01</span>
                <p><span className="text-pink-500">class</span> <span className="text-yellow-400">Developer</span>:</p>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">02</span>
                <p className="pl-4"><span className="text-pink-500">def</span> <span className="text-cyan-400">__init__</span>(self):</p>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">03</span>
                <p className="pl-8">self.name = <span className="text-green-400">"{DEVELOPER_INFO.name}"</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">04</span>
                <p className="pl-8">self.role = <span className="text-green-400">"Full Stack Architect"</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">05</span>
                <p className="pl-8">self.focus = [<span className="text-green-400">"Django"</span>, <span className="text-green-400">"Postgres"</span>, <span className="text-green-400">"React"</span>]</p>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">06</span>
                <p className="pl-4"><span className="text-pink-500">def</span> <span className="text-cyan-400">hire</span>(self):</p>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">07</span>
                <p className="pl-8"><span className="text-pink-500">return</span> <span className="text-yellow-400">True</span></p>
              </div>
              <p className="text-slate-600">_</p>
            </div>
          </div>
        </div>
      </header>

      {/* Expertise Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Expertise">
        {[
          { icon: <Cpu className="text-indigo-500" />, title: "Backend Systems", desc: "Crafting scalable Python/Django architectures." },
          { icon: <Layout className="text-cyan-500" />, title: "UI Engineering", desc: "Responsive React apps with smooth UX." },
          { icon: <Database className="text-purple-500" />, title: "Data Architecture", desc: "Optimizing PostgreSQL and Redis flows." },
          { icon: <Cloud className="text-blue-500" />, title: "Cloud DevOps", desc: "Automated Docker and CI/CD workflows." }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group">
            <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-6 border border-slate-800 group-hover:scale-110 transition-transform" aria-hidden="true">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Work" subtitle="A selection of architectural solutions and full-stack implementations. Click to explore details.">
        {/* Filtering UI */}
        <nav className="mb-10 flex flex-wrap items-center gap-3" aria-label="Project filtering">
          <div className="flex items-center gap-2 text-slate-500 mr-4 text-sm font-medium">
            <Filter size={16} aria-hidden="true" />
            <span>Filter by:</span>
          </div>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              aria-pressed={activeFilter === tag}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                activeFilter === tag 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500" role="list">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              role="listitem"
              tabIndex={0}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              className="group cursor-pointer flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-2 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              aria-label={`View details for ${project.title}`}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out">
                      <span 
                        onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank'); }}
                        className="p-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl transition-colors shadow-lg"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.stopPropagation(); window.open(project.github, '_blank'); }}}
                        aria-label={`GitHub Repository for ${project.title}`}
                      >
                        <Github size={20} />
                      </span>
                      <span 
                        onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}
                        className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-lg"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.stopPropagation(); window.open(project.link, '_blank'); }}}
                        aria-label={`Live Demo for ${project.title}`}
                      >
                        <ExternalLink size={20} />
                      </span>
                   </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <ChevronRight size={20} className="text-slate-600 group-hover:text-indigo-500 transition-colors" aria-hidden="true" />
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2" aria-label="Tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs font-mono text-indigo-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500">No projects found for the selected filter.</p>
            </div>
          )}
        </div>
      </Section>

      {/* Skills Visualization */}
      <Section id="skills" title="Technical Proficiency" subtitle="A deep dive into my toolbelt and engineering capabilities.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {SKILLS.slice(0, 6).map(skill => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-200">{skill.name}</span>
                  <span className="font-mono text-indigo-400" aria-label={`${skill.level} percent proficiency`}>{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[400px] flex flex-col items-center justify-center bg-slate-900/30 rounded-3xl border border-slate-800 p-8">
            <h4 className="text-lg font-bold mb-8 text-white">Ecosystem Balance</h4>
            <div className="w-full h-full" role="img" aria-label="Pie chart showing balance of backend, frontend, devops, and database skills">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {categoryData.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} aria-hidden="true"></div>
                  <span className="text-xs text-slate-400 font-medium">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* AI Assistant Section */}
      <Section id="ask-ai" title="AI Twin Assistant" subtitle="Ask my digital twin anything about my professional background.">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code size={20} className="text-indigo-400" aria-hidden="true" />
                Intelligent Search
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                This assistant uses Gemini to process my resume and project history. It can describe how I solved specific bugs, my architecture preferences, and more.
              </p>
            </div>
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500">Suggested Questions</h5>
               {[
                 "How many years of Django experience?",
                 "Explain your microservices approach.",
                 "What databases do you prefer?",
                 "Are you open to remote work?"
               ].map(q => (
                 <button 
                  key={q} 
                  className="w-full text-left p-4 rounded-xl border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900 transition-all text-sm text-slate-400 hover:text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
                  onClick={() => {
                    // This is handled by a ref or state in a more complex app, 
                    // for now it's a visual suggestion.
                  }}
                >
                   {q}
                 </button>
               ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <GeminiAssistant />
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Get In Touch" subtitle="Interested in collaborating? Let's discuss your next breakthrough project.">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -mr-20 -mt-20" aria-hidden="true"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Contact Information</h3>
                <p className="text-slate-400 leading-relaxed">Feel free to reach out for consultations, project proposals, or just to say hi.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800" aria-hidden="true">
                    <Mail className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Email</p>
                    <p className="text-white font-medium">{DEVELOPER_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800" aria-hidden="true">
                    <Twitter className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Twitter</p>
                    <p className="text-white font-medium">@alexrivera_dev</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
              <div className="space-y-2">
                <label htmlFor="name-field" className="text-sm font-bold text-slate-400">Full Name</label>
                <input id="name-field" type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email-field" className="text-sm font-bold text-slate-400">Email Address</label>
                <input id="email-field" type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white" placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message-field" className="text-sm font-bold text-slate-400">Message</label>
                <textarea id="message-field" required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-600/20 focus:ring-2 focus:ring-indigo-300 outline-none">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center" aria-hidden="true">
              <Terminal size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Alex Rivera</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Elite Developer Portfolio. Built with React & Gemini.
          </p>
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Sitemap</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
