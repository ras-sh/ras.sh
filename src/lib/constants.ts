export const ORG = "ras-sh";
export const GITHUB_PREFIX = `${ORG}/`;
export const NPM_PREFIX = `@${ORG}/`;

export const APPS = [
  {
    id: "local-quest",
    description:
      "🗺️ Local-first AI text adventures using your browser's built-in AI. Infinite worlds generated and played entirely on your device.",
  },
  {
    id: "local-chat",
    description:
      "💬 Local-first AI chat using Chrome's built-in AI. Conversations run entirely in your browser and stay on your device.",
  },
  {
    id: "remove-bg",
    description:
      "✂️ AI-powered background removal that runs entirely in your browser. No uploads, no paywalls, fully client-side.",
  },
  {
    id: "icon-gen",
    description:
      "🖼️ Generate all essential icon sizes for web and mobile from a single image. Drag, drop, download.",
  },
  {
    id: "img-to-palette",
    description:
      "🎨 Generate color palettes from any image and find the nearest Tailwind colors for quick design matching.",
  },
] as const;

export const PACKAGES = [
  {
    id: "convex-cli",
    description:
      "⚡⌨️ Turn your Convex backend into a type-safe CLI with automatic function discovery and input validation.",
  },
  {
    id: "convex-stripe",
    description:
      "⚡💳 Stripe integration for Convex. Syncs customers, subscriptions, and payments through secure webhooks and helpful utilities.",
  },
  {
    id: "ui",
    description: "🎨 Shared UI library for ras.sh projects.",
  },
  {
    id: "typescript-config",
    description: "⚙️ Shared TypeScript configuration for ras.sh projects.",
  },
] as const;

export const TEMPLATES = [
  {
    id: "template-convex-component",
    description:
      "⚡📦 Convex component template for building sandboxed TypeScript modules that extend your backend safely.",
  },
  {
    id: "template-tanstack-start-convex",
    description:
      "🚀⚡ Full-stack template with TanStack Start and Convex. Includes SSR, real-time sync, and optimistic updates.",
  },
  {
    id: "template-tanstack-start",
    description:
      "🚀 Full-stack template with TanStack Start. Includes SSR, file-based routing, and modern tooling.",
  },
  {
    id: "template-react-library",
    description:
      "⚛️ Production-ready React library template with TypeScript, Storybook, automated testing, and optimized builds with tree-shaking and code splitting.",
  },
  {
    id: "template-node-library",
    description:
      "📦 Node.js library template with TypeScript, testing setup, and modern build tooling.",
  },
  {
    id: "template-nextjs-convex",
    description:
      "▲⚡ Full-stack template with Next.js 15 and Convex. Includes SSR, real-time sync, and optimistic updates.",
  },
  {
    id: "template-nextjs",
    description:
      "▲ Full-stack template with Next.js 15. Includes App Router, SSR, and modern tooling.",
  },
] as const;

export const REPOSITORIES = [...APPS, ...PACKAGES, ...TEMPLATES];

export type App = (typeof APPS)[number];
export type Package = (typeof PACKAGES)[number];
export type Template = (typeof TEMPLATES)[number];
export type Repository = App | Package | Template;

// Pre-computed Sets for O(1) lookups
const APP_IDS = new Set(APPS.map((app) => app.id)) as Set<string>;
const PACKAGE_IDS = new Set(PACKAGES.map((pkg) => pkg.id)) as Set<string>;
const TEMPLATE_IDS = new Set(TEMPLATES.map((tpl) => tpl.id)) as Set<string>;

// Helper to get app URL
export function getAppUrl(app: App): string {
  return `https://${app.id}.ras.sh`;
}

// Type guards with O(1) lookups
export function isApp(repo: Repository): repo is App {
  return APP_IDS.has(repo.id);
}

export function isPackage(repo: Repository): repo is Package {
  return PACKAGE_IDS.has(repo.id);
}

export function isTemplate(repo: Repository): repo is Template {
  return TEMPLATE_IDS.has(repo.id);
}
