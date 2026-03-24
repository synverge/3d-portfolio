import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiJavaFill, RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiAmazonwebservices,
  SiAlpinedotjs,
  SiAndroid,
  SiAngular,
  SiAnsible,
  SiAntdesign,
  SiApache,
  SiApachecassandra,
  SiApachekafka,
  SiApollographql,
  SiArduino,
  SiAstro,
  SiAuth0,
  SiBabel,
  SiBitbucket,
  SiBootstrap,
  SiBulma,
  SiBun,
  SiCapacitor,
  SiChakraui,
  SiCircleci,
  SiClojure,
  SiCloudflare,
  SiCockroachlabs,
  SiContentful,
  SiCrystal,
  SiCss3,
  SiCucumber,
  SiCypress,
  SiDaisyui,
  SiDart,
  SiDatadog,
  SiDeno,
  SiDigitalocean,
  SiDjango,
  SiDiscord,
  SiDocker,
  SiDrizzle,
  SiEclipseide,
  SiElasticsearch,
  SiElectron,
  SiElixir,
  SiEsbuild,
  SiEslint,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGatsby,
  SiGhost,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGo,
  SiGnubash,
  SiGodotengine,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiHaskell,
  SiHeroku,
  SiHtml5,
  SiHtmx,
  SiHuggingface,
  SiInfluxdb,
  SiInsomnia,
  SiIonic,
  SiIntellijidea,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJira,
  SiJson,
  SiJupyter,
  SiKeras,
  SiKeycloak,
  SiKotlin,
  SiKubernetes,
  SiLaravel,
  SiLess,
  SiLinux,
  SiLua,
  SiMarkdown,
  SiMariadb,
  SiMobx,
  SiMongoose,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNeo4J,
  SiNeovim,
  SiNestjs,
  SiNetlify,
  SiNewrelic,
  SiNginx,
  SiNotion,
  SiNpm,
  SiNumpy,
  SiNuxtdotjs,
  SiObsidian,
  SiOkta,
  SiOpencv,
  SiOpenai,
  SiOpentelemetry,
  SiPandas,
  SiPaypal,
  SiPerl,
  SiPhoenixframework,
  SiPhp,
  SiPlanetscale,
  SiPnpm,
  SiPostman,
  SiPostcss,
  SiPostgresql,
  SiPreact,
  SiPrettier,
  SiPrisma,
  SiPrometheus,
  SiPwa,
  SiPython,
  SiPycharm,
  SiPytorch,
  SiRabbitmq,
  SiRailway,
  SiRaspberrypi,
  SiReactquery,
  SiRedis,
  SiReduxsaga,
  SiRedux,
  SiRemix,
  SiRollupdotjs,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiSanity,
  SiSass,
  SiScala,
  SiScikitlearn,
  SiSentry,
  SiSequelize,
  SiShadcnui,
  SiShell,
  SiShopify,
  SiSlack,
  SiSocketdotio,
  SiSolid,
  SiSpring,
  SiSpringboot,
  SiSqlite,
  SiStorybook,
  SiStrapi,
  SiStripe,
  SiStyledcomponents,
  SiSupabase,
  SiSvelte,
  SiSwift,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiThreedotjs,
  SiTraefikproxy,
  SiTrpc,
  SiTurborepo,
  SiTypescript,
  SiUbuntu,
  SiUnity,
  SiUnrealengine,
  SiVercel,
  SiVim,
  SiVitest,
  SiVite,
  SiVuedotjs,
  SiWebrtc,
  SiWebassembly,
  SiWebstorm,
  SiWebpack,
  SiWordpress,
  SiXcode,
  SiXml,
  SiYarn,
} from "react-icons/si";
import { TbBrandAzure, TbBrandCpp, TbBrandCSharp, TbBrandFramerMotion, TbBrandPowershell, TbBrandReactNative, TbBrandVisualStudio, TbBrandVscode, TbBrandXamarin } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener noreferrer"
        target="_blank"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
export const PROJECT_SKILLS: Record<string, Skill> = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // ─── additional languages ────────────────────────────────────────────────
  java: { title: "Java", bg: "black", fg: "white", icon: <RiJavaFill /> },
  csharp: { title: "C#", bg: "black", fg: "white", icon: <TbBrandCSharp /> },
  go: { title: "Go", bg: "black", fg: "white", icon: <SiGo /> },
  rust: { title: "Rust", bg: "black", fg: "white", icon: <SiRust /> },
  kotlin: { title: "Kotlin", bg: "black", fg: "white", icon: <SiKotlin /> },
  swift: { title: "Swift", bg: "black", fg: "white", icon: <SiSwift /> },
  ruby: { title: "Ruby", bg: "black", fg: "white", icon: <SiRuby /> },
  php: { title: "PHP", bg: "black", fg: "white", icon: <SiPhp /> },
  elixir: { title: "Elixir", bg: "black", fg: "white", icon: <SiElixir /> },
  // ─── frameworks / libraries ──────────────────────────────────────────────
  angular: { title: "Angular", bg: "black", fg: "white", icon: <SiAngular /> },
  svelte: { title: "Svelte", bg: "black", fg: "white", icon: <SiSvelte /> },
  nuxt: { title: "Nuxt.js", bg: "black", fg: "white", icon: <SiNuxtdotjs /> },
  remix: { title: "Remix", bg: "black", fg: "white", icon: <SiRemix /> },
  astro: { title: "Astro", bg: "black", fg: "white", icon: <SiAstro /> },
  gatsby: { title: "Gatsby", bg: "black", fg: "white", icon: <SiGatsby /> },
  solid: { title: "Solid.js", bg: "black", fg: "white", icon: <SiSolid /> },
  nestjs: { title: "NestJS", bg: "black", fg: "white", icon: <SiNestjs /> },
  django: { title: "Django", bg: "black", fg: "white", icon: <SiDjango /> },
  flask: { title: "Flask", bg: "black", fg: "white", icon: <SiFlask /> },
  fastapi: { title: "FastAPI", bg: "black", fg: "white", icon: <SiFastapi /> },
  spring: { title: "Spring", bg: "black", fg: "white", icon: <SiSpring /> },
  springboot: { title: "Spring Boot", bg: "black", fg: "white", icon: <SiSpringboot /> },
  laravel: { title: "Laravel", bg: "black", fg: "white", icon: <SiLaravel /> },
  rails: { title: "Rails", bg: "black", fg: "white", icon: <SiRubyonrails /> },
  phoenix: { title: "Phoenix", bg: "black", fg: "white", icon: <SiPhoenixframework /> },
  trpc: { title: "tRPC", bg: "black", fg: "white", icon: <SiTrpc /> },
  graphql: { title: "GraphQL", bg: "black", fg: "white", icon: <SiGraphql /> },
  // ─── databases / ORMs ────────────────────────────────────────────────────
  mysql: { title: "MySQL", bg: "black", fg: "white", icon: <SiMysql /> },
  redis: { title: "Redis", bg: "black", fg: "white", icon: <SiRedis /> },
  elasticsearch: { title: "Elasticsearch", bg: "black", fg: "white", icon: <SiElasticsearch /> },
  sequelize: { title: "Sequelize", bg: "black", fg: "white", icon: <SiSequelize /> },
  drizzle: { title: "Drizzle ORM", bg: "black", fg: "white", icon: <SiDrizzle /> },
  // ─── runtimes ────────────────────────────────────────────────────────────
  bun: { title: "Bun", bg: "black", fg: "white", icon: <SiBun /> },
  deno: { title: "Deno", bg: "black", fg: "white", icon: <SiDeno /> },
  // ─── mobile / desktop ────────────────────────────────────────────────────
  flutter: { title: "Flutter", bg: "black", fg: "white", icon: <SiFlutter /> },
  expo: { title: "Expo", bg: "black", fg: "white", icon: <SiExpo /> },
  android: { title: "Android", bg: "black", fg: "white", icon: <SiAndroid /> },
  electron: { title: "Electron", bg: "black", fg: "white", icon: <SiElectron /> },
  // ─── build / test tools ──────────────────────────────────────────────────
  vite: { title: "Vite", bg: "black", fg: "white", icon: <SiVite /> },
  webpack: { title: "Webpack", bg: "black", fg: "white", icon: <SiWebpack /> },
  jest: { title: "Jest", bg: "black", fg: "white", icon: <SiJest /> },
  vitest: { title: "Vitest", bg: "black", fg: "white", icon: <SiVitest /> },
  cypress: { title: "Cypress", bg: "black", fg: "white", icon: <SiCypress /> },
  // ─── cloud / infra ───────────────────────────────────────────────────────
  aws: { title: "AWS", bg: "black", fg: "white", icon: <SiAmazonwebservices /> },
  azure: { title: "Azure", bg: "black", fg: "white", icon: <TbBrandAzure /> },
  googlecloud: { title: "Google Cloud", bg: "black", fg: "white", icon: <SiGooglecloud /> },
  kubernetes: { title: "Kubernetes", bg: "black", fg: "white", icon: <SiKubernetes /> },
  terraform: { title: "Terraform", bg: "black", fg: "white", icon: <SiTerraform /> },
  nginx: { title: "Nginx", bg: "black", fg: "white", icon: <SiNginx /> },
  linux: { title: "Linux", bg: "black", fg: "white", icon: <SiLinux /> },
  ubuntu: { title: "Ubuntu", bg: "black", fg: "white", icon: <SiUbuntu /> },
  cloudflare: { title: "Cloudflare", bg: "black", fg: "white", icon: <SiCloudflare /> },
  vercel: { title: "Vercel", bg: "black", fg: "white", icon: <SiVercel /> },
  netlify: { title: "Netlify", bg: "black", fg: "white", icon: <SiNetlify /> },
  heroku: { title: "Heroku", bg: "black", fg: "white", icon: <SiHeroku /> },
  railway: { title: "Railway", bg: "black", fg: "white", icon: <SiRailway /> },
  planetscale: { title: "PlanetScale", bg: "black", fg: "white", icon: <SiPlanetscale /> },
  openai: { title: "OpenAI", bg: "black", fg: "white", icon: <SiOpenai /> },
  // ─── design / tools ──────────────────────────────────────────────────────
  figma: { title: "Figma", bg: "black", fg: "white", icon: <SiFigma /> },
  github: { title: "GitHub", bg: "black", fg: "white", icon: <SiGithub /> },
  gitlab: { title: "GitLab", bg: "black", fg: "white", icon: <SiGitlab /> },
  bitbucket: { title: "Bitbucket", bg: "black", fg: "white", icon: <SiBitbucket /> },
  jira: { title: "Jira", bg: "black", fg: "white", icon: <SiJira /> },
  notion: { title: "Notion", bg: "black", fg: "white", icon: <SiNotion /> },
  slack: { title: "Slack", bg: "black", fg: "white", icon: <SiSlack /> },
  discord: { title: "Discord", bg: "black", fg: "white", icon: <SiDiscord /> },
  // ─── payments / services ─────────────────────────────────────────────────
  stripe: { title: "Stripe", bg: "black", fg: "white", icon: <SiStripe /> },
  paypal: { title: "PayPal", bg: "black", fg: "white", icon: <SiPaypal /> },
  // ─── cms / e-commerce ────────────────────────────────────────────────────
  wordpress: { title: "WordPress", bg: "black", fg: "white", icon: <SiWordpress /> },
  shopify: { title: "Shopify", bg: "black", fg: "white", icon: <SiShopify /> },

  // ─── languages (extra) ────────────────────────────────────────────────────
  dart: { title: "Dart", bg: "black", fg: "white", icon: <SiDart /> },
  scala: { title: "Scala", bg: "black", fg: "white", icon: <SiScala /> },
  lua: { title: "Lua", bg: "black", fg: "white", icon: <SiLua /> },
  perl: { title: "Perl", bg: "black", fg: "white", icon: <SiPerl /> },
  haskell: { title: "Haskell", bg: "black", fg: "white", icon: <SiHaskell /> },
  clojure: { title: "Clojure", bg: "black", fg: "white", icon: <SiClojure /> },
  crystal: { title: "Crystal", bg: "black", fg: "white", icon: <SiCrystal /> },
  cpp: { title: "C++", bg: "black", fg: "white", icon: <TbBrandCpp /> },
  c: { title: "C", bg: "black", fg: "white", icon: <span className="text-xs font-bold">C</span> },

  // ─── frontend (extra) ─────────────────────────────────────────────────────
  preact: { title: "Preact", bg: "black", fg: "white", icon: <SiPreact /> },
  alpine: { title: "Alpine.js", bg: "black", fg: "white", icon: <SiAlpinedotjs /> },
  htmx: { title: "htmx", bg: "black", fg: "white", icon: <SiHtmx /> },

  // ─── backend (extra) ──────────────────────────────────────────────────────
  fastify: { title: "Fastify", bg: "black", fg: "white", icon: <SiFastify /> },

  // ─── CSS / UI (extra) ─────────────────────────────────────────────────────
  sass: { title: "Sass", bg: "black", fg: "white", icon: <SiSass /> },
  less: { title: "Less", bg: "black", fg: "white", icon: <SiLess /> },
  styledcomponents: { title: "Styled Components", bg: "black", fg: "white", icon: <SiStyledcomponents /> },
  postcss: { title: "PostCSS", bg: "black", fg: "white", icon: <SiPostcss /> },
  bootstrap: { title: "Bootstrap", bg: "black", fg: "white", icon: <SiBootstrap /> },
  mui: { title: "Material UI", bg: "black", fg: "white", icon: <SiMui /> },
  antdesign: { title: "Ant Design", bg: "black", fg: "white", icon: <SiAntdesign /> },
  bulma: { title: "Bulma", bg: "black", fg: "white", icon: <SiBulma /> },
  daisyui: { title: "DaisyUI", bg: "black", fg: "white", icon: <SiDaisyui /> },

  // ─── state management ─────────────────────────────────────────────────────
  redux: { title: "Redux", bg: "black", fg: "white", icon: <SiRedux /> },
  mobx: { title: "MobX", bg: "black", fg: "white", icon: <SiMobx /> },

  // ─── databases (extra) ────────────────────────────────────────────────────
  sqlite: { title: "SQLite", bg: "black", fg: "white", icon: <SiSqlite /> },
  mariadb: { title: "MariaDB", bg: "black", fg: "white", icon: <SiMariadb /> },
  cockroachdb: { title: "CockroachDB", bg: "black", fg: "white", icon: <SiCockroachlabs /> },
  influxdb: { title: "InfluxDB", bg: "black", fg: "white", icon: <SiInfluxdb /> },
  neo4j: { title: "Neo4j", bg: "black", fg: "white", icon: <SiNeo4J /> },
  cassandra: { title: "Cassandra", bg: "black", fg: "white", icon: <SiApachecassandra /> },
  mssql: { title: "SQL Server", bg: "black", fg: "white", icon: <span className="text-xs font-bold">SQL</span> },

  // ─── DevOps / CI/CD (extra) ───────────────────────────────────────────────
  ansible: { title: "Ansible", bg: "black", fg: "white", icon: <SiAnsible /> },
  prometheus: { title: "Prometheus", bg: "black", fg: "white", icon: <SiPrometheus /> },
  grafana: { title: "Grafana", bg: "black", fg: "white", icon: <SiGrafana /> },
  jenkins: { title: "Jenkins", bg: "black", fg: "white", icon: <SiJenkins /> },
  githubactions: { title: "GitHub Actions", bg: "black", fg: "white", icon: <SiGithubactions /> },
  circleci: { title: "CircleCI", bg: "black", fg: "white", icon: <SiCircleci /> },
  digitalocean: { title: "DigitalOcean", bg: "black", fg: "white", icon: <SiDigitalocean /> },
  traefik: { title: "Traefik", bg: "black", fg: "white", icon: <SiTraefikproxy /> },
  rabbitmq: { title: "RabbitMQ", bg: "black", fg: "white", icon: <SiRabbitmq /> },
  kafka: { title: "Apache Kafka", bg: "black", fg: "white", icon: <SiApachekafka /> },
  apache: { title: "Apache", bg: "black", fg: "white", icon: <SiApache /> },
  raspberrypi: { title: "Raspberry Pi", bg: "black", fg: "white", icon: <SiRaspberrypi /> },
  arduino: { title: "Arduino", bg: "black", fg: "white", icon: <SiArduino /> },

  // ─── testing (extra) ──────────────────────────────────────────────────────
  playwright: { title: "Playwright", bg: "black", fg: "white", icon: <span className="text-xs font-bold">PW</span> },
  storybook: { title: "Storybook", bg: "black", fg: "white", icon: <SiStorybook /> },
  cucumber: { title: "Cucumber", bg: "black", fg: "white", icon: <SiCucumber /> },

  // ─── build tools (extra) ──────────────────────────────────────────────────
  rollup: { title: "Rollup.js", bg: "black", fg: "white", icon: <SiRollupdotjs /> },
  esbuild: { title: "esbuild", bg: "black", fg: "white", icon: <SiEsbuild /> },
  babel: { title: "Babel", bg: "black", fg: "white", icon: <SiBabel /> },
  eslint: { title: "ESLint", bg: "black", fg: "white", icon: <SiEslint /> },
  prettier: { title: "Prettier", bg: "black", fg: "white", icon: <SiPrettier /> },
  turborepo: { title: "Turborepo", bg: "black", fg: "white", icon: <SiTurborepo /> },

  // ─── auth services ────────────────────────────────────────────────────────
  auth0: { title: "Auth0", bg: "black", fg: "white", icon: <SiAuth0 /> },
  keycloak: { title: "Keycloak", bg: "black", fg: "white", icon: <SiKeycloak /> },
  okta: { title: "Okta", bg: "black", fg: "white", icon: <SiOkta /> },

  // ─── package managers / version control ───────────────────────────────────
  npm: { title: "npm", bg: "black", fg: "white", icon: <SiNpm /> },
  yarn: { title: "Yarn", bg: "black", fg: "white", icon: <SiYarn /> },
  pnpm: { title: "pnpm", bg: "black", fg: "white", icon: <SiPnpm /> },
  git: { title: "Git", bg: "black", fg: "white", icon: <SiGit /> },

  // ─── CMS (extra) ──────────────────────────────────────────────────────────
  contentful: { title: "Contentful", bg: "black", fg: "white", icon: <SiContentful /> },
  strapi: { title: "Strapi", bg: "black", fg: "white", icon: <SiStrapi /> },
  ghost: { title: "Ghost", bg: "black", fg: "white", icon: <SiGhost /> },

  // ─── monitoring ───────────────────────────────────────────────────────────
  datadog: { title: "Datadog", bg: "black", fg: "white", icon: <SiDatadog /> },
  sentry: { title: "Sentry", bg: "black", fg: "white", icon: <SiSentry /> },
  newrelic: { title: "New Relic", bg: "black", fg: "white", icon: <SiNewrelic /> },

  // ─── AI / ML ──────────────────────────────────────────────────────────────
  tensorflow: { title: "TensorFlow", bg: "black", fg: "white", icon: <SiTensorflow /> },
  pytorch: { title: "PyTorch", bg: "black", fg: "white", icon: <SiPytorch /> },
  scikitlearn: { title: "Scikit-learn", bg: "black", fg: "white", icon: <SiScikitlearn /> },
  pandas: { title: "Pandas", bg: "black", fg: "white", icon: <SiPandas /> },
  numpy: { title: "NumPy", bg: "black", fg: "white", icon: <SiNumpy /> },
  jupyter: { title: "Jupyter", bg: "black", fg: "white", icon: <SiJupyter /> },
  keras: { title: "Keras", bg: "black", fg: "white", icon: <SiKeras /> },
  huggingface: { title: "Hugging Face", bg: "black", fg: "white", icon: <SiHuggingface /> },

  // ─── mobile (extra) ───────────────────────────────────────────────────────
  ionic: { title: "Ionic", bg: "black", fg: "white", icon: <SiIonic /> },
  capacitor: { title: "Capacitor", bg: "black", fg: "white", icon: <SiCapacitor /> },
  reactnative: { title: "React Native", bg: "black", fg: "white", icon: <TbBrandReactNative /> },
  xamarin: { title: "Xamarin", bg: "black", fg: "white", icon: <TbBrandXamarin /> },

  // ─── game dev ─────────────────────────────────────────────────────────────
  unity: { title: "Unity", bg: "black", fg: "white", icon: <SiUnity /> },
  unreal: { title: "Unreal Engine", bg: "black", fg: "white", icon: <SiUnrealengine /> },
  godot: { title: "Godot", bg: "black", fg: "white", icon: <SiGodotengine /> },

  // ─── web platform ─────────────────────────────────────────────────────────
  wasm: { title: "WebAssembly", bg: "black", fg: "white", icon: <SiWebassembly /> },

  // ─── fundamentals ─────────────────────────────────────────────────────────
  html: { title: "HTML", bg: "black", fg: "white", icon: <SiHtml5 /> },
  css: { title: "CSS", bg: "black", fg: "white", icon: <SiCss3 /> },
  json: { title: "JSON", bg: "black", fg: "white", icon: <SiJson /> },
  xml: { title: "XML", bg: "black", fg: "white", icon: <SiXml /> },
  markdown: { title: "Markdown", bg: "black", fg: "white", icon: <SiMarkdown /> },
  bash: { title: "Bash", bg: "black", fg: "white", icon: <SiGnubash /> },
  shell: { title: "Shell", bg: "black", fg: "white", icon: <SiShell /> },
  powershell: { title: "PowerShell", bg: "black", fg: "white", icon: <TbBrandPowershell /> },
  pwa: { title: "PWA", bg: "black", fg: "white", icon: <SiPwa /> },
  webrtc: { title: "WebRTC", bg: "black", fg: "white", icon: <SiWebrtc /> },
  apollographql: { title: "Apollo GraphQL", bg: "black", fg: "white", icon: <SiApollographql /> },
  mongoose: { title: "Mongoose", bg: "black", fg: "white", icon: <SiMongoose /> },
  reduxsaga: { title: "Redux Saga", bg: "black", fg: "white", icon: <SiReduxsaga /> },
  opencv: { title: "OpenCV", bg: "black", fg: "white", icon: <SiOpencv /> },
  otel: { title: "OpenTelemetry", bg: "black", fg: "white", icon: <SiOpentelemetry /> },

  // ─── IDEs / editors ───────────────────────────────────────────────────────
  vscode: { title: "VS Code", bg: "black", fg: "white", icon: <TbBrandVscode /> },
  visualstudio: { title: "Visual Studio", bg: "black", fg: "white", icon: <TbBrandVisualStudio /> },
  intellij: { title: "IntelliJ IDEA", bg: "black", fg: "white", icon: <SiIntellijidea /> },
  pycharm: { title: "PyCharm", bg: "black", fg: "white", icon: <SiPycharm /> },
  webstorm: { title: "WebStorm", bg: "black", fg: "white", icon: <SiWebstorm /> },
  eclipse: { title: "Eclipse", bg: "black", fg: "white", icon: <SiEclipseide /> },
  vim: { title: "Vim", bg: "black", fg: "white", icon: <SiVim /> },
  neovim: { title: "Neovim", bg: "black", fg: "white", icon: <SiNeovim /> },
  xcode: { title: "Xcode", bg: "black", fg: "white", icon: <SiXcode /> },
  obsidian: { title: "Obsidian", bg: "black", fg: "white", icon: <SiObsidian /> },

  // ─── API tools ────────────────────────────────────────────────────────────
  postman: { title: "Postman", bg: "black", fg: "white", icon: <SiPostman /> },
  insomnia: { title: "Insomnia", bg: "black", fg: "white", icon: <SiInsomnia /> },
};

// Resolve a skill name string (from admin panel) to a Skill object with icon.
// Falls back to a plain text skill if no icon mapping exists.
export function skillFromName(name: string): Skill {
  const match = Object.values(PROJECT_SKILLS).find(
    (s) => s.title.toLowerCase() === name.toLowerCase()
  );
  return match ?? { title: name, bg: "black", fg: "white", icon: null };
}
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
  description?: string;
};
const projects: Project[] = [
  {
    id: "codingducks",
    category: "Coding platform",
    title: "Coding Ducks",
    src: "/assets/projects-screenshots/codingducks/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.chakra,
        PROJECT_SKILLS.reactQuery,
        PROJECT_SKILLS.firebase,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.prisma,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.sockerio,
      ],
    },
    live: "https://www.codingducks.xyz/",
    github: "https://github.com/synverge/Coding-Ducks",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Coding ducks = LeetCode + CodePen + CSS Battles
          </TypographyP>
          <TypographyP className="font-mono ">
            Coding Ducks is your coding dojo — where you level up your skills,
            battle in real-time code duels, and earn badges like a true code
            warrior. Track your progress, flex your brain, and climb the
            leaderboard. Ready to quack the code?
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Problems </TypographyH3>
          <p className="font-mono mb-2">
            Solve coding problems similar to LeetCode, enhancing your
            problem-solving skills across various languages.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/codingducks/problems.png`,
              `${BASE_PATH}/codingducks/problem.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Ducklets</TypographyH3>
          <p className="font-mono mb-2">
            Collaborate in real-time with others in a multiplayer coding
            environment, just like CodePen but with a social twist.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/codingducks/ducklets.png`,
              `${BASE_PATH}/codingducks/ducklet1.png`,
              `${BASE_PATH}/codingducks/ducklet2.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">UI Battles </TypographyH3>

          <p className="font-mono mb-2">
            Challenge yourself to create UI components with HTML/CSS/JS, and get
            instant feedback with an automated similarity scoring.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/codingducks/css-battles.png`,
              `${BASE_PATH}/codingducks/css-battle.png`,
              `${BASE_PATH}/codingducks/css-battle2.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Contests </TypographyH3>
          <p className="font-mono mb-2">
            Organize or participate in coding competitions. Successfully used to
            host three contests during college.
          </p>
          <SlideShow images={[`${BASE_PATH}/codingducks/contests.png`]} />
          <TypographyH3 className="my-4 mt-8">Playground </TypographyH3>
          <p className="font-mono mb-2">
            Test and execute your code instantly in my versatile online code
            runner.
          </p>
          <SlideShow images={[`${BASE_PATH}/codingducks/playground.png`]} />
          <TypographyH3 className="my-4 mt-8">Users</TypographyH3>

          <p className="font-mono mb-2">
            Track your progress, earn badges, and climb the rankings with
            detailed user profiles and activity tracking.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/codingducks/users.png`,
              `${BASE_PATH}/codingducks/user.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "couponluxury",
    category: "Coupon site",
    title: "Coupon Luxury",
    src: "/assets/projects-screenshots/couponluxury/landing.png",
    screenshots: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    live: "https://www.couponluxury.com/",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.chakra,
        PROJECT_SKILLS.vue,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.prisma,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.docker,
      ],
    },
    get content(): JSX.Element {
      return (
        <div>
          <TypographyP className="font-mono ">
            CouponLuxury is your go-to destination for snagging the best deals
            without lifting a finger. Whether you&apos;re hunting for the latest
            discounts or trying to save a buck at your favorite stores,
            CouponLuxury&apos;s got you covered.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <p className="font-mono mb-2 mt-4">
            As soon as you land, boom! You&apos;re greeted with the freshest
            coupons and top-tier deals that&apos;ll make your wallet happy.
          </p>
          <SlideShow images={[`${BASE_PATH}/couponluxury/landing.png`]} />
          <TypographyH3 className="my-4 ">Stores</TypographyH3>
          <p className="font-mono mb-2">
            Dive into a comprehensive list of stores, each packed with exclusive
            deals and discounts. It&apos;s like having a VIP pass to every sale
            in town.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/couponluxury/stores.png`,
              `${BASE_PATH}/couponluxury/store.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Categories</TypographyH3>

          <p className="font-mono mb-2">
            Whatever you&apos;re into—fashion, tech, food—you&apos;ll find it
            neatly organized here. No more endless scrolling; just pick a
            category and get the best offers instantly.
          </p>
          <SlideShow images={[`${BASE_PATH}/couponluxury/categories.png`]} />
          <TypographyH3 className="my-4 mt-8">Custom CMS </TypographyH3>
          <p className="font-mono mb-2">
            Powered by Vue.js, this bad boy allows us to keep the content
            dynamic and up-to-date. From flash sales to limited-time offers, my
            CMS ensures everything&apos;s live and relevant.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/couponluxury/cms-1.png`,
              `${BASE_PATH}/couponluxury/cms-2.png`,
            ]}
          />
          <p className="font-mono mb-2 mt-5">
            Plus, I&apos;ve sprinkled in some extra magic like personalized
            deal recommendations, user-friendly search features, and a sleek,
            responsive design that works like a charm on any device.
          </p>
          <p className="font-mono mb-2">
            CouponLuxury isn&apos;t just a website; it&apos;s your personal deal-hunting
            assistant, ensuring you never miss out on a bargain!
          </p>
          {/* <TypographyP className="my-4 mt-8">
          <strong>Misc:</strong>
          Hosted not one, not two, but THREE coding contests (Codemacha) during
          college. Safe to say, Coding Ducks passed the vibe check.
        </TypographyP>
        <TypographyP className="my-4 mt-8">
          <strong>Target Audience:</strong>
          For all the novice coders out there ready to make their mark.
        </TypographyP> */}
        </div>
      );
    },
  },
  {
    id: "the-booking-desk",
    category: "Travel",
    title: "The Booking Desk",
    src: "/assets/projects-screenshots/the-booking-desk/landing.png",
    screenshots: ["1.png"],
    live: "https://thebookingdesk.com/",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.aceternity,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.sanity],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            The Booking Desk is your ultimate travel consultation hub, designed
            to turn your wanderlust dreams into reality. With a focus on smooth
            and visually captivating animations, navigating the site feels like
            a breeze—it&apos;s almost as if the destinations are calling you.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <p className="font-mono mb-2 mt-8">
            A sleek, modern interface greets you, featuring the latest travel
            tips, deals, and must-visit spots around the globe.
          </p>
          <SlideShow images={[`${BASE_PATH}/the-booking-desk/landing.png`]} />
          <TypographyH3 className="my-4 mt-8">Blogs</TypographyH3>
          <p className="font-mono mb-2">
            Dive into the curated articles written by travel experts. Whether
            you&apos;re looking for hidden gems or travel hacks, our blog section has
            you covered.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/the-booking-desk/blogs.png`,
              `${BASE_PATH}/the-booking-desk/blog.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">Sanity CMS</TypographyH3>

          <p className="font-mono mb-2">
            Keeping everything fresh and up-to-date, I&apos;ve integrated Sanity CMS
            to manage all the content with ease, ensuring you always get the
            latest and greatest information.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/the-booking-desk/cms-1.png`,
              `${BASE_PATH}/the-booking-desk/cms-2.png`,
            ]}
          />
          <p className="font-mono mb-2 my-8">
            With a stunning 100% score on Lighthouse, The Booking Desk isn&apos;t
            just beautiful—it&apos;s built to perform. Whether you&apos;re planning your
            next adventure or just daydreaming, our site delivers a top-notch
            experience that&apos;s both informative and enjoyable.
          </p>
        </div>
      );
    },
  },
  {
    id: "portfolio",
    category: "Portfolio",
    title: "My Portfolio",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: ["1.png"],
    live: "",
    github:"https://github.com/synverge/Portfolio",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.aceternity,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Welcome to my digital playground, where creativity meets code in the
            dopest way possible.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">
            Beautiful 3D Objects{" "}
          </TypographyH3>
          <p className="font-mono mb-2">
            Did you see that 3D keyboard modal? Yeah! I made that. That
            interactive keyboard is being rendered in 3D on a webpage 🤯, and
            pressing each keycap reveals a skill in a goofy way. It&apos;s like
            typing, but make it art.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/landing.png`,
              `${BASE_PATH}/portfolio/skills.png`,
            ]}
          />
          <TypographyH3 className="my-4 ">Space Theme</TypographyH3>
          <p className="font-mono mb-2">
            Dark background + floating particles = out-of-this-world cool.
          </p>
          <SlideShow images={[`${BASE_PATH}/portfolio/navbar.png`]} />
          <TypographyH3 className="my-4 mt-8">Projects</TypographyH3>

          <p className="font-mono mb-2">
            My top personal and freelance projects — no filler, all killer.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/projects.png`,
              `${BASE_PATH}/portfolio/project.png`,
            ]}
          />
          <p className="font-mono mb-2 mt-8 text-center">
            This site&apos;s not just a portfolio — it&apos;s a whole vibe.
          </p>
        </div>
      );
    },
  },
  {
    id: "ghostchat",
    category: "Anonymous chat",
    title: "GhostChat",
    src: "/assets/projects-screenshots/ghostchat/1.png",
    screenshots: ["1.png", "2.png", "3.png", "4.png"],
    live: "https://ghostchat.vercel.app",
    github:"https://github.com/synverge/GhostChat",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.next, PROJECT_SKILLS.chakra],
      backend: [PROJECT_SKILLS.supabase],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Ghostchat is your go-to spot for sending anonymous messages without
            leaving a trace. Powered by Supabase, it&apos;s all about keeping things
            low-key and secure. Whether you&apos;re sharing secrets, giving feedback,
            or just having some fun, Ghostchat ensures your identity stays
            hidden, while your voice is heard. Say what you want, without the
            worry.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/ghostchat/1.png`,
              `${BASE_PATH}/ghostchat/2.png`,
              `${BASE_PATH}/ghostchat/3.png`,
              `${BASE_PATH}/ghostchat/4.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "jra",
    category: "Result analyzer",
    title: "JNTUA Results Analyzer",
    src: "/assets/projects-screenshots/jra/1.png",
    screenshots: ["1.png"],
    live: "https://synverge.github.io/JNTUA-result-analyser-spa/#/",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.vue],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.docker,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            JNTUA Results Analyzer was a revolutionary tool designed to simplify
            and enhance the experience of accessing academic results. It served
            as a powerful proxy between the JNTUA university results website and
            its users, offering a range of features that made result analysis
            faster and more efficient. Here&apos;s what made it stand out:
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/jra/1.png`]} />
          <TypographyH3 className="my-4 mt-8">
            Effortless Results Retrieval
          </TypographyH3>
          {/* Effortless Results Retrieval: */}
          <ul className="list-disc ml-6">
            <li className="font-mono">
              Search all your results using a single roll number, eliminating
              the tedious task of sifting through thousands of rows on the
              official site.
            </li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Class-Wise Results:</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">
              class-wise results effortlessly by entering a roll number range.
              No more manual searches or filtering.
            </li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Faculty Features:</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">
              Faculty members could download batch results in Excel format,
              making administrative tasks a breeze.
            </li>
          </ul>
          <TypographyH3 className="my-4 mt-8">
            Enhanced Data Insights:
          </TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">
              Each result came with additional features including:
              <ul className="list-disc font-mono ml-6">
                <li>
                  <strong>CGPA Calculations: </strong>Easily track your
                  cumulative grade point average.
                </li>
                <li>
                  <strong>Charts:</strong> Visualize your academic performance
                  with comprehensive charts.
                </li>
                <li>
                  <strong>Future Projections:</strong> Get insights into
                  potential future outcomes based on current performance.
                </li>
                <li>
                  <strong> Backlog Counts: </strong>Keep track of your backlog
                  subjects at a glance.
                </li>
              </ul>
            </li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Performance:</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">
              The application was significantly faster and more efficient than
              the official site, providing a smoother user experience.
            </li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Downfall:</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">
              Unfortunately, as of May 2022, the tool stopped working due to the
              introduction of CAPTCHA on the official JNTUA results site, which
              disrupted the seamless functionality of the app. JNTUA Results
              Analyzer transformed the way students and faculty interacted with
              academic results, making it a must-have tool until its unexpected
              shutdown.
            </li>
          </ul>
        </div>
      );
    },
  },
];
export default projects;
