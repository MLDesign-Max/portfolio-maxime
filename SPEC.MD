# 📋 PROJECT SPECIFICATIONS & COMPONENT ARCHITECTURE
**Portfolio Maxime Lussiana — UX/UI & Motion Designer**

---

## 1. TECH STACK & SYSTEM DEPENDENCIES

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (v4) + CSS Custom Properties mapped to Figma Variables
- **Animations & Parallax:** Framer Motion
- **Icons:** Lucide React (`lucide-react`)
- **Theme Engine:** `next-themes` (Default Theme: Dark (`defaultTheme="dark"`), stored choice persistent)
- **Data Architecture:** Static JSON dataset (`src/data/projects.json`)

---

## 2. DESIGN SYSTEM & FIGMA TOKENS MAPPING

### A. Typography System
- **Primary Sans Font:** `Satoshi` (Weights: 400, 500, 700, 800)
- **Monospace Font:** `JetBrains Mono` (Weights: 500, 700)

### B. Tokens & Figma Local Variables Mapping (Single Source of Truth)
- **Primary Source:** Figma Local Variables (Collections `Light Mode` & `Dark Mode`) are the absolute single source of truth for colors, borders, and surfaces.
- **Extraction Rule:** The MCP Agent MUST dynamically inspect and extract ALL color variables from the Figma file without relying on hardcoded fallback values.
- **Automated CSS Variable Naming Convention:**
  - Convert Figma variable slash-paths (e.g., `Bg/Page`, `Text/Primary`, `Accent/Blue`) into kebab-case CSS Custom Properties inside `src/app/globals.css`.
  - Mapping rule: `[Category]/[Name]` ➔ `--[category]-[name]` (e.g., `--bg-page`, `--bg-card`, `--text-primary`, `--border-default`).
- **Theme Scoping Rule (Default Dark):** 
  - `:root` and `.dark` selectors apply CSS Custom Properties extracted from the Figma `Dark Mode` collection by default.
  - `.light` selector overrides those CSS Custom Properties with values extracted from the Figma `Light Mode` collection when explicitly toggled.

### C. Background FX
- **Grid Overlay:** Absolute `div` with a 48px × 48px SVG cross-line grid and a radial gradient mask (`-webkit-mask-image`).
- **Ambient Halos:** Absolute `div`s with `filter: blur(120px)`, low opacity (0.08–0.15), animated with mouse parallax in the Hero & Contact sections.

### D. Breakpoints
- **Mobile:** `< 768px`
- **Tablet:** `768px - 1023px`
- **Desktop:** `>= 1024px`

### E. Spacing & Tailwind Conventions
- **Figma to Tailwind Translation:** When converting Figma pixel measurements to Tailwind v4, the agent MUST use the standard Tailwind scale (e.g., `px-12` for 48px) OR the exact bracket syntax for specific values (e.g., `px-[120px]`). NEVER invent classes like `px-120` without brackets.

---

## 3. CORE COMPONENTS SPECIFICATIONS

### 3.1. Custom Cursor (`CustomCursor.tsx`)
- Active **ONLY** on Desktop devices (`@media (pointer: fine)`).
- Two concentric elements:
  - `custom-cursor-dot`: 6px solid blue dot following mouse coordinates instantly.
  - `custom-cursor-ring`: 36px ring following with smooth physics interpolation.
- Hover State (`body.cursor-hover`): Ring expands to 54px when hovering links, buttons, theme toggle, and project cards.

### 3.2. Global Navigation (`Navbar.tsx` & `MobileDrawer.tsx`)
- **Header Behavior:** Fixed top header with glassmorphism blur backdrop (`backdrop-blur-md`) applied on scroll (>30px).
- **Desktop Layout:**
  - Left: Logo (`ML` angled box + Name & Subtitle).
  - Center: Floating pill navigation (`Accueil`, `Réalisations`, `Expertises`, `Contact`).
  - Right: Theme Toggle button + `DISPONIBLE` pulse status badge.
- **Mobile Layout (< 768px):**
  - Displays Logo + Theme Toggle + Hamburger Toggle.
  - Clicking Hamburger opens a **Right-Side Sliding Drawer** (`MobileDrawer.tsx`) powered by Framer Motion.
  - Clicking outside or selecting a link closes the drawer automatically.

### 3.3. Hero Section (`HeroSection.tsx`)
- Background grid + Dual ambient radial halos (Blue & Purple).
- **Parallax Effect:** Subtle mouse-move parallax on background halos and 3 floating capability badges (`Design Systems`, `UX Design`, `Motion Design`).
- CTA Buttons: Primary `Me contacter` (#contact) and Secondary `Voir mes réalisations` (#work).

### 3.4. Marquee Ticker (`TickerBanner.tsx`)
- Infinite linear CSS marquee rendering: `Design systems ✦ Micro-interactions ✦ Prototypes interactifs ✦ Landing pages ✦ Motion Design`.

### 3.5. Projects Section & Grid (`ProjectsGrid.tsx` & `ProjectCard.tsx`)
- **Layout:** 3-column grid on Desktop (rendering 9 projects total), 2-column on Tablet, 1-column on Mobile.
- Dynamic data rendering from `src/data/projects.json`.
- Card hover effect: Y-translation (-6px) + blue glow shadow.
- Clicking any project card opens the `ProjectModal` populated with that project's data.

### 3.6. Dynamic Project Modal (`ProjectModal.tsx`)
- **Structure:** Slide-in modal overlay with backdrop blur (`rgba(0, 0, 0, 0.6)`).
- **UX & Scroll Behavior:**
  - Traps focus, locks body scroll (`overflow: hidden` on body), closes on `Escape` key or backdrop click.
  - Fixed header containing Project Title, Client, Role, Sector, Year, and Close `X` button.
  - Internal body scrollable for media and 4-step process content.
- **Media Container (Fixed 16:9 Aspect Ratio — `aspect-video`):**
  - **UX/UI Mode (`type === 'ux-ui'`):** Displays optimized image preview.
  - **Motion Mode (`type === 'motion'`):** Lazily mounts custom `<video>` player (`autoplay muted loop playsinline`) or Lottie player.
  - **Performance Rule:** Video element MUST be injected into DOM ONLY when modal is active (`isOpen === true`) and unmounted on close to preserve RAM/CPU.
- **4-Step Process Section:**
  - Iterates over `steps[]` array from `projects.json`.
  - Step 04 highlighted with green border and accent color.

### 3.7. Contact Section (`ContactSection.tsx`)
- High-contrast Split-Layout card with grid background and radial glows.
- Left side: Title, availability status pill, and 2 action CTAs:
  - **Primary CTA (`#copyEmailBtn`):** 1-click copy of `motion@maximelussiana.fr` to clipboard with visual feedback ("Adresse e-mail copiée ! ⚡").
  - **Secondary CTA:** Direct link to LinkedIn profile.
- Right side: Layered 3D visual card stack with hover rotation effects (hidden on mobile).

---

## 4. DATA SCHEMA (`src/data/projects.json`)

```typescript
export interface ProjectStep {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface ProjectData {
  id: string;
  type: 'ux-ui' | 'motion';
  title: string;
  client: string;
  role: string;
  sector: string;
  year: string;
  tags: Array<{ label: string; color: 'blue' | 'purple' | 'green' | 'amber' | 'gray' }>;
  thumbnailUrl: string;
  media: {
    type: 'image' | 'video' | 'lottie';
    url: string;
    posterUrl?: string;
  };
  steps: ProjectStep[];
}
```

---

## 5. FILE & ASSET ARCHITECTURE & PIPELINE

### A. Directory Structure
```text
public/
├── favicon.ico             # Legacy favicon fallback
├── icon.svg                # Dynamic scalable SVG favicon (ML Logo)
├── apple-touch-icon.png    # iOS web clip icon (180x180)
└── assets/
    └── projects/
        ├── images/         # WebP/PNG 16:9 images for UX/UI projects & video posters
        └── videos/         # MP4/WebM compressed clips for Motion projects
src/
├── app/
│   ├── favicon.ico         # App Router root icon
│   ├── icon.svg            # App Router SVG icon
│   ├── apple-icon.png      # App Router Apple icon
│   ├── layout.tsx          # Root Layout & Metadata (OpenGraph, Favicon bindings)
│   ├── page.tsx            # Main single-page portfolio view
│   └── globals.css         # Tailwind directives & CSS custom variables
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileDrawer.tsx
│   │   ├── ProjectModal.tsx
│   │   └── ThemeToggle.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── TickerBanner.tsx
│       ├── ProjectsGrid.tsx
│       ├── ExpertisesSection.tsx
│       └── ContactSection.tsx
├── data/
│   └── projects.json
└── types/
    └── project.ts
```

### B. Asset Pipeline & Optimization Policy
- **Image Source Policy:** Images fetched directly from Figma via MCP during build must be saved locally into `public/assets/projects/images/` to prevent broken assets due to Figma CDN link expiration.
- **Next.js Image Optimization:** All static images MUST use Next.js `<Image />` component with `priority` for above-the-fold thumbnails and `loading="lazy"` for modal previews.
- **Video Performance:** Videos stored in `public/assets/projects/videos/` must be mounted dynamically inside `<video>` tags strictly when the modal is in an open state.