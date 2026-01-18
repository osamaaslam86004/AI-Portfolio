
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  screenshots?: string[];
  link: string;
  github: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Database';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
