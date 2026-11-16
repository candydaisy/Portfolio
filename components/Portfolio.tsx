"use client";

import { useEffect, useState } from "react";
import AgeDisplay from "@/components/AgeDisplay";
import { AsciiBanner, AsciiBox } from "@/components/Ascii";
import { useLanguage } from "@/components/LanguageProvider";
import type { Contact, Profile, Project } from "@/lib/types";
import { t } from "@/lib/types";

type PortfolioProps = {
  contact: Contact;
  projects: Project[];
  profile: Profile;
  banner: string;
};

const NAV_KEYS = [
  "about",
  "education",
  "projects",
  "skills",
  "awards",
  "extracurriculars",
  "contact",
] as const;

const DOTS = ".".repeat(120);

function KeyValue({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="kv">
      <dt>{label}</dt>
      <span className="kv-dots" aria-hidden="true">
        {DOTS}
      </span>
      <dd>{children}</dd>
    </div>
  );
}

export default function Portfolio({ contact, projects, profile, banner }: PortfolioProps) {
  const { lang, setLang } = useLanguage();
  const ui = profile.ui;
  const navKeys = NAV_KEYS.filter((key) => key !== "awards" || profile.awards.length > 0);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const label = (key: string) => t(ui.sections[key], lang).toUpperCase();

  return (
    <div className="portfolio">
      <header className="topbar">
        <a href="#top" className="brand-mark">
          <span className="prompt" aria-hidden="true">
            ~/
          </span>
          {contact.socials.github ? contact.socials.github.split("/").pop() : "portfolio"}
        </a>
        <nav className="nav" aria-label="Primary">
          {navKeys.map((key) => (
            <a key={key} href={`#${key}`}>
              {t(ui.nav[key], lang)}
            </a>
          ))}
        </nav>
        <div className="lang-toggle" role="group" aria-label="Language">
          <span aria-hidden="true">[</span>
          <button
            type="button"
            className={lang === "en" ? "active" : ""}
            aria-pressed={lang === "en"}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <span aria-hidden="true">|</span>
          <button
            type="button"
            className={lang === "th" ? "active" : ""}
            aria-pressed={lang === "th"}
            onClick={() => setLang("th")}
          >
            TH
          </button>
          <span aria-hidden="true">]</span>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <p className="term-line" aria-hidden="true">
            <span className="prompt">$</span> whoami
          </p>
          <AsciiBanner art={banner} label={contact.name.en} />
          <h1 className="hero-name">{t(contact.name, lang)}</h1>
          <p className="hero-tagline">{t(profile.tagline, lang)}</p>
          <a className="btn" href="#projects">
            {t(ui.heroCta, lang)}
          </a>
        </section>

        <AsciiBox id="about" title={label("about")}>
          <p className="prose">{t(profile.about, lang)}</p>
        </AsciiBox>

        <AsciiBox id="education" title={label("education")}>
          <ul className="tree">
            {profile.education.map((edu) => (
              <li key={t(edu.school, "en")}>
                <div className="entry-head">
                  <strong>{t(edu.school, lang)}</strong>
                  <span className="meta">{t(edu.years, lang)}</span>
                </div>
                <p>{t(edu.program, lang)}</p>
                {edu.gpa && (
                  <p>
                    {t(ui.labels.gpa, lang)}: <span className="accent">{edu.gpa}</span>
                  </p>
                )}
                {t(edu.highlights, lang) && <p className="muted">{t(edu.highlights, lang)}</p>}
              </li>
            ))}
          </ul>
        </AsciiBox>

        <AsciiBox id="projects" title={label("projects")}>
          <div className="project-list">
            {projects.map((project) => {
              const categoryLabel =
                ui.categories[project.category] ??
                ({ en: project.category, th: project.category } as const);
              const links = [
                project.links.github && { href: project.links.github, label: "GitHub" },
                project.links.demo && { href: project.links.demo, label: "Demo" },
                project.links.report && { href: project.links.report, label: "Report" },
              ].filter(Boolean) as Array<{ href: string; label: string }>;

              return (
                <AsciiBox
                  key={project.id}
                  as="article"
                  level={3}
                  className="project"
                  title={t(project.title, lang)}
                  meta={t(categoryLabel, lang).toLowerCase()}
                >
                  {(project.date || t(project.role, lang)) && (
                    <p className="project-meta">
                      {project.date && <span className="accent">{project.date}</span>}
                      {project.date && t(project.role, lang) && " · "}
                      {t(project.role, lang) && (
                        <>
                          {t(ui.labels.role, lang)}: {t(project.role, lang)}
                        </>
                      )}
                    </p>
                  )}
                  <p className="prose">{t(project.description, lang)}</p>
                  <ul className="tags" aria-label={t(ui.labels.stack, lang)}>
                    {project.techStack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {links.length > 0 && (
                    <p className="project-links">
                      {links.map((link) => (
                        <a
                          key={link.href}
                          className="btn btn-small"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </p>
                  )}
                </AsciiBox>
              );
            })}
          </div>
        </AsciiBox>

        <AsciiBox id="skills" title={label("skills")}>
          <ul className="tree">
            {profile.skills.map((group) => (
              <li key={t(group.group, "en")}>
                <strong>{t(group.group, lang)}</strong>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </AsciiBox>

        {profile.awards.length > 0 && (
          <AsciiBox id="awards" title={label("awards")}>
            <ul className="tree">
              {profile.awards.map((award) => (
                <li key={t(award.title, "en")}>
                  <div className="entry-head">
                    <strong>{t(award.title, lang)}</strong>
                    <span className="meta">{award.year}</span>
                  </div>
                  <p className="muted">{t(award.detail, lang)}</p>
                </li>
              ))}
            </ul>
          </AsciiBox>
        )}

        <AsciiBox id="extracurriculars" title={label("extracurriculars")}>
          <ul className="tree">
            {profile.extracurriculars.map((item) => (
              <li key={t(item.name, "en")}>
                <div className="entry-head">
                  <strong>{t(item.name, lang)}</strong>
                  {item.years && <span className="meta">{item.years}</span>}
                </div>
                {t(item.role, lang) && (
                  <p>
                    {t(ui.labels.role, lang)}: {t(item.role, lang)}
                  </p>
                )}
                {t(item.detail, lang) && <p className="muted">{t(item.detail, lang)}</p>}
              </li>
            ))}
          </ul>
        </AsciiBox>

        <AsciiBox id="contact" title={label("contact")}>
          <dl className="kv-list">
            {contact.telephone && (
              <KeyValue label={t(ui.labels.phone, lang)}>
                <a href={`tel:${contact.telephone.replace(/\s+/g, "")}`}>{contact.telephone}</a>
              </KeyValue>
            )}
            {contact.email && (
              <KeyValue label={t(ui.labels.email, lang)}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </KeyValue>
            )}
            {contact.dateOfBirth && (
              <>
                <KeyValue label={t(ui.labels.dob, lang)}>{contact.dateOfBirth}</KeyValue>
                <KeyValue label={t(ui.labels.age, lang)}>
                  <AgeDisplay
                    dateOfBirth={contact.dateOfBirth}
                    lang={lang}
                    yearsLabel={ui.labels.years}
                  />
                </KeyValue>
              </>
            )}
            <KeyValue label={t(ui.labels.location, lang)}>{t(contact.location, lang)}</KeyValue>
            {contact.socials.github && (
              <KeyValue label="GitHub">
                <a href={contact.socials.github} target="_blank" rel="noopener noreferrer">
                  {contact.socials.github.replace(/^https?:\/\//, "")}
                </a>
              </KeyValue>
            )}
            {contact.socials.linkedin && (
              <KeyValue label="LinkedIn">
                <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  {contact.socials.linkedin.replace(/^https?:\/\//, "")}
                </a>
              </KeyValue>
            )}
            {contact.socials.portfolio && (
              <KeyValue label="Portfolio">
                <a href={contact.socials.portfolio} target="_blank" rel="noopener noreferrer">
                  {contact.socials.portfolio.replace(/^https?:\/\//, "")}
                </a>
              </KeyValue>
            )}
          </dl>
        </AsciiBox>
      </main>

      <footer className="site-footer">
        <p>
          <span className="prompt" aria-hidden="true">
            $
          </span>{" "}
          echo &quot;© {year ?? "----"} {t(contact.name, lang)}&quot;
          <span className="cursor" aria-hidden="true">
            █
          </span>
        </p>
      </footer>
    </div>
  );
}
