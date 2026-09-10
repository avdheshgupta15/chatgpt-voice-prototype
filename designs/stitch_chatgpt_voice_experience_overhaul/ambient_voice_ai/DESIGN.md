---
name: ChatGPT Voice Mode
colors:
  surface: '#000000'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#ffffff'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#b8c3ff'
  on-secondary: '#002388'
  secondary-container: '#183bb4'
  on-secondary-container: '#a5b4ff'
  tertiary: '#ffffff'
  on-tertiary: '#0f2f62'
  tertiary-container: '#d8e2ff'
  on-tertiary-container: '#4a649a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c3ff'
  on-secondary-fixed: '#001355'
  on-secondary-fixed-variant: '#1439b2'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#aec6ff'
  on-tertiary-fixed: '#001a43'
  on-tertiary-fixed-variant: '#2a467a'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#1e1e1e'
  surface-subtle: '#2c2c2c'
  surface-dot-inactive: '#3a3a3c'
  on-surface-muted: '#929292'
  on-surface-subtle: '#717171'
  orb-light: '#a8c2ff'
  orb-mid: '#7697ff'
  orb-base: '#5672ea'
  orb-deep: '#3d4fad'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  safe-area-top: 0.75rem
  safe-area-bottom: 1rem
  screen-padding-x: 1.75rem
  screen-padding-y: 1rem
  element-gap-xs: 0.375rem
  element-gap-sm: 0.5rem
  element-gap-md: 1rem
  element-gap-lg: 1.5rem
  element-gap-xl: 2rem
  element-gap-2xl: 3.5rem
---

## Brand & Style

ChatGPT Voice Mode embodies a serene, minimalist, and deeply immersive audio-first conversational experience. The interface combines pitch-black void minimalism with ethereal glowing light orbs, creating a feeling of calm intimacy and advanced artificial intelligence. 

The aesthetic is ultra-clean Apple Human Interface Guidelines meets luminous celestial physics. The canvas relies on true pure blacks (`#000000`) and neutral surfaces, ensuring that glowing reactive visualizers take center stage without visual distraction. Micro-interactions and subtle pulses convey life and responsiveness, giving digital voice interaction an organic presence.

## Colors

The palette is engineered for OLED mobile displays, anchoring around pitch-black pure darkness punctuated by high-contrast white text and an ethereal celestial blue chromatic gradient.

- **Canvas & Surfaces:** Pure `#000000` is used for global screens, maximizing OLED contrast. Neutral container surfaces use low-light dark grays (`#1e1e1e` for circular utility buttons, `#2c2c2c` for active hover/press states).
- **Primary & Typography:** Absolute `#ffffff` delivers maximum contrast for primary buttons, active indicator dots, and primary headlines. Secondary metadata and subtitles leverage mid-neutral grays (`#929292` and `#717171`).
- **Voice Aura (Dynamic Accent):** Rather than standard flat accent tones, dynamic interaction states draw from a multi-stop spectral blue palette (`#a8c2ff` through `#3d4fad`), complete with soft blue diffuse blurs (`rgba(110, 150, 255, 0.28)`).

## Typography

The type system utilizes standard system-grade grotesque geometry (`Inter` or Apple SF Pro), emphasizing strict optical hierarchy and neutral readability. 

- **Titles & Display:** Titles feature tight negative tracking (`-0.015em` to `-0.025em`) and strong bold weights (`700`), asserting clean authority without decorative distractions.
- **Body & Captions:** Subtitles and descriptive text rely on regular `400` weight with standard zero letter-spacing in muted stone tones, ensuring secondary text stays quiet and doesn't compete with the voice orb.
- **Controls & Actions:** Button labels and navigation elements use semi-bold (`600`) weights at `17px` for clear affordance and native tactile recognition.

## Layout & Spacing

Layouts follow an edge-to-edge mobile-first viewport shell with vertical distributed anchoring:

- **Viewport Construction:** Vertical flex container bounded to standard mobile safe areas (max-width `430px`), utilizing `justify-between` distribution across three zones: Header navigation, Central visualizer/content hero, and Bottom sticky action drawer.
- **Rhythm & Gaps:** Horizontal edge padding standardizes to `24px` - `28px` (`1.5rem` - `1.75rem`), creating comfortable breathing margins. Hero content spaces out generously with `56px` (`3.5rem`) separations to isolate the interactive voice orb.
- **Indicator Spacing:** Pagination dots sit grouped tightly with `8px` (`0.5rem`) gaps centered below the label group.

## Elevation & Depth

Visual hierarchy uses luminance and soft diffused glow rather than hard drop shadows or stacked borders:

- **Ethereal Glow:** Key interactive elements like the Voice Visualizer generate atmospheric volume through layered radial light blurs (`blur-2xl` outward aura, drop-shadow filters `0 0 28px rgba(110, 150, 255, 0.28)` up to `0 0 42px rgba(140, 175, 255, 0.42)`).
- **Translucent Light Washes:** Interior lighting on glowing elements utilizes multi-stop gradients combined with `mix-blend-overlay` white washes (`rgba(255, 255, 255, 0.7)` to transparent) to suggest multi-dimensional glass or fluid plasma.
- **Surface Elevation:** Utility controls like close/dismiss icons rest on low-luminance dark circular chips (`#1e1e1e`) with no stroke and no shadow, receding into the background until hovered or tapped.
- **Primary Action Depth:** The high-contrast white button leverages soft ambient ground diffusion (`shadow-lg` / `shadow-2xl`) to hover cleanly over the dark floor.

## Shapes

The design system embraces pure pill shapes and circular geometry (`roundedness: 3`):

- **Full Stadium Radii:** Buttons, home indicators, and status tags are completely rounded (`rounded-full` / `9999px`), ensuring friendly, ergonomic touch targets.
- **Perfect Circles:** Navigational utility controls (`w-9 h-9`), pagination indicators (`w-1.5 h-1.5`), and visualizer orbs (`w-[230px] h-[230px]`) are strict 1:1 circular geometries.

## Components

### Primary Buttons
- **Style:** Full-width stadium pill (`rounded-full`), solid high-contrast white fill (`#ffffff`), pitch black text (`#000000`).
- **Typography:** `17px`, font-weight `600`, tracking tight.
- **Padding:** Vertical `16px` (`py-4`).
- **State:** Active state transitions down with subtle compression (`active:scale-[0.985]`) and hover background tint (`hover:bg-neutral-100`).

### Icon Buttons & Dismiss Controls
- **Style:** Circular chip (`36px x 36px` / `w-9 h-9`), background fill `#1e1e1e`.
- **Icon:** Stroke width `2.5`, white stroke (`text-white/90`), centered `16px` (`w-4 h-4`).
- **State:** Hover transitions to `#2c2c2c`, active scale `0.95`.

### Voice Orb (Visualizer)
- **Geometry:** Bounded circle `230px x 230px` with radial-gradient fill spanning `#a8c2ff` (center-top light) to `#3d4fad` (deep perimeter base).
- **Overlay:** Radial white specular highlight (`rgba(255,255,255,0.7)` with `mix-blend-overlay`) and an ambient blur backlight (`bg-blue-500/15 blur-2xl`).
- **Animation:** Subtle breathing loop (`subtlePulse 5s ease-in-out infinite`) scaling slightly (`1.025`) with dynamic glow intensity shifts.

### Pagination Indicators
- **Style:** Horizontal series of `6px x 6px` dots.
- **Active State:** Pure white `#ffffff`.
- **Inactive State:** Deep muted charcoal `#3a3a3c`.
- **Spacing:** `8px` (`space-x-2`).

### Top Navigation Bar
- **Structure:** Transparent header embedding native iOS status elements (clock, cell signal, Wi-Fi, battery) at `text-xs`/`text-sm` and a centered page title flanked by an offset dismiss action.