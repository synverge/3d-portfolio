"use client";

import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Globe,
  Layers,
  Briefcase,
  Award,
  FolderOpen,
  Navigation,
  BookOpen,
  LogOut,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RefreshCw,
  Upload,
} from "lucide-react";
import { PROJECT_SKILLS } from "@/data/projects";

// ─── types ───────────────────────────────────────────────────────────────────

interface SocialConfig {
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
  keywords?: string[];
  social?: SocialConfig;
}

interface SkillData {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
}

interface ExperienceData {
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

interface CertificateData {
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

interface ProjectData {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  live: string;
  github?: string;
  description?: string;
  skills: { frontend: string[]; backend: string[] };
}

interface NavLinkData {
  title: string;
  href: string;
  thumbnail: string;
}

interface BlogData {
  slug: string;
  frontmatter: Record<string, string>;
  content: string;
}

interface OverrideData {
  config?: PortfolioConfig;
  heroTagline?: string;
  heroAvatarUrl?: string;
  skills?: Record<string, SkillData>;
  experience?: ExperienceData[];
  certificates?: CertificateData[];
  projects?: ProjectData[];
  navLinks?: NavLinkData[];
}

interface AdminData {
  merged: {
    config: PortfolioConfig;
    heroTagline: string;
    heroAvatarUrl: string;
    experience: ExperienceData[];
    certificates: CertificateData[];
    projects: ProjectData[];
    navLinks: NavLinkData[] | null;
  };
  override: OverrideData;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
          "transition-colors"
        )}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
          "transition-colors resize-y"
        )}
      />
    </div>
  );
}

function SectionCard({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="font-semibold text-foreground">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="px-5 pb-5 flex flex-col gap-4">{children}</div>}
    </div>
  );
}

function SaveButton({
  onClick,
  saving,
}: {
  onClick: () => void;
  saving: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className={cn(
        "flex items-center gap-2 bg-primary text-primary-foreground",
        "rounded-lg px-4 py-2 text-sm font-semibold",
        "hover:opacity-90 transition-opacity disabled:opacity-50"
      )}
    >
      <Save className="w-4 h-4" />
      {saving ? "Saving…" : "Save Changes"}
    </button>
  );
}

function TagList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-muted text-muted-foreground text-xs rounded-full px-2.5 py-1"
          >
            {item}
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-muted-foreground hover:text-destructive transition-colors ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === ",") && input.trim()) {
              e.preventDefault();
              onChange([...items, input.trim()]);
              setInput("");
            }
          }}
          placeholder="Type and press Enter"
          className={cn(
            "flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-1 focus:ring-ring"
          )}
        />
        <button
          onClick={() => {
            if (input.trim()) {
              onChange([...items, input.trim()]);
              setInput("");
            }
          }}
          className="rounded-lg bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

const ALL_SKILLS = Object.values(PROJECT_SKILLS);

function SkillTagList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = input.trim()
    ? ALL_SKILLS.filter(
        (s) =>
          s.title.toLowerCase().includes(input.toLowerCase()) &&
          !items.includes(s.title)
      )
    : ALL_SKILLS.filter((s) => !items.includes(s.title));

  const addSkill = (title: string) => {
    if (!items.includes(title)) onChange([...items, title]);
    setInput("");
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => {
          const skill = ALL_SKILLS.find((s) => s.title.toLowerCase() === item.toLowerCase());
          return (
            <span
              key={i}
              className="flex items-center gap-1.5 bg-muted text-muted-foreground text-xs rounded-full px-2.5 py-1"
            >
              {skill?.icon && (
                <span className="text-sm leading-none">{skill.icon}</span>
              )}
              {item}
              <button
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="text-muted-foreground hover:text-destructive transition-colors ml-0.5"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      <div ref={containerRef} className="relative">
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") { setOpen(false); return; }
            if ((e.key === "Enter" || e.key === ",") && input.trim()) {
              e.preventDefault();
              const match = ALL_SKILLS.find(
                (s) => s.title.toLowerCase() === input.trim().toLowerCase()
              );
              addSkill(match ? match.title : input.trim());
            }
          }}
          placeholder="Search or type a skill…"
          className={cn(
            "w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-1 focus:ring-ring"
          )}
        />
        {open && filtered.length > 0 && (
          <div className="absolute z-50 top-full mt-1 left-0 right-0 max-h-52 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg">
            {filtered.map((s) => (
              <button
                key={s.title}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); addSkill(s.title); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
              >
                <span className="text-base leading-none shrink-0">{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageUpload({
  label,
  value,
  onChange,
  shape = "square",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  shape?: "circle" | "square" | "banner";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Network error during upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const previewClass = cn(
    "object-cover border border-border",
    shape === "circle" && "w-24 h-24 rounded-full",
    shape === "square" && "w-24 h-24 rounded-lg",
    shape === "banner" && "h-28 w-56 rounded-lg object-cover"
  );

  const placeholderClass = cn(
    "bg-muted border border-dashed border-border flex items-center justify-center text-muted-foreground shrink-0",
    shape === "circle" && "w-24 h-24 rounded-full",
    shape === "square" && "w-24 h-24 rounded-lg",
    shape === "banner" && "h-28 w-56 rounded-lg"
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-start gap-3">
        {value ? (
          <img src={value} alt="Preview" className={previewClass} />
        ) : (
          <div className={placeholderClass}>
            <Upload className="w-4 h-4" />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm",
              "hover:bg-muted transition-colors disabled:opacity-50 w-fit"
            )}
          >
            {uploading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors text-left"
            >
              Remove
            </button>
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function ScreenshotList({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setError("");
    setUploading(true);
    try {
      const results: string[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed");
          break;
        }
        results.push(data.url);
      }
      if (results.length) onChange([...items, ...results]);
    } catch {
      setError("Network error during upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Screenshots
      </label>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {items.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Screenshot ${i + 1}`}
                className="h-28 w-44 rounded-lg object-cover border border-border"
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className={cn(
                  "absolute top-1 right-1 rounded-full bg-destructive text-white w-5 h-5 flex items-center justify-center text-xs",
                  "opacity-0 group-hover:opacity-100 transition-opacity"
                )}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={cn(
          "flex items-center gap-2 rounded-lg border border-dashed border-input bg-background px-3 py-2 text-sm",
          "hover:bg-muted transition-colors disabled:opacity-50 w-fit text-muted-foreground hover:text-foreground"
        )}
      >
        {uploading ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Upload className="w-3.5 h-3.5" />
        )}
        {uploading ? "Uploading…" : "Add Screenshots"}
      </button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── section editors ─────────────────────────────────────────────────────────

function ProfileEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [cfg, setCfg] = useState<PortfolioConfig>({ ...merged.config, ...override.config });

  useEffect(
    () => setCfg({ ...merged.config, ...override.config }),
    [override.config, merged.config]
  );

  const update = (key: keyof PortfolioConfig, val: string) =>
    setCfg((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Basic Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Display Name"
            value={cfg.displayName ?? ""}
            onChange={(v) => update("displayName", v)}
            placeholder="Chanon C."
          />
          <Input
            label="Author"
            value={cfg.author ?? ""}
            onChange={(v) => update("author", v)}
            placeholder="Chanon Chirakanchanakit"
          />
          <Input
            label="Email"
            value={cfg.email ?? ""}
            onChange={(v) => update("email", v)}
            type="email"
            placeholder="email@example.com"
          />
          <Input
            label="Site URL"
            value={cfg.site ?? ""}
            onChange={(v) => update("site", v)}
            placeholder="https://..."
          />
          <Input
            label="SEO Title"
            value={cfg.title ?? ""}
            onChange={(v) => update("title", v)}
            placeholder="..."
            className="md:col-span-2"
          />
        </div>
        <Textarea
          label="Long Description (SEO)"
          value={cfg.description?.long ?? ""}
          onChange={(v) =>
            setCfg((prev) => ({
              ...prev,
              description: { ...prev.description, long: v },
            }))
          }
          rows={3}
        />
        <Textarea
          label="Short Description (SEO)"
          value={cfg.description?.short ?? ""}
          onChange={(v) =>
            setCfg((prev) => ({
              ...prev,
              description: { ...prev.description, short: v },
            }))
          }
          rows={2}
        />
        <TagList
          label="SEO Keywords"
          items={cfg.keywords ?? []}
          onChange={(items) => setCfg((prev) => ({ ...prev, keywords: items }))}
        />
      </SectionCard>

      <SaveButton
        onClick={() => onSave({ ...override, config: cfg })}
        saving={saving}
      />
    </div>
  );
}

function HeroEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [tagline, setTagline] = useState(
    override.heroTagline ?? merged.heroTagline ?? ""
  );
  const [avatarUrl, setAvatarUrl] = useState(
    override.heroAvatarUrl ?? merged.heroAvatarUrl ?? ""
  );

  useEffect(() => {
    setTagline(override.heroTagline ?? merged.heroTagline ?? "");
    setAvatarUrl(override.heroAvatarUrl ?? merged.heroAvatarUrl ?? "");
  }, [override, merged]);

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Hero Section">
        <Input
          label="Tagline (shown under your name)"
          value={tagline}
          onChange={setTagline}
          placeholder="A Full-Stack Dev & Red Team Specialist"
        />
        <ImageUpload
          label="Avatar Image"
          value={avatarUrl}
          onChange={setAvatarUrl}
          shape="circle"
        />
      </SectionCard>
      <SaveButton
        onClick={() =>
          onSave({ ...override, heroTagline: tagline, heroAvatarUrl: avatarUrl })
        }
        saving={saving}
      />
    </div>
  );
}

function SocialEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [social, setSocial] = useState<SocialConfig>({
    ...merged.config?.social,
    ...override.config?.social,
  });

  useEffect(
    () => setSocial({ ...merged.config?.social, ...override.config?.social }),
    [override.config, merged.config]
  );

  const update = (key: keyof SocialConfig, val: string) =>
    setSocial((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Social Media Links">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="GitHub"
            value={social.github ?? ""}
            onChange={(v) => update("github", v)}
            placeholder="https://github.com/..."
          />
          <Input
            label="Instagram"
            value={social.instagram ?? ""}
            onChange={(v) => update("instagram", v)}
            placeholder="https://instagram.com/..."
          />
          <Input
            label="Facebook"
            value={social.facebook ?? ""}
            onChange={(v) => update("facebook", v)}
            placeholder="https://facebook.com/..."
          />
          <Input
            label="LinkedIn"
            value={social.linkedin ?? ""}
            onChange={(v) => update("linkedin", v)}
            placeholder="https://linkedin.com/in/..."
          />
          <Input
            label="Twitter / X"
            value={social.twitter ?? ""}
            onChange={(v) => update("twitter", v)}
            placeholder="https://twitter.com/..."
          />
        </div>
      </SectionCard>
      <SaveButton
        onClick={() =>
          onSave({
            ...override,
            config: { ...override.config, social },
          })
        }
        saving={saving}
      />
    </div>
  );
}

const DEFAULT_NAV_LINKS = [
  { title: "Home", href: "/", thumbnail: "/assets/nav-link-previews/landing.png" },
  { title: "Skills", href: "/#skills", thumbnail: "/assets/nav-link-previews/skills.png" },
  { title: "Experience", href: "/#experience", thumbnail: "/assets/nav-link-previews/about.png" },
  { title: "Projects", href: "/#projects", thumbnail: "/assets/nav-link-previews/projects.png" },
  { title: "Certifications", href: "/#certifications", thumbnail: "/assets/nav-link-previews/skills.png" },
  { title: "Blogs", href: "/blogs", thumbnail: "/assets/nav-link-previews/blog.png" },
  { title: "Contact", href: "/#contact", thumbnail: "/assets/nav-link-previews/contact.png" },
];

function NavLinksEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [links, setLinks] = useState<NavLinkData[]>(
    override.navLinks ?? DEFAULT_NAV_LINKS
  );

  useEffect(() => {
    setLinks(override.navLinks ?? DEFAULT_NAV_LINKS);
  }, [override.navLinks]);

  const update = (i: number, key: keyof NavLinkData, val: string) =>
    setLinks((prev) =>
      prev.map((l, j) => (j === i ? { ...l, [key]: val } : l))
    );

  const addLink = () =>
    setLinks((prev) => [
      ...prev,
      { title: "New Link", href: "/", thumbnail: "" },
    ]);

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Navigation Menu Items">
        <div className="flex flex-col gap-4">
          {links.map((link, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-lg border border-border bg-muted/20"
            >
              <Input
                label="Title"
                value={link.title}
                onChange={(v) => update(i, "title", v)}
              />
              <Input
                label="Href"
                value={link.href}
                onChange={(v) => update(i, "href", v)}
              />
              <div className="flex gap-2 items-end md:col-span-3">
                <div className="flex-1">
                  <ImageUpload
                    label="Thumbnail Image"
                    value={link.thumbnail}
                    onChange={(v) => update(i, "thumbnail", v)}
                    shape="banner"
                  />
                </div>
                <button
                  onClick={() => setLinks((prev) => prev.filter((_, j) => j !== i))}
                  className="mb-0.5 p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addLink}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded-lg p-3 justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>
      </SectionCard>
      <SaveButton
        onClick={() => onSave({ ...override, navLinks: links })}
        saving={saving}
      />
    </div>
  );
}

function ExperienceEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [list, setList] = useState<ExperienceData[]>(
    merged.experience ?? []
  );

  useEffect(() => {
    setList(merged.experience ?? []);
  }, [merged.experience]);

  const update = (i: number, key: keyof ExperienceData, val: unknown) =>
    setList((prev) =>
      prev.map((e, j) => (j === i ? { ...e, [key]: val } : e))
    );

  const removeItem = (i: number) =>
    setList((prev) => prev.filter((_, j) => j !== i));

  const addItem = () =>
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        startDate: "",
        endDate: "Present",
        title: "New Role",
        company: "",
        description: [],
        skills: [],
      },
    ]);

  return (
    <div className="flex flex-col gap-6">
      {list.map((exp, i) => (
        <SectionCard key={exp.id} title={`${exp.title || "Untitled"} @ ${exp.company || "…"}`} defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Job Title" value={exp.title} onChange={(v) => update(i, "title", v)} />
            <Input label="Company" value={exp.company} onChange={(v) => update(i, "company", v)} />
            <Input label="Start Date" value={exp.startDate} onChange={(v) => update(i, "startDate", v)} placeholder="Jan 2024" />
            <Input label="End Date" value={exp.endDate} onChange={(v) => update(i, "endDate", v)} placeholder="Present" />
            <ImageUpload label="Logo" value={exp.logo ?? ""} onChange={(v) => update(i, "logo", v)} shape="square" />
            <ImageUpload label="Banner" value={exp.banner ?? ""} onChange={(v) => update(i, "banner", v)} shape="banner" />
          </div>
          <TagList
            label="Description Bullet Points"
            items={exp.description}
            onChange={(items) => update(i, "description", items)}
          />
          <TagList
            label="Key Takeaways"
            items={exp.keyTakeaways ?? []}
            onChange={(items) => update(i, "keyTakeaways", items)}
          />
          <TagList
            label="Skills Used"
            items={exp.skills}
            onChange={(items) => update(i, "skills", items)}
          />
          <button
            onClick={() => removeItem(i)}
            className="flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg px-3 py-2 transition-colors w-fit"
          >
            <Trash2 className="w-4 h-4" />
            Remove Entry
          </button>
        </SectionCard>
      ))}
      <button
        onClick={addItem}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded-xl p-4 justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
      <SaveButton
        onClick={() => onSave({ ...override, experience: list })}
        saving={saving}
      />
    </div>
  );
}

function CertificatesEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [list, setList] = useState<CertificateData[]>(
    merged.certificates ?? []
  );

  useEffect(() => {
    setList(merged.certificates ?? []);
  }, [merged.certificates]);

  const update = (i: number, key: keyof CertificateData, val: unknown) =>
    setList((prev) =>
      prev.map((c, j) => (j === i ? { ...c, [key]: val } : c))
    );

  return (
    <div className="flex flex-col gap-6">
      {list.map((cert, i) => (
        <SectionCard key={cert.id} title={cert.title || "Untitled Certificate"} defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={cert.title} onChange={(v) => update(i, "title", v)} />
            <Input label="Issuer" value={cert.issuer} onChange={(v) => update(i, "issuer", v)} />
            <Input label="Date" value={cert.date} onChange={(v) => update(i, "date", v)} placeholder="Jan 2026" />
            <Input label="Credential URL" value={cert.credentialUrl ?? ""} onChange={(v) => update(i, "credentialUrl", v)} placeholder="https://..." />
            <ImageUpload label="Image" value={cert.image} onChange={(v) => update(i, "image", v)} shape="square" />
          </div>
          <Textarea
            label="Description"
            value={cert.description ?? ""}
            onChange={(v) => update(i, "description", v)}
            rows={3}
          />
          <TagList
            label="Skills"
            items={cert.skills ?? []}
            onChange={(items) => update(i, "skills", items)}
          />
          <TagList
            label="Capabilities"
            items={cert.capabilities ?? []}
            onChange={(items) => update(i, "capabilities", items)}
          />
          <button
            onClick={() => setList((prev) => prev.filter((_, j) => j !== i))}
            className="flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg px-3 py-2 transition-colors w-fit"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </SectionCard>
      ))}
      <button
        onClick={() =>
          setList((prev) => [
            ...prev,
            {
              id: Date.now(),
              title: "New Certificate",
              issuer: "",
              date: "",
              image: "",
            },
          ])
        }
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded-xl p-4 justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Certificate
      </button>
      <SaveButton
        onClick={() => onSave({ ...override, certificates: list })}
        saving={saving}
      />
    </div>
  );
}

function ProjectsEditor({
  override,
  merged,
  onSave,
  saving,
}: {
  override: OverrideData;
  merged: AdminData["merged"];
  onSave: (data: OverrideData) => void;
  saving: boolean;
}) {
  const [list, setList] = useState<ProjectData[]>(
    merged.projects ?? []
  );

  useEffect(
    () => setList(merged.projects ?? []),
    [merged.projects]
  );

  const update = (i: number, key: keyof ProjectData, val: unknown) =>
    setList((prev) =>
      prev.map((p, j) => (j === i ? { ...p, [key]: val } : p))
    );

  return (
    <div className="flex flex-col gap-4">
      {list.map((proj, i) => (
        <SectionCard key={proj.id} title={proj.title || "Untitled Project"} defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="ID (slug)" value={proj.id} onChange={(v) => update(i, "id", v)} />
            <Input label="Category" value={proj.category} onChange={(v) => update(i, "category", v)} />
            <Input label="Title" value={proj.title} onChange={(v) => update(i, "title", v)} />
            <Input label="Live URL" value={proj.live} onChange={(v) => update(i, "live", v)} placeholder="https://..." />
            <Input label="GitHub URL" value={proj.github ?? ""} onChange={(v) => update(i, "github", v)} placeholder="https://github.com/..." />
            <ImageUpload label="Thumbnail Image" value={proj.src} onChange={(v) => update(i, "src", v)} shape="banner" />
          </div>
          <Textarea
            label="Project Description"
            value={proj.description ?? ""}
            onChange={(v) => update(i, "description", v)}
            rows={4}
          />
          <SkillTagList
            label="Frontend Stack"
            items={proj.skills.frontend}
            onChange={(items) =>
              update(i, "skills", { ...proj.skills, frontend: items })
            }
          />
          <SkillTagList
            label="Backend Stack"
            items={proj.skills.backend}
            onChange={(items) =>
              update(i, "skills", { ...proj.skills, backend: items })
            }
          />
          <ScreenshotList
            items={proj.screenshots}
            onChange={(items) => update(i, "screenshots", items)}
          />
          <button
            onClick={() => setList((prev) => prev.filter((_, j) => j !== i))}
            className="flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg px-3 py-2 transition-colors w-fit"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </SectionCard>
      ))}
      <button
        onClick={() =>
          setList((prev) => [
            ...prev,
            {
              id: `project-${Date.now()}`,
              category: "",
              title: "New Project",
              src: "",
              screenshots: [],
              live: "",
              skills: { frontend: [], backend: [] },
            },
          ])
        }
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded-xl p-4 justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
      <SaveButton
        onClick={() => onSave({ ...override, projects: list })}
        saving={saving}
      />
    </div>
  );
}

function BlogsEditor() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<BlogData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [blogError, setBlogError] = useState("");

  const loadBlogs = useCallback(async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      setBlogs([]);
    } finally {
      setLoadingBlogs(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const saveBlog = async () => {
    if (!editing) return;
    setSaving(true);
    setBlogError("");
    try {
      const url = isNew
        ? "/api/admin/blogs"
        : `/api/admin/blogs/${editing.slug}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setBlogError(errData.error ?? "Save failed. Please try again.");
        return;
      }
      await loadBlogs();
      setEditing(null);
    } catch {
      setBlogError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (slug: string) => {
    if (!confirm(`Delete blog "${slug}"?`)) return;
    const res = await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setBlogError((d as { error?: string }).error ?? "Delete failed. Please try again.");
      return;
    }
    await loadBlogs();
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold">
            {isNew ? "New Blog Post" : `Editing: ${editing.slug}`}
          </h2>
        </div>
        <SectionCard title="Metadata" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isNew && (
              <Input
                label="Slug (URL-safe, e.g. my-post-title)"
                value={editing.slug}
                onChange={(v) =>
                  setEditing((prev) => prev && { ...prev, slug: v })
                }
                placeholder="my-blog-post"
              />
            )}
            <Input
              label="Title"
              value={editing.frontmatter.title ?? ""}
              onChange={(v) =>
                setEditing((prev) =>
                  prev && {
                    ...prev,
                    frontmatter: { ...prev.frontmatter, title: v },
                  }
                )
              }
            />
            <Input
              label="Date (YYYY-MM-DD)"
              value={editing.frontmatter.date ?? ""}
              onChange={(v) =>
                setEditing((prev) =>
                  prev && {
                    ...prev,
                    frontmatter: { ...prev.frontmatter, date: v },
                  }
                )
              }
              placeholder="2026-01-01"
            />
            <Input
              label="Author"
              value={editing.frontmatter.author ?? ""}
              onChange={(v) =>
                setEditing((prev) =>
                  prev && {
                    ...prev,
                    frontmatter: { ...prev.frontmatter, author: v },
                  }
                )
              }
            />
            <Input
              label="Tags (comma-separated)"
              value={editing.frontmatter.tags ?? ""}
              onChange={(v) =>
                setEditing((prev) =>
                  prev && {
                    ...prev,
                    frontmatter: { ...prev.frontmatter, tags: v },
                  }
                )
              }
              placeholder="tag1, tag2"
            />
          </div>
          <Textarea
            label="Excerpt / Description"
            value={editing.frontmatter.description ?? ""}
            onChange={(v) =>
              setEditing((prev) =>
                prev && {
                  ...prev,
                  frontmatter: { ...prev.frontmatter, description: v },
                }
              )
            }
            rows={2}
          />
        </SectionCard>
        <SectionCard title="Content (MDX)" defaultOpen>
          <Textarea
            label="MDX Content"
            value={editing.content}
            onChange={(v) =>
              setEditing((prev) => prev && { ...prev, content: v })
            }
            rows={20}
            placeholder="# My Blog Post&#10;&#10;Write your content here in MDX format..."
          />
        </SectionCard>
        <div className="flex gap-3">
          <SaveButton onClick={saveBlog} saving={saving} />
          <button
            onClick={() => { setEditing(null); setBlogError(""); }}
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
        {blogError && (
          <p className="text-sm text-destructive font-mono bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
            {blogError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button
          onClick={loadBlogs}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
        <button
          onClick={() => {
            setIsNew(true);
            setEditing({
              slug: "",
              frontmatter: { title: "", date: new Date().toISOString().split("T")[0] },
              content: "",
            });
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {loadingBlogs ? (
        <p className="text-sm text-muted-foreground">Loading blogs…</p>
      ) : blogs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No blog posts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
            >
              <div>
                <div className="font-semibold text-foreground text-sm">
                  {blog.frontmatter.title ?? blog.slug}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  /{blog.slug} · {blog.frontmatter.date ?? "No date"}
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/blogs/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors hover:bg-muted"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditing(blog);
                  }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors hover:bg-muted text-sm font-medium px-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog.slug)}
                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "hero", label: "Hero", icon: Globe },
  { id: "social", label: "Social Media", icon: Globe },
  { id: "nav", label: "Nav Links", icon: Navigation },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "blogs", label: "Blogs", icon: BookOpen },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSave = async (newOverride: OverrideData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOverride),
      });
      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result?.merged && result?.override) {
          setData({ merged: result.merged, override: result.override });
        } else {
          setData((prev) => prev && { ...prev, override: newOverride });
        }
        showToast("Saved successfully!");
      } else {
        showToast("Save failed. Please try again.");
      }
    } catch {
      showToast("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const activeItem = NAV_ITEMS.find((n) => n.id === activeSection);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Layers className="w-5 h-5" />
            </button>
            <span className="font-mono font-bold text-foreground">
              Admin Panel
            </span>
            <span className="hidden md:inline text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
              Portfolio Editor
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex flex-col w-56 border-r border-border bg-card shrink-0">
          <nav className="flex flex-col gap-1 p-3">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors w-full",
                  activeSection === id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Sidebar — mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="absolute left-0 top-14 bottom-0 w-56 bg-card border-r border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1 p-3">
                {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveSection(id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors w-full",
                      activeSection === id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-foreground mb-6">
              {activeItem?.label}
            </h1>

            {loading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Loading data…
              </div>
            ) : !data ? (
              <p className="text-destructive text-sm">Failed to load data.</p>
            ) : (
              <>
                {activeSection === "profile" && (
                  <ProfileEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "hero" && (
                  <HeroEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "social" && (
                  <SocialEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "nav" && (
                  <NavLinksEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "experience" && (
                  <ExperienceEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "certificates" && (
                  <CertificatesEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "projects" && (
                  <ProjectsEditor
                    override={data.override}
                    merged={data.merged}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                {activeSection === "blogs" && <BlogsEditor />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
            "bg-foreground text-background text-sm font-medium",
            "rounded-xl px-5 py-3 shadow-lg",
            "animate-in fade-in slide-in-from-bottom-2 duration-200"
          )}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
