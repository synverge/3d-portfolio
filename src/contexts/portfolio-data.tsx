"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { config as defaultConfig } from "@/data/config";
import {
  EXPERIENCE as defaultExperience,
  CERTIFICATES as defaultCertificates,
} from "@/data/constants";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  github?: string;
}

interface PortfolioConfig {
  title?: string;
  displayName?: string;
  email?: string;
  site?: string;
  author?: string;
  description?: { long?: string; short?: string };
  social?: SocialLinks;
}

interface NavLink {
  title: string;
  href: string;
  thumbnail: string;
}

export interface Experience {
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

export interface Certificate {
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

export interface ProjectMeta {
  id: string;
  title: string;
  category: string;
  src: string;
  live: string;
  github?: string;
  description?: string;
  screenshots?: string[];
  skills?: { frontend: string[]; backend: string[] };
}

interface PortfolioData {
  config: typeof defaultConfig;
  heroTagline: string;
  heroAvatarUrl: string;
  experience: Experience[];
  certificates: Certificate[];
  projects: ProjectMeta[];
  navLinks: NavLink[] | null;
}

const defaultData: PortfolioData = {
  config: defaultConfig,
  heroTagline: "A Full-Stack Dev & Red Team Specialist",
  heroAvatarUrl: "/assets/avatar.jpg",
  experience: defaultExperience as Experience[],
  certificates: defaultCertificates as Certificate[],
  projects: [],
  navLinks: null,
};

const PortfolioDataContext = createContext<PortfolioData>(defaultData);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    fetch("/api/portfolio-data")
      .then((r) => r.json())
      .then((d: Partial<PortfolioData>) => {
        setData((prev) => ({
          config: d.config
            ? {
                ...prev.config,
                ...d.config,
                description: {
                  ...prev.config.description,
                  ...d.config.description,
                },
                social: {
                  ...prev.config.social,
                  ...d.config.social,
                },
              }
            : prev.config,
          heroTagline: d.heroTagline ?? prev.heroTagline,
          heroAvatarUrl: d.heroAvatarUrl ?? prev.heroAvatarUrl,
          experience:
            d.experience && d.experience.length > 0
              ? d.experience
              : prev.experience,
          certificates:
            d.certificates && d.certificates.length > 0
              ? d.certificates
              : prev.certificates,
          projects:
            Array.isArray(d.projects) && d.projects.length > 0
              ? d.projects
              : prev.projects,
          navLinks: d.navLinks ?? prev.navLinks,
        }));
      })
      .catch(() => {
        // Silently fall back to hardcoded defaults
      });
  }, []);

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  return useContext(PortfolioDataContext);
}
