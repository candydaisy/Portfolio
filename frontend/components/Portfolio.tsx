"use client";

import { useEffect, useState } from "react";
import AgeDisplay from "@/components/AgeDisplay";
import { useLanguage } from "@/components/LanguageProvider";
import type { Contact, Profile, Project } from "@/lib/types";
import { t } from "@/lib/types";

type PortfolioProps = {
  contact: Contact;
  projects: Project[];
  profile: Profile;
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

function AsciiRule({ label }: { label?: string }) {
  if (!label) {
    return <div className="ascii-rule" aria-hidden="true">{`+${"─".repeat(48)}+`}</div>;
  }
  const pad = Math.max(2, 46 - label.length);
  const left = Math.floor(pad / 2);
  const right = pad - left;
  return (
    <div className="ascii-rule" aria-hidden="true">
      {`+${"─".repeat(left)} ${label} ${"─".repeat(right)}+`}
    </div>
  );
}

export default function Portfolio({ contact, projects, profile }: PortfolioProps) {
  const { lang, setLang } = useLanguage();
  const ui = profile.ui;
  const navKeys = NAV_KEYS.filter((key) => key !== "awards" || profile.awards.length > 0);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="portfolio">
      <header className="topbar">
        <a href="#top" className="brand-mark">
          {t(contact.name, lang)}
        </a>
        <nav className="nav" aria-label="Primary">
          {navKeys.map((key) => (
            <a key={key} href={`#${key}`}>
              {t(ui.nav[key], lang)}
            </a>
          ))}
        </nav>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button
            type="button"
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={lang === "th" ? "active" : ""}
            onClick={() => setLang("th")}
          >
            TH
          </button>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="hero-copy">
            <p className="hero-kicker">M.6 · Portfolio</p>
            <h1 className="hero-name">{t(contact.name, lang)}</h1>
            <p className="hero-tagline">{t(profile.tagline, lang)}</p>
            <a className="hero-cta" href="#projects">
              {t(ui.heroCta, lang)}
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <AsciiRule label={t(ui.sections.about, lang).toUpperCase()} />
          <h2>{t(ui.sections.about, lang)}</h2>
          <p className="prose">{t(profile.about, lang)}</p>
        </section>

        <section id="education" className="section">
          <AsciiRule label={t(ui.sections.education, lang).toUpperCase()} />
          <h2>{t(ui.sections.education, lang)}</h2>
          <ul className="stack-list">
            {profile.education.map((edu) => (
              <li key={t(edu.school, "en")} className="entry">
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
        </section>

        <section id="projects" className="section">
          <AsciiRule label={t(ui.sections.projects, lang).toUpperCase()} />
          <h2>{t(ui.sections.projects, lang)}</h2>
          <ul className="project-list">
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
                <li key={project.id} className="project-entry">
                  <div className="entry-head">
                    <strong>{t(project.title, lang)}</strong>
                    <span className="meta">{project.date}</span>
                  </div>
                  <p className="project-cat">
                    [{t(categoryLabel, lang)}]
                    {t(project.role, lang) && (
                      <>
                        {" "}· {t(ui.labels.role, lang)}: {t(project.role, lang)}
                      </>
                    )}
                  </p>
                  <p className="prose">{t(project.description, lang)}</p>
                  <p className="stack-line">
                    {t(ui.labels.stack, lang)}: {project.techStack.join(" · ")}
                  </p>
                  {links.length > 0 && (
                    <p className="project-links">
                      {t(ui.labels.links, lang)}:{" "}
                      {links.map((link, i) => (
                        <span key={link.href}>
                          {i > 0 && " · "}
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="skills" className="section">
          <AsciiRule label={t(ui.sections.skills, lang).toUpperCase()} />
          <h2>{t(ui.sections.skills, lang)}</h2>
          <ul className="skills-grid">
            {profile.skills.map((group) => (
              <li key={t(group.group, "en")}>
                <strong>{t(group.group, lang)}</strong>
                <p>{group.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </section>

        {profile.awards.length > 0 && (
        <section id="awards" className="section">
          <AsciiRule label={t(ui.sections.awards, lang).toUpperCase()} />
          <h2>{t(ui.sections.awards, lang)}</h2>
          <ul className="stack-list">
            {profile.awards.map((award) => (
              <li key={t(award.title, "en")} className="entry">
                <div className="entry-head">
                  <strong>{t(award.title, lang)}</strong>
                  <span className="meta">{award.year}</span>
                </div>
                <p className="muted">{t(award.detail, lang)}</p>
              </li>
            ))}
          </ul>
        </section>
        )}

        <section id="extracurriculars" className="section">
          <AsciiRule label={t(ui.sections.extracurriculars, lang).toUpperCase()} />
          <h2>{t(ui.sections.extracurriculars, lang)}</h2>
          <ul className="stack-list">
            {profile.extracurriculars.map((item) => (
              <li key={t(item.name, "en")} className="entry">
                <div className="entry-head">
                  <strong>{t(item.name, lang)}</strong>
                  <span className="meta">{item.years}</span>
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
        </section>

        <section id="contact" className="section contact-section">
          <AsciiRule label={t(ui.sections.contact, lang).toUpperCase()} />
          <h2>{t(ui.sections.contact, lang)}</h2>
          <dl className="contact-grid">
            {contact.telephone && (
            <div>
              <dt>{t(ui.labels.phone, lang)}</dt>
              <dd>
                <a href={`tel:${contact.telephone.replace(/\s+/g, "")}`}>
                  {contact.telephone}
                </a>
              </dd>
            </div>
            )}
            {contact.email && (
            <div>
              <dt>{t(ui.labels.email, lang)}</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            )}
            {contact.dateOfBirth && (
            <>
            <div>
              <dt>{t(ui.labels.dob, lang)}</dt>
              <dd>{contact.dateOfBirth}</dd>
            </div>
            <div>
              <dt>{t(ui.labels.age, lang)}</dt>
              <dd>
                <AgeDisplay
                  dateOfBirth={contact.dateOfBirth}
                  lang={lang}
                  yearsLabel={ui.labels.years}
                />
              </dd>
            </div>
            </>
            )}
            <div>
              <dt>{t(ui.labels.location, lang)}</dt>
              <dd>{t(contact.location, lang)}</dd>
            </div>
          </dl>
          <p className="social-row">
            {contact.socials.github && (
              <a href={contact.socials.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {contact.socials.linkedin && (
              <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {contact.socials.portfolio && (
              <a href={contact.socials.portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            )}
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <AsciiRule />
        <p>
          © {year ?? "----"} {t(contact.name, lang)}
          <span className="cursor" aria-hidden="true">
            _
          </span>
        </p>
      </footer>
    </div>
  );
}
