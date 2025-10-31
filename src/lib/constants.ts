export const ORG = "ras-sh";
export const GITHUB_PREFIX = `${ORG}/`;
export const NPM_PREFIX = `@${ORG}/`;

export const REPOSITORIES = [
  {
    id: "chat",
    description:
      "💬 Local-first AI chat using Chrome's built-in AI. Conversations run entirely in your browser and stay on your device.",
    externalUrl: "https://chat.ras.sh",
  },
  {
    id: "remove-bg",
    description:
      "✂️ AI-powered background removal that runs entirely in your browser. No uploads, no paywalls, fully client-side.",
    externalUrl: "https://remove-bg.ras.sh",
  },
  {
    id: "icon-gen",
    description:
      "🖼️ Generate all essential icon sizes for web and mobile from a single image. Drag, drop, download.",
    externalUrl: "https://icon-gen.ras.sh",
  },
  {
    id: "img-to-palette",
    description:
      "🎨 Generate color palettes from any image and find the nearest Tailwind colors for quick design matching.",
    externalUrl: "https://img-to-palette.ras.sh",
  },

  // NPM packages
  {
    id: "convex-cli",
    description:
      "⚡⌨️ Turn your Convex backend into a type-safe CLI with automatic function discovery and input validation.",
    hasNpmPackage: true,
  },
  {
    id: "convex-stripe",
    description:
      "⚡💳 Stripe integration for Convex. Syncs customers, subscriptions, and payments through secure webhooks and helpful utilities.",
    hasNpmPackage: true,
  },
  {
    id: "ui",
    description: "🎨 Shared UI library for ras.sh projects.",
    hasNpmPackage: true,
  },
  {
    id: "typescript-config",
    description: "⚙️ Shared TypeScript configuration for ras.sh projects.",
    hasNpmPackage: true,
  },

  // Templates
  {
    id: "template-convex-component",
    description:
      "⚡📦 Convex component template for building sandboxed TypeScript modules that extend your backend safely.",
    isTemplate: true,
  },
  {
    id: "template-tanstack-start-convex",
    description:
      "🚀⚡ Full-stack template with TanStack Start and Convex. Includes SSR, real-time sync, and optimistic updates.",
    isTemplate: true,
  },
  {
    id: "template-tanstack-start",
    description:
      "🚀 Full-stack template with TanStack Start. Includes SSR, file-based routing, and modern tooling.",
    isTemplate: true,
  },
  {
    id: "template-react-library",
    description:
      "⚛️ Production-ready React library template with TypeScript, Storybook, automated testing, and optimized builds with tree-shaking and code splitting.",
    isTemplate: true,
  },
  {
    id: "template-node-library",
    description:
      "📦 Node.js library template with TypeScript, testing setup, and modern build tooling.",
    isTemplate: true,
  },
  {
    id: "template-nextjs-convex",
    description:
      "▲⚡ Full-stack template with Next.js 15 and Convex. Includes SSR, real-time sync, and optimistic updates.",
    isTemplate: true,
  },
  {
    id: "template-nextjs",
    description:
      "▲ Full-stack template with Next.js 15. Includes App Router, SSR, and modern tooling.",
    isTemplate: true,
  },
];

export type Repository = (typeof REPOSITORIES)[number];
