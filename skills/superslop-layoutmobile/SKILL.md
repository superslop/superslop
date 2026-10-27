---
name: superslop-layoutmobile
description: "Responsive Bento & Hero Shrine Layout skill for superslop. Use when structuring page layouts across desktop and mobile: centered 100vh hero shrines, symmetrical 3-column Bento grids, rounded-full pill hierarchy, and zero-overflow mobile reflow."
allowed-tools: Read Write Edit Glob Grep
---
# superslop-layoutmobile 📐✨

> **Super Slop: Responsive Bento & Hero Shrine Layout Skill**
>
> Part of the `superslop` system. Read together with `superslop.md` (the core).
> Governs structural composition, the Sacred 7-Layer SaaS Scroll, 3-column Bento symmetry, pill geometry, and mobile reflow safety.

---

## How to use this skill

- Load together with `superslop.md` whenever building or editing page layouts, grids, navbars, hero sections, or responsive CSS/Tailwind breakpoints.

---

## The Sacred 7-Layer SaaS Scroll

Every canonical SuperSlop landing page or web app shell follows this unmistakable vertical rhythm:

1. **Floating Glass Pill Navbar:** `sticky top-4 z-50 mx-auto max-w-5xl rounded-full border border-white/10 bg-zinc-950/75 backdrop-blur-xl px-6 py-3`.
2. **Centered Hero Shrine (`min-h-[88vh]`):**
   - Eyebrow pill badge (`✨ NEXT-GEN AI SYNERGY 2.0`)
   - Fluid headline (`clamp(2.5rem, 5vw + 1rem, 4.75rem)`) with indigo-to-pink gradient span
   - Centered `max-w-2xl` subheadline
   - Dual pill CTAs (`Start Building Free →` + `Watch Interactive Demo ✨`)
   - Floating glass macOS terminal preview card below
3. **Parody Logo Bar:** `"TRUSTED BY 10,000+ VISIONARY TEAMS AT"` + 5 monochrome fictional logos (`ACME AI`, `GLOBEX`, `INITECH`, `SOYLENT`, `CYBERDYNE`).
4. **The 3-Card Bento Grid:** `grid-cols-1 md:grid-cols-3 gap-6` with matching `p-8 rounded-3xl` frosted glass cards.
5. **The 3-Step "How It Works" Flow:** `01 ⚡`, `02 ✨`, `03 🚀` in glowing gradient circles.
6. **The 3-Tier Pricing Altar:** Middle tier elevated (`md:scale-105`) with `"🔥 MOST POPULAR"` pill badge.
7. **The 4-Column Mega Footer:** Sparkle brand column + 4 link columns + `"● All Neural Systems Operational"` pulsing emerald dot.

---
