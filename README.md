# The St. Valentine Heritage Commission

A high-fidelity digital invitation system inspired by **heritage luxury and old-money restraint**.  
This project intentionally rejects playful, disposable Valentine aesthetics in favor of a **formal, editorial, and quietly opulent** design language.

Live Demo: [Your Vercel Link Here]

---

## Design Philosophy — *Luxe Noir & Old Money*

The project is grounded in **Stealth Wealth UX**: elegance communicated through restraint, proportion, and materiality rather than overt decoration.

### Visual Language

**Typography**  
High-contrast serif typography (Playfair Display) evokes printed editorials, archival letters, and bespoke stationery.

**Color Palette**  
- Ivory — `#FDFBF7` (primary canvas)  
- Forest Green — `#16302B` (structure and authority)  
- Garnet Red — `#8B0000` (emotion, tension, intent)

**Layout & Architecture**  
- Sharp geometry (2px radius)  
- Deliberate whitespace  
- Print-inspired spacing and hierarchy  
Designed to feel closer to a hand-delivered envelope than a modern web app.

---

## Core Technical Features

### 1. Tension-Based Interaction Engine (Multi-Sensory)

The interface introduces controlled psychological tension through synchronized sensory feedback when the user interacts with the **Decline** action.

**Haptics**  
Uses the `navigator.vibrate` API to simulate a physical heartbeat.

**Audio Acceleration**  
Heartbeat audio playback speed dynamically increases using `Howl.rate()`, producing a compounding urgency effect.

**Visual Pulse**  
A Garnet Red vignette animates via CSS, pulsing in phase with the audio rate to reinforce emotional escalation.

This creates a unified sensory response rather than isolated effects.

---

### 2. Bilateral Identity Logic

The system models the interaction as a **two-party contract**, not a one-sided message.

- Sender (`from`) and Recipient (`to`) are both encoded
- The success state generates a possessive declaration:
  ```
  “Oyinda is officially Toheeb’s for the season.”
  ```

This framing shifts the experience from “card acceptance” to **mutual acknowledgement**.

---

### 3. Stateless Deep-Link Architecture

The application is entirely backend-less.

All state is persisted through `URLSearchParams`, enabling:

- Instant shareability  
- Zero database latency  
- No server-side storage  
- Privacy-first interactions  
- Infinite horizontal scalability  

Each link is a complete, self-contained session.

---

### 4. Living 3D Environment

The background environment is built with `@react-three/fiber`, producing a subtle but constantly evolving atmosphere.

**Visual Elements**
- “Liquid Silk” orbs
- Noise-driven vertex distortion
- `MeshDistortMaterial` for organic motion

The scene behaves as a slow, breathing system rather than a static background.

---

## Technology Stack

- **React 18** — Application logic and state
- **Framer Motion** — Coordinated micro- and macro-animations
- **Three.js / React Three Fiber** — Procedural 3D environment
- **Howler.js** — Web audio and dynamic playback control
- **Lucide React** — Minimalist iconography
- **Canvas-Confetti** — Physics-based celebratory effects

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/heritage-valentine.git
cd heritage-valentine
```

Install dependencies:

```bash
npm install three @types/three @react-three/fiber @react-three/drei framer-motion howler canvas-confetti lucide-react
```

Run the development server:

```bash
npm run dev
```

---

## Author

**Toheeb Ogunade**  
Computer Science  
University of Lagos

---

## Closing Note

This project is not designed to be “cute.”  
It is designed to feel **intentional, formal, and emotionally weighted**—a digital artifact that behaves more like a signed letter than a web interaction.

