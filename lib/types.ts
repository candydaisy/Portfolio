export type Lang = "en" | "th";

export type LocalizedString = {
  en: string;
  th: string;
};

export type Contact = {
  name: LocalizedString;
  telephone: string;
  email: string;
  dateOfBirth: string;
  location: LocalizedString;
  socials: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
};

export type Project = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  role: LocalizedString;
  techStack: string[];
  links: {
    github: string;
    demo: string;
    report: string;
  };
  category: "coding" | "research" | "club" | "volunteer" | string;
  image: string;
};

export type ProjectsFile = {
  projects: Project[];
};

export type Profile = {
  tagline: LocalizedString;
  about: LocalizedString;
  education: Array<{
    school: LocalizedString;
    program: LocalizedString;
    years: LocalizedString;
    gpa: string;
    highlights: LocalizedString;
  }>;
  skills: Array<{
    group: LocalizedString;
    items: string[];
  }>;
  awards: Array<{
    title: LocalizedString;
    year: string;
    detail: LocalizedString;
  }>;
  extracurriculars: Array<{
    name: LocalizedString;
    role: LocalizedString;
    years: string;
    detail: LocalizedString;
  }>;
  ui: {
    nav: Record<string, LocalizedString>;
    heroCta: LocalizedString;
    sections: Record<string, LocalizedString>;
    labels: Record<string, LocalizedString>;
    categories: Record<string, LocalizedString>;
  };
};

export function t(value: LocalizedString, lang: Lang): string {
  return value[lang];
}
