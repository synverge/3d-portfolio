// Plain (non-JSX) project metadata used by the admin panel and server-side code.
// Keep in sync with projects.tsx when adding/removing projects.

export interface ProjectMeta {
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

const projectsMeta: ProjectMeta[] = [
  {
    id: "codingducks",
    category: "Coding platform",
    title: "Coding Ducks",
    src: "/assets/projects-screenshots/codingducks/landing.png",
    screenshots: ["/assets/projects-screenshots/codingducks/landing.png"],
    live: "https://www.codingducks.xyz/",
    github: "https://github.com/synverge/Coding-Ducks",
    description: "Coding ducks = LeetCode + CodePen + CSS Battles\n\nCoding Ducks is your coding dojo — where you level up your skills, battle in real-time code duels, and earn badges like a true code warrior. Track your progress, flex your brain, and climb the leaderboard. Ready to quack the code?\n\nProblems: Solve coding problems similar to LeetCode, enhancing your problem-solving skills across various languages.\n\nDucklets: Collaborate in real-time with others in a multiplayer coding environment, just like CodePen but with a social twist.\n\nUI Battles: Challenge yourself to create UI components with HTML/CSS/JS, and get instant feedback with an automated similarity scoring.\n\nContests: Organize or participate in coding competitions. Successfully used to host three contests during college.\n\nPlayground: Test and execute your code instantly in my versatile online code runner.\n\nUsers: Track your progress, earn badges, and climb the rankings with detailed user profiles and activity tracking.",
    skills: {
      frontend: ["TypeScript", "Next.js", "Chakra UI", "React Query", "Firebase"],
      backend: ["Node.js", "Express", "prisma", "Python", "PostgreSQL", "Socket.io"],
    },
  },
  {
    id: "couponluxury",
    category: "Coupon site",
    title: "Coupon Luxury",
    src: "/assets/projects-screenshots/couponluxury/landing.png",
    screenshots: [
      "/assets/projects-screenshots/couponluxury/landing.png",
      "/assets/projects-screenshots/couponluxury/stores.png",
      "/assets/projects-screenshots/couponluxury/store.png",
      "/assets/projects-screenshots/couponluxury/categories.png",
      "/assets/projects-screenshots/couponluxury/blogs.png",
      "/assets/projects-screenshots/couponluxury/cms-1.png",
      "/assets/projects-screenshots/couponluxury/cms-2.png",
    ],
    live: "https://www.couponluxury.com/",
    description: "CouponLuxury is your go-to destination for snagging the best deals without lifting a finger. Whether you're hunting for the latest discounts or trying to save a buck at your favorite stores, CouponLuxury's got you covered.\n\nAs soon as you land, boom! You're greeted with the freshest coupons and top-tier deals that'll make your wallet happy.\n\nStores: Dive into a comprehensive list of stores, each packed with exclusive deals and discounts. It's like having a VIP pass to every sale in town.\n\nCategories: Whatever you're into—fashion, tech, food—you'll find it neatly organized here. No more endless scrolling; just pick a category and get the best offers instantly.\n\nCustom CMS: Powered by Vue.js, this bad boy allows us to keep the content dynamic and up-to-date. From flash sales to limited-time offers, my CMS ensures everything's live and relevant.\n\nPlus, I've sprinkled in some extra magic like personalized deal recommendations, user-friendly search features, and a sleek, responsive design that works like a charm on any device.\n\nCouponLuxury isn't just a website; it's your personal deal-hunting assistant, ensuring you never miss out on a bargain!",
    skills: {
      frontend: ["JavaScript", "Next.js", "Chakra UI", "Vue.js"],
      backend: ["Node.js", "Express", "prisma", "PostgreSQL", "Docker"],
    },
  },
  {
    id: "the-booking-desk",
    category: "Travel",
    title: "The Booking Desk",
    src: "/assets/projects-screenshots/the-booking-desk/landing.png",
    screenshots: [
      "/assets/projects-screenshots/the-booking-desk/landing.png",
      "/assets/projects-screenshots/the-booking-desk/blog.png",
      "/assets/projects-screenshots/the-booking-desk/blogs.png",
      "/assets/projects-screenshots/the-booking-desk/contact.png",
      "/assets/projects-screenshots/the-booking-desk/cms-1.png",
      "/assets/projects-screenshots/the-booking-desk/cms-2.png",
    ],
    live: "https://thebookingdesk.com/",
    description: "The Booking Desk is your ultimate travel consultation hub, designed to turn your wanderlust dreams into reality. With a focus on smooth and visually captivating animations, navigating the site feels like a breeze—it's almost as if the destinations are calling you.\n\nA sleek, modern interface greets you, featuring the latest travel tips, deals, and must-visit spots around the globe.\n\nBlogs: Dive into the curated articles written by travel experts. Whether you're looking for hidden gems or travel hacks, our blog section has you covered.\n\nSanity CMS: Keeping everything fresh and up-to-date, integrated Sanity CMS to manage all the content with ease, ensuring you always get the latest and greatest information.\n\nWith a stunning 100% score on Lighthouse, The Booking Desk isn't just beautiful—it's built to perform. Whether you're planning your next adventure or just daydreaming, our site delivers a top-notch experience that's both informative and enjoyable.",
    skills: {
      frontend: ["TypeScript", "Next.js", "Aceternity", "Tailwind"],
      backend: ["Sanity"],
    },
  },
  {
    id: "portfolio",
    category: "Portfolio",
    title: "My Portfolio",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: [
      "/assets/projects-screenshots/portfolio/landing.png",
      "/assets/projects-screenshots/portfolio/navbar.png",
      "/assets/projects-screenshots/portfolio/projects.png",
      "/assets/projects-screenshots/portfolio/project.png",
      "/assets/projects-screenshots/portfolio/skills.png",
    ],
    live: "",
    github: "https://github.com/synverge/Portfolio",
    description: "Welcome to my digital playground, where creativity meets code in the dopest way possible.\n\nBeautiful 3D Objects: Did you see that 3D keyboard modal? That interactive keyboard is rendered in 3D on a webpage, and pressing each keycap reveals a skill in a goofy way. It's like typing, but make it art.\n\nSpace Theme: Dark background + floating particles = out-of-this-world cool.\n\nProjects: My top personal and freelance projects — no filler, all killer.\n\nThis site's not just a portfolio — it's a whole vibe.",
    skills: {
      frontend: ["TypeScript", "Next.js", "ShanCN UI", "Aceternity", "Framer Motion", "Tailwind", "Spline"],
      backend: [],
    },
  },
  {
    id: "ghostchat",
    category: "Anonymous chat",
    title: "GhostChat",
    src: "/assets/projects-screenshots/ghostchat/1.png",
    screenshots: [
      "/assets/projects-screenshots/ghostchat/1.png",
      "/assets/projects-screenshots/ghostchat/2.png",
      "/assets/projects-screenshots/ghostchat/3.png",
      "/assets/projects-screenshots/ghostchat/4.png",
    ],
    live: "https://ghostchat.vercel.app",
    github: "https://github.com/synverge/GhostChat",
    description: "Ghostchat is your go-to spot for sending anonymous messages without leaving a trace. Powered by Supabase, it's all about keeping things low-key and secure. Whether you're sharing secrets, giving feedback, or just having some fun, Ghostchat ensures your identity stays hidden, while your voice is heard. Say what you want, without the worry.",
    skills: {
      frontend: ["JavaScript", "Next.js", "Chakra UI"],
      backend: ["Supabase"],
    },
  },
  {
    id: "jra",
    category: "Result analyzer",
    title: "JNTUA Results Analyzer",
    src: "/assets/projects-screenshots/jra/1.png",
    screenshots: ["/assets/projects-screenshots/jra/1.png"],
    live: "https://synverge.github.io/JNTUA-result-analyser-spa/#/",
    description: "JNTUA Results Analyzer was a revolutionary tool designed to simplify and enhance the experience of accessing academic results. It served as a powerful proxy between the JNTUA university results website and its users.\n\nEffortless Results Retrieval: Search all your results using a single roll number, eliminating the tedious task of sifting through thousands of rows on the official site.\n\nClass-Wise Results: Get class-wise results by entering a roll number range. No more manual searches or filtering.\n\nFaculty Features: Faculty members could download batch results in Excel format, making administrative tasks a breeze.\n\nEnhanced Data Insights: Each result came with CGPA calculations, performance charts, future projections, and backlog counts.\n\nPerformance: Significantly faster and more efficient than the official site.\n\nDownfall: As of May 2022, the tool stopped working due to the introduction of CAPTCHA on the official JNTUA results site.",
    skills: {
      frontend: ["JavaScript", "Vue.js"],
      backend: ["Node.js", "MongoDB", "Express", "Docker"],
    },
  },
];

export default projectsMeta;
