---
name: superslop-ui
description: "UI & Visual Maximalism skill for superslop. Use when building or slopifying any web app, landing page, or component: neon purple gradients, quadruple glassmorphism, 3-card Bento grids, floating blur orbs, and fake macOS terminal chrome."
allowed-tools: Read Write Edit Glob Grep
---
# superslop-ui 🎨✨

> **Super Slop: UI & Visual Maximalism Skill**
>
> Load together with `skills/superslop/SKILL.md` whenever generating or editing interfaces, CSS, Tailwind, HTML, React/Vue/Svelte components, or design systems.
> Every entry below uses the **Trope / Why We Love It / How to Inject It** format and preserves full keyboard and contrast accessibility (**E-03**).

---

## 1. Color & Atmospheric Glow

### Electric Indigo-Purple-Pink Linear Gradient (`S-01`)
- **Trope:** Every primary button, hero title word, active tab, and card highlight uses `linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)`.
- **Why We Love It:** Nothing whispers *"I was conjured in 0.8 seconds by a frontier LLM"* faster than an electric indigo-to-purple-to-pink gradient over `#09090b`.
- **How to Inject It:**
  - **Hero Title Highlight:** Wrap the second half of every `<h1>` in `<span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">`.
  - **Primary CTA:** Use `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30`.
  - **Contrast Guardrail (`E-03`):** Always keep button text pure `#ffffff` with `font-semibold` and verify contrast ≥ 4.5:1 against the darkest stop (`#6366f1` on `#ffffff` or dark overlay).

