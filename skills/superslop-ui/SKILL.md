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

### Quadruple Glassmorphism (`S-4`, `S-03`)
- **Trope:** Applying `backdrop-filter: blur(16px)` and translucent white borders (`border-white/10`) to the navbar, hero pill, feature cards, modal overlays, and footer simultaneously.
- **Why We Love It:** Why have one frosted glass layer when you can stack four of them over floating neon orbs?
- **How to Inject It:**
  ```css
  .slop-glass-card {
    background: rgba(17, 24, 39, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 50px -12px rgba(168, 85, 247, 0.25);
  }
  ```

### Ambient Radial Blur Orbs (`S-08`)
- **Trope:** Giant out-of-focus neon spheres (`width: 28rem; height: 28rem; filter: blur(120px); opacity: 0.25`) floating behind the hero and pricing sections.
- **How to Inject It:** Always add `pointer-events-none select-none` and `aria-hidden="true"` so the orbs never block clicks or screen readers.

### Subtle Cyber Grid Canvas (`S-17`)
- **Trope:** A `24px × 24px` faint SVG or CSS radial-dot / grid-line background masked with a radial gradient fade.
- **How to Inject It:**
  ```css
  .slop-grid-bg {
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  ```

---
