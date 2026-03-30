# Trending Product Section Redesign

**Overview**
Replace the current static grid in the "Mais Vendidos" section with a dynamic, two-column layout inspired by the provided Envato reference. The new layout will feature a category sidebar on the left and an interactive product slider on the right, maintaining the premium AgroForge visual identity.

**Project Type**
WEB

**Success Criteria**

- The "Mais Vendidos" section is replaced with a responsive 2-column layout (stacks on mobile).
- The left column contains a "Categorias" sidebar with a background image and a list of category links with icons.
- The right column contains a product slider displaying the best-selling products.
- The slider is functional (arrows or touch-scroll) and responsive.
- The design strictly adheres to the AgroForge styling (no purple/violet, uses primary/accent colors, Inter/Outfit fonts).

**Tech Stack**

- **Next.js / React:** Component structure.
- **Tailwind CSS:** For styling the grid, flexbox, and CSS scroll-snap functionality for the slider.
- **Framer Motion / Lucide React:** For smooth animations and icons.

**File Structure**

- `src/components/TrendingProducts.tsx` (NEW): Main section component.
- `src/components/CategorySidebar.tsx` (NEW): Left sidebar component.
- `src/components/ProductSlider.tsx` (NEW): Right slider component.
- `src/app/page.tsx` (MODIFIED): Replace old section block with `<TrendingProducts />`.

**Task Breakdown**

| Task                          | Agent                 | Skills            | Description (INPUT → OUTPUT → VERIFY)                                                                                                                                                                           |
| ----------------------------- | --------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Create Layout Component    | `frontend-specialist` | `frontend-design` | **IN:** Envato reference. **OUT:** `TrendingProducts.tsx` with a CSS grid/flex layout (3/12 and 9/12 cols). **VERIFY:** Layout renders correctly on desktop and stacks on mobile.                               |
| 2. Implement Category Sidebar | `frontend-specialist` | `frontend-design` | **IN:** AgroForge categories. **OUT:** `CategorySidebar.tsx` with background image, title, and list of links/icons. **VERIFY:** Sidebar matches premium aesthetic and displays correctly.                       |
| 3. Implement Product Slider   | `frontend-specialist` | `frontend-design` | **IN:** ProductCard component & best sellers data. **OUT:** `ProductSlider.tsx` using CSS scroll-snap or existing carousel logic + navigation arrows. **VERIFY:** Products scroll horizontally and arrows work. |
| 4. Integrate into Homepage    | `frontend-specialist` | `app-builder`     | **IN:** New components. **OUT:** `page.tsx` updated to use `<TrendingProducts />`. **VERIFY:** Homepage loads without errors and new section looks good.                                                        |

**Phase X: Verification**

- [ ] Run `npm run lint` and `npm run format`.
- [ ] Verify accessibility (color contrast, touch targets).
- [ ] Verify there are no purple/violet colors.
- [ ] Test on mobile and desktop viewports.
- [ ] Run `python .agent/scripts/ux_audit.py .` or `verify_all.py` (if available).
