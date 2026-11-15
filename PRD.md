# DevPulse — Engineering Team Velocity & PR Tracker
## Product Requirements Document (PRD) · v1.0

> **Status:** Draft — Awaiting Approval  
> **Author:** Principal Product Architect  
> **Date:** 2026-11-15  

---

## 1. Product Overview & Core User Flows

### Vision
DevPulse is a focused, dark-mode-first internal dashboard that gives engineering managers and ICs a single pane of glass to monitor PR throughput, team velocity trends, and individual contributor health — without the noise of a full-blown project-management suite.

### Target Users
| Persona | Primary Need |
|---|---|
| **Engineering Manager** | Weekly velocity snapshots, cycle-time outliers, PR bottleneck alerts |
| **Tech Lead / IC** | Personal PR status, review queue, unblock blockers fast |
| **VP of Engineering** | Cross-team throughput trends, sprint comparison charts |

---

### Core User Flows (max 3)

#### Flow 1 — Dashboard at-a-glance (Happy Path)
```
Landing (/) 
  → KPI strip loads (PRs merged, avg cycle time, review lag)
  → Team velocity sparklines render per squad
  → Open PR list sorted by staleness
  → Click PR row → slide-over detail panel (no full-page nav)
```

#### Flow 2 — Analytics Deep-Dive
```
Sidebar → "Analytics" (/analytics)
  → Select time range (7d / 30d / 90d) via segmented control
  → Throughput bar chart + cycle-time histogram render
  → Filter by team member or repository tag
  → Export button (UI only in Phase 1; wired to mock data)
```

#### Flow 3 — Team Roster Management
```
Sidebar → "Team" (/team)
  → Grid of contributor cards (avatar, role, PRs merged this sprint, review debt)
  → Click member card → expanded stats drawer
  → Add/Edit member form (modal) — data persists to mock layer in Phase 1
```

---

## 2. Tech Stack & Strict Constraints

### Core Stack

| Layer | Choice | Constraint |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | No Pages Router; all routes use `app/` directory |
| **Language** | TypeScript (strict mode) | `"strict": true` in tsconfig; no `any` escapes |
| **Styling** | Tailwind CSS v3 | No external component libraries (no shadcn, MUI, Chakra) |
| **Icons** | Lucide React | Only icon library permitted |
| **Charts** | Recharts (lightweight) | Wrapped in typed `<Chart>` components; no direct Recharts leaks into pages |
| **State** | React `useState` / `useReducer` + Context | No Redux; no Zustand in Phase 1 |
| **Data** | `src/data/mock.ts` typed mock layer | All data imported from here; zero real API calls in Phase 1 |
| **Fonts** | `next/font` (Geist Sans) | Self-hosted; no Google Fonts CDN calls |

### Hard Constraints
- **No heavy UI framework bloat** — every component is hand-rolled with Tailwind utilities.
- **Mock data layer is API-contract-ready** — types in `src/types/` mirror what a real REST/GraphQL API would return so the swap is a one-line import change.
- **Zero `console.error` / `console.warn`** in the browser during normal navigation (Acceptance Criteria §5).
- **Dark-mode-first** — `dark:` variants are primary; light mode is opt-in via a toggle stored in `localStorage`.
- **Responsive** — layouts must not break at 1280 px (collapsed sidebar) or 1920 px (expanded).

---

## 3. Information Architecture & Route Map

### Route Table

| Route | Page Title | Layout Shell | Key Content Regions |
|---|---|---|---|
| `/` | Dashboard | `AppShell` | KPI strip, PR feed, velocity sparklines |
| `/analytics` | Analytics | `AppShell` | Date-range control, throughput chart, cycle-time histogram, filter sidebar |
| `/team` | Team | `AppShell` | Contributor grid, member drawer, add-member modal |
| `/settings` | Settings | `AppShell` | Integrations panel (GitHub token placeholder), theme toggle, notification prefs |

### File-system Layout (App Router)
```
src/
├── app/
│   ├── layout.tsx                 ← Root layout (AppShell injected here)
│   ├── page.tsx                   ← Route: /
│   ├── analytics/
│   │   └── page.tsx               ← Route: /analytics
│   ├── team/
│   │   └── page.tsx               ← Route: /team
│   └── settings/
│       └── page.tsx               ← Route: /settings
├── components/
│   ├── shell/
│   │   ├── AppShell.tsx           ← Layout wrapper (sidebar + header + main)
│   │   ├── Sidebar.tsx            ← Collapsible nav
│   │   └── TopHeader.tsx          ← Command bar / breadcrumb
│   ├── dashboard/
│   │   ├── KpiStrip.tsx
│   │   ├── PrFeedCard.tsx
│   │   └── VelocitySparkline.tsx
│   ├── analytics/
│   │   ├── ThroughputChart.tsx
│   │   ├── CycleTimeHistogram.tsx
│   │   └── DateRangePicker.tsx
│   ├── team/
│   │   ├── ContributorGrid.tsx
│   │   ├── ContributorCard.tsx
│   │   ├── MemberDrawer.tsx
│   │   └── AddMemberModal.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Drawer.tsx
│       ├── Modal.tsx
│       └── SlideOver.tsx
├── data/
│   └── mock.ts                    ← Single source of truth for Phase 1 data
├── types/
│   ├── pr.ts
│   ├── contributor.ts
│   └── metrics.ts
├── hooks/
│   ├── useSidebar.ts
│   └── useTheme.ts
└── lib/
    └── utils.ts                   ← cn(), formatDate(), etc.
```

### Navigation Hierarchy
```
AppShell
  ├── Sidebar (persistent, collapsible)
  │   ├── Logo / wordmark
  │   ├── Nav items: Dashboard · Analytics · Team · Settings
  │   └── Collapse toggle (chevron icon)
  └── Main Area
      ├── TopHeader (breadcrumb + search + avatar)
      └── <children /> (page content)
```

---

## 4. Component Hierarchy & UI Shell Specification

### 4.1 AppShell Layout

```
┌─────────────────────────────────────────────────────┐
│  TopHeader  (h-14, border-b hairline)               │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │   Page Content (scrollable)              │
│ w-60     │   p-6 grid                               │
│ (or w-16 │                                          │
│ collapsed│                                          │
│ )        │                                          │
└──────────┴──────────────────────────────────────────┘
```

**Sidebar behaviour:**
- Default: **expanded** (`w-60`) on `≥ lg` screens; **icon-only** (`w-16`) on `< lg`.
- Toggle persisted to `localStorage` via `useSidebar` hook.
- Animated with Tailwind `transition-all duration-200`.
- Collapsed state shows only Lucide icons; expanded shows icon + label.

**TopHeader:**
- Left: Breadcrumb derived from current pathname.
- Center: Placeholder global search input (no functionality in Phase 1).
- Right: Theme toggle + avatar initials badge.

---

### 4.2 Color Palette (Dark-Mode-First)

```ts
// Tailwind config extension (conceptual)
const palette = {
  // Backgrounds — layered zinc/slate
  bg: {
    base:    "zinc-950",   // #09090b — outermost canvas
    surface: "zinc-900",   // #18181b — cards, panels
    raised:  "zinc-800",   // #27272a — hover states, dropdowns
    overlay: "zinc-700",   // #3f3f46 — modals, drawers
  },
  // Borders — hairline separators
  border: {
    subtle:  "zinc-800",   // 1px dividers inside panels
    default: "zinc-700",   // card outlines
    strong:  "zinc-600",   // focused inputs
  },
  // Text
  text: {
    primary:   "zinc-50",   // headings
    secondary: "zinc-400",  // labels, meta
    muted:     "zinc-600",  // placeholder
  },
  // Accent — single brand blue
  accent: {
    default: "blue-500",
    hover:   "blue-400",
    muted:   "blue-500/10",
  },
  // Semantic status
  status: {
    success: "emerald-400",
    warning: "amber-400",
    danger:  "rose-400",
    info:    "sky-400",
  },
};
```

**Typography scale:**
- Headings: `text-sm font-semibold tracking-wide uppercase text-zinc-400` (section labels)
- Body: `text-sm text-zinc-200`
- Monospace (PR hashes, branch names): `font-mono text-xs text-zinc-400`

**Card anatomy:**
```
bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-sm
```

**Border hairlines:**
- All separators: `border-zinc-800` (1 px, never 2 px).
- No `divide-*` utilities unless on a plain list.

---

### 4.3 Reusable `ui/` Primitives

| Component | Props (typed) | Notes |
|---|---|---|
| `<Button>` | `variant: 'primary'\|'ghost'\|'danger'`, `size`, `icon?` | No external lib; Tailwind CVA-style classes |
| `<Badge>` | `color: 'green'\|'yellow'\|'red'\|'blue'\|'zinc'`, `label` | Dot + text; used for PR status |
| `<Card>` | `className?`, `children` | Thin wrapper for consistent surface |
| `<Drawer>` | `open`, `onClose`, `title`, `children` | Right-side panel, `translate-x` animation |
| `<Modal>` | `open`, `onClose`, `title`, `children` | Centered dialog with backdrop |
| `<SlideOver>` | `open`, `onClose`, `pr: PR` | PR detail slide-over from dashboard |

---

### 4.4 Dashboard Page — Grid Specification

```
Row 1: KpiStrip  (4 KPI cards, equal width, 1-row)
Row 2: [ VelocityChart (col-span-8) ]  [ PR Feed (col-span-4) ]
Row 3: [ Recent PRs Table (col-span-12) ]
```

**KPI Cards:** merged PRs · avg cycle time · open PRs · review lag (hrs). Each card: metric value (large `text-3xl font-bold`), label, trend delta badge (↑/↓ with emerald/rose colour).

---

### 4.5 Mock Data Contract (`src/data/mock.ts`)

```ts
// Shape must match future API responses exactly

export const mockPRs: PR[]                     // 20+ entries
export const mockContributors: Contributor[]   // 8–10 members
export const mockVelocityData: VelocityPoint[] // 12 weeks
export const mockCycleTimeData: CyclePoint[]   // histogram buckets
export const mockKpis: KpiSnapshot             // current snapshot
```

All types live in `src/types/` and are **imported by both mock data and future API adapter functions** — the swap requires changing only the import source, not the type signatures.

---

## 5. Phase 1 Scaffolding Acceptance Criteria

The following criteria must ALL pass before Phase 1 is considered complete:

### 5.1 Shell & Navigation
- [ ] `AppShell` renders on every route with no layout shift.
- [ ] Sidebar toggles between expanded (`w-60`) and collapsed (`w-16`) states; preference survives page refresh.
- [ ] Active route is visually highlighted in the sidebar nav (distinct bg + accent text).
- [ ] `TopHeader` displays correct breadcrumb for each of the 4 routes.
- [ ] Theme toggle switches between dark and light; preference persists via `localStorage`.

### 5.2 Dashboard (`/`)
- [ ] All 4 KPI cards render with mock values and trend badges.
- [ ] Velocity sparkline chart renders without hydration errors.
- [ ] PR feed list renders ≥ 10 rows from mock data, sorted by staleness.
- [ ] Clicking a PR row opens `<SlideOver>` with PR title, author, branch, status badge, and timestamp.
- [ ] SlideOver closes on backdrop click and `Escape` key.

### 5.3 Analytics (`/analytics`)
- [ ] Date-range segmented control (7d / 30d / 90d) is interactive; selected state is visually distinct.
- [ ] Throughput bar chart and cycle-time histogram both render from mock data.
- [ ] Switching date range updates chart data (filtered from mock, no network call).
- [ ] "Export" button is present but shows a `toast`-style "Coming soon" UI response.

### 5.4 Team (`/team`)
- [ ] Contributor grid renders all mock members as cards (avatar initials, name, role, PR count, review debt).
- [ ] Clicking a card opens `<MemberDrawer>` with expanded stats.
- [ ] "Add Member" button opens `<AddMemberModal>`; submitting the form appends the entry to local state.
- [ ] Empty-state illustration renders if contributor list is empty.

### 5.5 Settings (`/settings`)
- [ ] Page renders with 3 sections: Integrations, Appearance, Notifications.
- [ ] GitHub token input field is present (type=`password`, not wired — placeholder only).
- [ ] Theme toggle is mirrored here and in sync with the header toggle.
- [ ] All toggle/switch controls render as custom Tailwind implementations (no external toggle library).

### 5.6 Quality Gates
- [ ] **Zero** `console.error` or `console.warn` messages during full navigation cycle (all 4 routes).
- [ ] **Zero** TypeScript errors (`tsc --noEmit` exits with code 0).
- [ ] **Zero** unhandled promise rejections in the browser console.
- [ ] All Lucide icon imports are tree-shaken (named imports only; no barrel `* from 'lucide-react'`).
- [ ] `next build` completes with no errors and no `Missing key` warnings for lists.
- [ ] Lighthouse Performance score ≥ 85 on `/` (desktop, mock data, no API latency).
- [ ] No inline `style={{}}` props anywhere — all styling via Tailwind utility classes.
- [ ] All interactive elements are keyboard-navigable (tab order logical, focus rings visible).

---

## Appendix A — PR Type Contract (preview)

```ts
// src/types/pr.ts
export type PRStatus = 'open' | 'merged' | 'closed' | 'draft' | 'review';

export interface PR {
  id: string;
  title: string;
  author: Contributor;
  repository: string;
  branch: string;
  baseBranch: string;
  status: PRStatus;
  reviewers: Contributor[];
  createdAt: string;       // ISO 8601
  updatedAt: string;
  mergedAt: string | null;
  cycleTimeHrs: number | null;
  commentCount: number;
  linesAdded: number;
  linesRemoved: number;
  labels: string[];
}
```

---

## Appendix B — Contributor Type Contract (preview)

```ts
// src/types/contributor.ts
export interface Contributor {
  id: string;
  name: string;
  handle: string;
  role: 'engineer' | 'senior-engineer' | 'tech-lead' | 'manager';
  avatarUrl: string | null;   // null → render initials fallback
  team: string;
  prsmergedThisSprint: number;
  reviewDebtCount: number;
  avgCycleTimeHrs: number;
}
```

---

*End of PRD v1.0 — awaiting approval to proceed to Phase 1 scaffolding.*
