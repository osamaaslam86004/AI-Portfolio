
import React from 'react';
import { Project, Skill } from './types';
import { 
  Python, 
  Database, 
  Globe, 
  Cpu, 
  Layout, 
  Layers, 
  Terminal, 
  Server,
  Code2
} from 'lucide-react';

export const DEVELOPER_INFO = {
  name: "Alex Rivera",
  role: "Senior Python & Django Architect",
  bio: "Full-stack artisan specializing in scalable Python backend systems and robust Django architectures. Crafting clean code and high-performance APIs for the modern web.",
  location: "San Francisco, CA",
  email: "alex.rivera@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "EcoStream API Gateway",
    description: "A high-concurrency microservices orchestrator built with Django Ninja and Redis, processing over 10M requests daily.",
    tags: ["Python", "Django", "Redis", "Docker"],
    image: "https://picsum.photos/seed/project1/800/600",
    link: "#",
    github: "#"
  },
  {
    id: "2",
    title: "FinTrack SaaS Dashboard",
    description: "Real-time financial analytics platform with complex data visualizations and automated multi-tenant isolation.",
    tags: ["Django", "PostgreSQL", "React", "D3.js"],
    image: "https://picsum.photos/seed/project2/800/600",
    link: "#",
    github: "#"
  },
  {
    id: "3",
    title: "NeuroMail AI Integrator",
    description: "Seamlessly connecting LLMs with traditional mailing workflows using Celery workers and RabbitMQ.",
    tags: ["Python", "Celery", "OpenAI", "Django"],
    image: "https://picsum.photos/seed/project3/800/600",
    link: "#",
    github: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "Python", level: 95, category: "Backend" },
  { name: "Django / DRF", level: 98, category: "Backend" },
  { name: "FastAPI", level: 85, category: "Backend" },
  { name: "PostgreSQL", level: 90, category: "Database" },
  { name: "Redis", level: 80, category: "Database" },
  { name: "React / TS", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Docker", level: 88, category: "DevOps" },
  { name: "AWS / GCP", level: 82, category: "DevOps" },
  { name: "CI/CD Pipelines", level: 85, category: "DevOps" },
];

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Ask Gemini", href: "#ask-ai" }
];
