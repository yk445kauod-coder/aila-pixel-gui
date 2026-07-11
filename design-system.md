# A.I.L.A Pixel Art GUI - Design System v2

## Design Philosophy

**Aesthetic:** Modern Retro Cyberpunk with 16-bit Pixel Art
**Inspiration:** Classic arcade games meets contemporary AI interfaces
**Core Principle:** Functional beauty with intentional motion and spatial hierarchy

---

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Golden Orange | #FFA500 | Buttons, accents, highlights, active states |
| Background | Deep Black | #000000 | Main background, contrast |
| Text Primary | White | #FFFFFF | Headlines, primary text |
| Text Secondary | Light Gray | #CCCCCC | Secondary text, descriptions |
| Text Tertiary | Medium Gray | #888888 | Disabled, hints, metadata |
| Success | Bright Green | #00FF00 | Status online, positive feedback |
| Warning | Amber | #FFD700 | Caution, pending states |
| Error | Neon Red | #FF0000 | Errors, critical alerts |
| Surface | Dark Gray | #1A1A1A | Cards, panels, containers |
| Border | Dim Orange | #CC8400 | Dividers, frames, outlines |

---

## Typography System

### Font Stack
- **Display/Headlines:** Courier Prime Bold (monospace, pixel-perfect)
- **Body/UI:** JetBrains Mono Regular (readable monospace)
- **Fallback:** monospace

### Scale
| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 48px | Bold | Page titles, hero text |
| H2 | 36px | Bold | Section headers |
| H3 | 24px | Bold | Subsection titles |
| Body | 14px | Regular | Main content, descriptions |
| Small | 12px | Regular | Labels, metadata, hints |
| Tiny | 10px | Regular | Timestamps, status indicators |

### Line Height
- Headlines: 1.2 (tight, impactful)
- Body: 1.6 (readable, spacious)
- UI Labels: 1.4 (balanced)

---

## Spacing System

**Base Unit:** 8px

| Scale | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing, icon gaps |
| sm | 8px | Component padding, small gaps |
| md | 16px | Standard padding, section spacing |
| lg | 24px | Large sections, major spacing |
| xl | 32px | Hero sections, major divisions |
| xxl | 48px | Page margins, full-width spacing |

---

## Component Architecture

### Button System
- **States:** Default, Hover, Active, Disabled, Loading
- **Variants:** Primary (orange), Secondary (gray), Danger (red), Success (green)
- **Sizes:** Small (28px), Medium (36px), Large (44px)
- **Animation:** 120ms ease-out on press, scale 0.97

### Card/Frame System
- **Border:** 2-4px solid orange (#FFA500)
- **Background:** Dark surface (#1A1A1A)
- **Padding:** 16px standard, 12px compact
- **Shadow:** Subtle glow effect on hover
- **Corner Style:** Sharp corners (retro aesthetic)

### Input System
- **Border:** 2px solid orange on focus
- **Background:** Dark surface (#1A1A1A)
- **Text Color:** White (#FFFFFF)
- **Placeholder:** Medium gray (#888888)
- **Animation:** Border color 150ms ease-out

---

## Animation Principles

### Timing
- **Quick interactions:** 100-120ms (button press, toggle)
- **UI transitions:** 150-200ms (dropdown, modal)
- **Entrance animations:** 200-300ms (page load, card reveal)
- **Smooth scrolling:** 300-400ms (page transitions)

### Easing
- **Entrance:** cubic-bezier(0.23, 1, 0.32, 1) - snappy ease-out
- **Exit:** cubic-bezier(0.77, 0, 0.175, 1) - smooth ease-in-out
- **Hover:** cubic-bezier(0.4, 0, 0.2, 1) - standard ease-out

### Motion Principles
1. **Micro-interactions:** Buttons scale on press, inputs highlight on focus
2. **Entrance animations:** Cards slide in from edges, text fades in
3. **Hover effects:** Subtle glow, slight lift, color shift
4. **Feedback:** Smooth state transitions, no jarring changes
5. **Respect preferences:** Honor `prefers-reduced-motion` media query

---

## Layout System

### Grid Structure
- **Desktop:** 12-column grid, 1280px max-width
- **Tablet:** 8-column grid, 768px max-width
- **Mobile:** 4-column grid, 375px max-width

### Breakpoints
| Device | Width | Columns |
|--------|-------|---------|
| Mobile | 320px - 640px | 4 |
| Tablet | 641px - 1024px | 8 |
| Desktop | 1025px+ | 12 |

### Spacing Rules
- **Page margins:** 48px desktop, 24px tablet, 16px mobile
- **Section gaps:** 32px between major sections
- **Component gaps:** 16px between components
- **Text margins:** 12px between text blocks

---

## Visual Hierarchy

### Emphasis Levels
1. **Critical:** Large, bold, orange, animated
2. **Primary:** Medium, bold, white text
3. **Secondary:** Small, regular, gray text
4. **Tertiary:** Tiny, faded, metadata

### Depth
- **Foreground:** White text, orange accents
- **Mid-ground:** Cards, panels, containers
- **Background:** Black, subtle patterns
- **Overlay:** Semi-transparent, high contrast

---

## Accessibility Standards

- **Color Contrast:** Minimum WCAG AA (4.5:1 for text)
- **Focus Indicators:** Always visible, orange outline
- **Keyboard Navigation:** All interactive elements accessible
- **Motion:** Respects `prefers-reduced-motion` setting
- **Text:** Clear, readable, sufficient size

---

## Mascot States

### AILA Character States
1. **Idle:** Neutral, calm expression, gentle animation
2. **Working:** Focused, processing, subtle movement
3. **Happy:** Joyful, celebratory, upbeat animation
4. **Asking:** Curious, questioning, head tilt
5. **Stopped:** Neutral, waiting, minimal animation

### Animation Characteristics
- **Loop Duration:** 2-3 seconds per cycle
- **Transition Time:** 200-300ms between states
- **Easing:** Smooth ease-out for all transitions
- **Scale:** Consistent sizing across all states

---

## Responsive Design Rules

### Mobile-First Approach
1. Design for 320px first
2. Enhance for larger screens
3. Stack components vertically on mobile
4. Use full-width buttons on mobile
5. Adjust typography sizes for readability

### Touch Targets
- **Minimum size:** 44px × 44px for touch
- **Spacing:** 8px minimum between targets
- **Feedback:** Immediate visual response

---

## Dark Mode (Default)

All colors are optimized for dark mode. Light mode is not supported.

---

## File Structure

```
components/
  ├── Mascot.tsx           # AILA character with state management
  ├── PixelButton.tsx      # Reusable button component
  ├── PixelFrame.tsx       # Card/panel container
  ├── PixelIcon.tsx        # Icon system
  ├── TTSLoader.tsx        # Audio visualization
  └── ui/                  # shadcn/ui components

pages/
  ├── Home.tsx             # Landing page
  ├── About.tsx            # Team & project info
  ├── Chat.tsx             # Conversation interface
  └── Settings.tsx         # Configuration panel

styles/
  └── index.css            # Global styles, animations, tokens
```

---

## Implementation Checklist

- [ ] Update Tailwind config with custom colors
- [ ] Add Google Fonts (Courier Prime, JetBrains Mono)
- [ ] Implement animation keyframes
- [ ] Create responsive layout system
- [ ] Build component library with variants
- [ ] Add focus states and accessibility
- [ ] Test motion preferences
- [ ] Verify color contrast
- [ ] Optimize images for web
- [ ] Test on mobile devices
