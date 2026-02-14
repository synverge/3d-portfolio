// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  PYTHON = "python",
  BASH = "bash",
  GO = "go",
  MYSQL = "mysql",
  NODEJS = "nodejs",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  NPM = "npm",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  GCP = "gcp",
  BURPSUITE = "burpsuite",
  WIRESHARK = "wireshark",
  METASPLOIT = "metasploit",
  NMAP = "nmap",
  KALI = "kali",
  POSTMAN = "postman",
  CLOUDFLARE = "cloudflare",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription: "the internet's granddad, still bussin' fr fr! 💀🔥",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription: "styling with the ultimate drip, no cap 💁‍♂️🔥",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.PYTHON]: {
    id: 5,
    name: "python",
    label: "Python",
    shortDescription: "scripting, hacking, automating — the swiss army knife 🐍🔥",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.BASH]: {
    id: 6,
    name: "bash",
    label: "Bash",
    shortDescription: "one-liners that hit different in the terminal 🖥️💨",
    color: "#4eaa25",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  [SkillNames.GO]: {
    id: 7,
    name: "go",
    label: "Go",
    shortDescription: "fast, concurrent, and built for security tooling 🐹⚡",
    color: "#00add8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  },
  [SkillNames.MYSQL]: {
    id: 8,
    name: "mysql",
    label: "MySQL",
    shortDescription: "the OG relational database, still going strong 🐬📊",
    color: "#4479a1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 10,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 11,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.GIT]: {
    id: 12,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 13,
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.NPM]: {
    id: 14,
    name: "npm",
    label: "NPM",
    shortDescription: "package manager said 'I gotchu fam', period! 📦💯",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  [SkillNames.LINUX]: {
    id: 15,
    name: "linux",
    label: "Linux",
    shortDescription: "where 'chmod 777' is the ultimate flex 🔓🙌",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 16,
    name: "docker",
    label: "Docker",
    shortDescription: "The best containerization! 🐳🔥",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.NGINX]: {
    id: 17,
    name: "nginx",
    label: "NginX",
    shortDescription: "reverse proxy go zoom zoom, sheesh! 🚗💨",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  [SkillNames.GCP]: {
    id: 18,
    name: "gcp",
    label: "Google Cloud",
    shortDescription:
      "cloud computing but make it Google vibes, living rent free! ☁️🔥",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  [SkillNames.BURPSUITE]: {
    id: 19,
    name: "burpsuite",
    label: "Burp Suite",
    shortDescription: "intercepting requests like a web-hunting ninja 🕵️🔓",
    color: "#ff6633",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/burpsuite.svg",
  },
  [SkillNames.WIRESHARK]: {
    id: 20,
    name: "wireshark",
    label: "Wireshark",
    shortDescription: "sniffing packets like a pro, every byte tells a story 🦈📡",
    color: "#1679a7",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/wireshark.svg",
  },
  [SkillNames.METASPLOIT]: {
    id: 21,
    name: "metasploit",
    label: "Metasploit",
    shortDescription: "exploit all the things, ethically of course 💀🛡️",
    color: "#2596cd",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/metasploit.svg",
  },
  [SkillNames.NMAP]: {
    id: 22,
    name: "nmap",
    label: "Nmap",
    shortDescription: "scanning networks like it's nobody's business 🗺️🔍",
    color: "#4682b4",
    icon: "https://nmap.org/images/sitelogo-nmap-rgb-172x65.png",
  },
  [SkillNames.KALI]: {
    id: 23,
    name: "kali",
    label: "Kali Linux",
    shortDescription: "the hacker's OS, penetration testing on steroids 🐉🔐",
    color: "#557c94",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/kalilinux.svg",
  },
  [SkillNames.POSTMAN]: {
    id: 24,
    name: "postman",
    label: "Postman",
    shortDescription: "API testing with style, no endpoint left behind 📮✅",
    color: "#ff6c37",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  [SkillNames.CLOUDFLARE]: {
    id: 25,
    name: "cloudflare",
    label: "Cloudflare",
    shortDescription: "the web's bodyguard — WAF, CDN, and DDoS protection 🛡️☁️",
    color: "#f38020",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cloudflare.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Dec 2024",
    endDate: "Present",
    title: "Full Stack Developer",
    company: "OmniNexus Sdn Bhd",
    description: [
      "Built a custom image editor from scratch, cutting $4.8k/year in SaaS costs.",
      "Architected async job queues processing 1k+ AI tasks daily with bulletproof reliability.",
      "Optimized media delivery pipeline, slashing asset load times by 40%.",
      "Shipped high-impact features end-to-end from requirements to production.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.PYTHON,
      SkillNames.NODEJS,
      SkillNames.POSTGRES,
      SkillNames.MONGODB,
      SkillNames.DOCKER,
      SkillNames.GCP,
      SkillNames.NGINX,
    ],
  },
  {
    id: 2,
    startDate: "Apr 2022",
    endDate: "Dec 2024",
    title: "Freelance Full Stack Developer",
    company: "Self-employed",
    description: [
      "Transformed chaotic Excel sheets into polished internal tools for various clients.",
      "Shipped dashboards and custom CMS platforms tailored to each client's workflow.",
      "Automated repetitive processes, improving efficiency and reducing human error.",
      "Focused on clean, maintainable code and interfaces that users actually enjoy.",
    ],
    skills: [
      SkillNames.JS,
      SkillNames.PYTHON,
      SkillNames.NODEJS,
      SkillNames.BASH,
      SkillNames.MONGODB,
      SkillNames.POSTGRES,
      SkillNames.LINUX,
      SkillNames.DOCKER,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

