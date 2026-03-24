import { promises as fs } from "fs";
import path from "path";
import { config as defaultConfig } from "@/data/config";
import {
  SKILLS as defaultSkills,
  EXPERIENCE as defaultExperience,
  CERTIFICATES as defaultCertificates,
} from "@/data/constants";
import defaultProjects from "@/data/projects-meta";

const OVERRIDE_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "portfolio-override.json"
);

export interface NavLink {
  title: string;
  href: string;
  thumbnail: string;
}

export interface SkillOverride {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
}

export interface ExperienceOverride {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: string[];
  logo?: string;
  banner?: string;
  keyTakeaways?: string[];
}

export interface CertificateOverride {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  description?: string;
  skills?: string[];
  capabilities?: string[];
}

export interface ProjectOverride {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  live: string;
  github?: string;
  description?: string;
  skills: {
    frontend: string[];
    backend: string[];
  };
}

export interface PortfolioOverride {
  config?: {
    title?: string;
    displayName?: string;
    email?: string;
    site?: string;
    author?: string;
    description?: {
      long?: string;
      short?: string;
    };
    keywords?: string[];
    social?: {
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      facebook?: string;
      github?: string;
    };
  };
  heroTagline?: string;
  heroAvatarUrl?: string;
  skills?: Record<string, SkillOverride>;
  experience?: ExperienceOverride[];
  certificates?: CertificateOverride[];
  projects?: ProjectOverride[];
  navLinks?: NavLink[];
}

export async function readOverride(): Promise<PortfolioOverride> {
  try {
    const content = await fs.readFile(OVERRIDE_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

export async function writeOverride(data: PortfolioOverride): Promise<void> {
  const tmp = OVERRIDE_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, OVERRIDE_FILE);
}

export async function getMergedPortfolioData(preloadedOverride?: PortfolioOverride) {
  const override = preloadedOverride ?? await readOverride();

  return {
    config: {
      ...defaultConfig,
      ...override.config,
      description: {
        ...defaultConfig.description,
        ...override.config?.description,
      },
      social: {
        ...defaultConfig.social,
        ...override.config?.social,
      },
    },
    heroTagline:
      override.heroTagline ?? "A Full-Stack Dev & Red Team Specialist",
    heroAvatarUrl: override.heroAvatarUrl ?? "/assets/avatar.jpg",
    skills:
      override.skills != null
        ? override.skills
        : (defaultSkills as Record<string, SkillOverride>),
    experience: (() => {
      if (override.experience == null) return defaultExperience;
      const defs = defaultExperience as ExperienceOverride[];
      const mergedExp = defs.map((def) => {
        const ov = override.experience!.find((e) => e.id === def.id);
        return ov ? { ...def, ...ov } : def;
      });
      const added = override.experience.filter(
        (ov) => !defs.some((d) => d.id === ov.id)
      );
      return [...mergedExp, ...added];
    })(),
    certificates: (() => {
      if (override.certificates == null) return defaultCertificates;
      const defs = defaultCertificates as CertificateOverride[];
      const mergedCerts = defs.map((def) => {
        const ov = override.certificates!.find((c) => c.id === def.id);
        return ov ? { ...def, ...ov } : def;
      });
      const added = override.certificates.filter(
        (ov) => !defs.some((d) => d.id === ov.id)
      );
      return [...mergedCerts, ...added];
    })(),
    projects: (() => {
      if (override.projects == null) return defaultProjects;
      const defs = defaultProjects as ProjectOverride[];
      const mergedProjects = defs.map((def) => {
        const ov = override.projects!.find((p) => p.id === def.id);
        return ov ? { ...def, ...ov } : def;
      });
      const added = override.projects.filter(
        (ov) => !defs.some((d) => d.id === ov.id)
      );
      return [...mergedProjects, ...added];
    })(),
    navLinks: override.navLinks ?? null,
  };
}
