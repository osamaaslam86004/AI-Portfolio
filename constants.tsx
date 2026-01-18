
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
    longDescription: "EcoStream is a high-performance API Gateway designed to handle millions of concurrent requests. Built on top of Django Ninja for its asynchronous capabilities and Redis for lightning-fast caching and rate limiting. The project involved implementing complex circuit breaker patterns, request aggregation, and dynamic routing logic to ensure 99.99% uptime across several underlying microservices.",
    tags: ["Python", "Django", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    ],
    link: "#",
    github: "#"
  },
  {
    id: "2",
    title: "FinTrack SaaS Dashboard",
    description: "Real-time financial analytics platform with complex data visualizations and automated multi-tenant isolation.",
    longDescription: "FinTrack is a robust SaaS solution tailored for financial advisors. It features a sophisticated multi-tenant architecture using PostgreSQL schemas to ensure strict data isolation. The dashboard provides real-time analytics using Django Channels for WebSockets and D3.js for interactive visualizations. Key challenges included optimizing complex SQL queries for historical data aggregation and implementing a secure, fine-grained permission system.",
    tags: ["Django", "PostgreSQL", "React", "D3.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=800&auto=format&fit=crop"
    ],
    link: "#",
    github: "#"
  },
  {
    id: "3",
    title: "NeuroMail AI Integrator",
    description: "Seamlessly connecting LLMs with traditional mailing workflows using Celery workers and RabbitMQ.",
    longDescription: "NeuroMail revolutionizes email management by integrating state-of-the-art Large Language Models into standard workflows. It uses a distributed task queue system powered by Celery and RabbitMQ to handle asynchronous AI processing without blocking the main application flow. Features include automated categorization, high-quality draft generation, and intelligent thread summarization, all exposed through a clean RESTful API.",
    tags: ["Python", "Celery", "OpenAI", "Django"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    ],
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
