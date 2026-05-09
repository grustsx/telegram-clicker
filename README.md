# Tortik Clicker

Production-like fullstack idle/clicker game built with React, TypeScript, Node.js and Telegram Web Apps API.

The project includes:

- scalable frontend architecture based on Feature-Sliced Design (FSD)
- Node.js + Express backend
- PostgreSQL database
- Telegram bot integration
- persistent player progression
- custom game economy and progression systems
- original soundtrack and audio system

---

# Preview

<table>
  <tr>
    <td align="center">
      <img src="./readme/buildings.gif" height="667" alt="buildings"/>
    </td>
    <td align="center">
        <img src="./readme/main.gif" height="667" alt="main"/>
    </td>
    <td align="center">
        <img src="./readme/skills.gif" height="667" alt="skills"/>
    </td>
  </tr>
</table>

---

# Features

## Frontend

- Feature-Sliced Design architecture
- Redux Toolkit + memoized selectors
- normalized entities via `createEntityAdapter`
- typed async flows
- responsive pixel-art UI
- parallax skill tree
- drag-scroll navigation
- optimized derived state calculations

## Backend

- Node.js + Express REST API
- PostgreSQL relational database
- JWT authentication
- Telegram WebApp authorization
- persistent game state
- player progression synchronization

## Gameplay

- buildings and passive income
- spells and cooldown mechanics
- boosters system
- branching skill tree
- economy balancing
- progression systems

## Additional

- custom soundtrack written specifically for the game
- deployed production build
- real users and persistent saves

---

# Tech Stack

## Frontend

- React
- TypeScript
- Redux Toolkit
- TailwindCSS
- Vite

## Backend

- Node.js
- Express
- PostgreSQL

## Integrations

- Telegram Web Apps API
- Telegram Bot API

---

# Architecture

The frontend is structured using Feature-Sliced Design:

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

### Key architectural decisions

- separation of business logic and UI
- modular domain entities
- derived state through selectors
- scalable public API boundaries
- infrastructure isolation
- normalized entity storage

---

# Database

Core entities:

```txt
users
buildings
skills
spells
boosters

user_buildings
user_skills
user_spells
user_boosters
```

The database stores persistent progression and synchronizes player state between Telegram WebApp sessions.

---

# Local Development

## Environment Setup

Create `.env.local` in the project root.

Copy values from `.env.production` and change:

```env
VITE_IS_DEV=true
```

---

## Start Development Server

```bash
npm install
npm run dev
```

---

# Versioning

Patch version:

```bash
npm version 2.2.8 -m "chore(release): %s"
```

Minor version:

```bash
npm version minor -m "chore(release): %s"
```

Major version:

```bash
npm version major -m "chore(release): %s"
```

---

# Engineering Challenges

- designing scalable game state architecture
- avoiding circular dependencies during FSD refactor
- optimizing derived selectors
- implementing Telegram authorization flow
- balancing progression systems
- synchronizing frontend state with persistent backend storage

---

# Future Improvements

- achievements system
- multiplayer events
- audio settings
- different skins
- mobile performance optimizations
- game balance
- more content
