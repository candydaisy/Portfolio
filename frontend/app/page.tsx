import Portfolio from "@/components/Portfolio";
import contact from "@/data/contact.json";
import projectsFile from "@/data/projects.json";
import profile from "@/data/profile.json";
import type { Contact, Profile, ProjectsFile } from "@/lib/types";
import { renderBanner } from "@/lib/banner";

export default function Home() {
  const contactData = contact as Contact;
  const projectsData = projectsFile as ProjectsFile;
  const profileData = profile as Profile;

  return (
    <Portfolio
      contact={contactData}
      projects={projectsData.projects}
      profile={profileData}
      banner={renderBanner(contactData.name.en.split(" ")[0])}
    />
  );
}
