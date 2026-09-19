# ✦ Interactive 3D Portfolio

A modern, immersive **dark portfolio website** built with React, TypeScript, Tailwind CSS, GSAP, Framer Motion, and HLS video. The portfolio focuses on smooth animations, cinematic visuals, interactive project cards, and a premium minimal UI.

## 🚀 Live Portfolio

> Add your deployed portfolio URL here

## 👨‍💻 About

This portfolio is designed to showcase my projects, experience, skills, creative work, and professional profiles through an interactive visual experience.

The website combines **cinematic background video, motion effects, 3D card interactions, smooth scrolling, and responsive layouts** to create an engaging portfolio experience.

## ✨ Features

- 🎬 Full-screen HLS background video
- ⏳ Animated loading screen with progress counter
- 🖱️ Interactive mouse-follow cursor
- 💡 Mouse-following glow / spotlight effect
- 🌀 3D mouse-based project card tilt
- 🔄 Project cards flip **180° on hover**
- 📖 Project explanation displayed on the back of each card
- ✨ Framer Motion reveal animations
- 🎞️ GSAP entrance and scroll animations
- 📱 Fully responsive design
- 🌑 Modern dark theme
- 🧊 Glassmorphism navigation bar
- 🧩 Bento-style project grid
- 📓 Journal / thoughts section
- 🎨 Parallax explorations gallery
- 📊 Animated statistics section
- 🔁 Infinite GSAP marquee
- 📩 Contact / email CTA
- 🔗 Social media integration
- ⚡ Smooth navigation and page transitions

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React | UI development |
| TypeScript | Type-safe development |
| Vite | Development & build tooling |
| Tailwind CSS | Styling and responsive layouts |
| GSAP | Advanced animations and scroll effects |
| Framer Motion | UI transitions and reveal animations |
| hls.js | HLS background video |
| React Router | Navigation |
| tailwindcss-animate | Utility animations |

## 🎨 Design System

The portfolio uses a dark visual system with subtle blue gradients.

### Fonts

- **Inter** — body text
- **Instrument Serif** — display headings and italic typography

### Color Palette

```css
--bg: 0 0% 4%;
--surface: 0 0% 8%;
--text: 0 0% 96%;
--muted: 0 0% 53%;
--stroke: 0 0% 12%;
--accent: 0 0% 96%;
```

### Accent Gradient

```css
linear-gradient(90deg, #89AACC 0%, #4E85BF 100%);
```

## 🖱️ Interactive Project Cards

One of the main interactions of the portfolio is the project showcase.

When the user moves the mouse over a project card:

1. The card reacts to the mouse position.
2. A subtle **3D tilt** is applied.
3. A blue ambient glow follows the cursor.
4. The project card flips **180°**.
5. The back side reveals additional project information.
6. When the mouse leaves, the card smoothly returns to its original state.

This interaction is implemented using CSS 3D transforms and JavaScript pointer coordinates.

## 🎞️ Background Video

The hero and footer use an HLS video stream.

`hls.js` is used for browsers that do not provide native HLS playback, while native HLS support is used when available.

```ts
if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoUrl);
  hls.attachMedia(video);
}
```

## 📂 Project Sections

The portfolio contains the following major sections:

### Hero

- Animated introduction
- Dynamic role
