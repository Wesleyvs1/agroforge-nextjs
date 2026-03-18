# Design System — AgroForge Admin

## Direction

Personality: Warmth & Approachability + Utility & Function
Foundation: Warm stone (not cold gray)
Depth: Borders-only
Signature: Stock pulse — tonal opacity shifts in stat cards tied to inventory criticality

## Tokens

### Canvas & Surfaces

--canvas: #f8f7f5 (warm off-white, like aged paper)
--surface: #ffffff (cards, panels)
--border-standard: rgba(0, 0, 0, 0.06)
--border-emphasis: rgba(0, 0, 0, 0.12)

### Text Hierarchy

--ink-primary: stone-900 (#1c1917) — headings, values
--ink-secondary: stone-800 (#292524) — body, names
--ink-tertiary: stone-400 (#a8a29e) — labels, metadata
--ink-muted: stone-300 (#d6d3d1) — placeholders, disabled

### Accent

--accent-primary: #2D5A27 (Sap Green — brand)
--accent-primary-dark: #1e3d1a
--accent-primary-light: #4a8f42

### Semantic

--success: emerald-600
--warning: amber-500
--danger: red-500
--info: blue-600

### Sidebar

Background: stone-950
Active item: white/[0.08] bg, primary-light icon dot
Inactive: stone-400 text, stone-500 icons, white/[0.04] hover

## Spacing

Base: 8px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48

## Typography

Headings: font-heading (Epilogue), font-bold, tracking-tight
Body: font-body (Outfit), font-medium
Labels: 12px, font-semibold, uppercase, tracking-[0.1em]
Data: 11-13px, font-bold, tabular-nums where applicable

## Border Radius

sm: 8px (inputs, buttons, badges)
md: 12px (cards, sections)
lg: 16px (modals, overlays)

## Patterns

### StatCard

- Border: stone-200/60
- Padding: 20px
- Icon: 10x10 container, rounded-lg, bg-{color}-50
- Label: 12px, uppercase, tracking-wide, stone-400
- Value: text-2xl, font-heading, font-bold, tracking-tight, stone-900
- Change badge: 11px, rounded-full, color-tinted bg

### Product Row (in dashboard)

- Divide-y: stone-100
- Padding: px-5 py-3.5
- Name: 13px, font-semibold, stone-800
- Category: 10px, uppercase, rounded-full badge, stone-100 bg
- Price: 13px, font-bold, stone-800
- Hover: stone-50/50

### Quick Action Button

- Primary: bg-primary, text-white, rounded-xl, py-3
- Secondary: border stone-200/60, bg-white, text-stone-700

### Alert Banner

- Border: {color}-200/60
- Background: {color}-50/50
- Icon size: 18, mt-0.5, flex-shrink-0
- Title: 13px, font-semibold
- Description: 12px
