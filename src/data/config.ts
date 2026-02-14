const config = {
  title: "Chanon Chirakanchanakit | Full-Stack Developer & Red Team Specialist",
  description: {
    long: "Explore the portfolio of Chanon, a full-stack developer and cyber security specialist (Red Team) who excels in web reverse engineering, interactive web experiences, 3D animations, and innovative projects. Discover my latest work and let's build something amazing together!",
    short:
      "Discover the portfolio of Chanon, a full-stack developer and red team specialist creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Chanon",
    "portfolio",
    "full-stack developer",
    "cyber security",
    "red team",
    "web reverse engineering",
    "web development",
    "3D animations",
    "interactive websites",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Chanon Chirakanchanakit",
  displayName: "Chanon C.",
  email: "serross1223@gmail.com",
  site: "",

  // for github stars button
  githubUsername: "synverge",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "",
    instagram: "https://www.instagram.com/_ssnjira/",
    facebook: "https://www.facebook.com/profile.php?id=100070306945540",
    github: "https://github.com/synverge",
  },
};
export { config };
