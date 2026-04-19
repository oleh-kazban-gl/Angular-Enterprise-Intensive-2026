# Angular Enterprise Training Project

[![CI](https://github.com/oleh-kazban-gl/Angular-Enterprise-Intensive-2026/actions/workflows/ci.yaml/badge.svg)](https://github.com/oleh-kazban-gl/Angular-Enterprise-Intensive-2026/actions/workflows/ci.yaml)

This repository contains the training project used in the **Angular Enterprise Intensive Course**.

The goal of this project is not to recreate a real product, but to provide a **controlled engineering sandbox** for learning Angular architecture and enterprise frontend practices.

---

# Project Purpose

The application simulates a simplified **social media feed platform** and is intentionally designed to demonstrate real-world frontend engineering concepts.
<img width="1159" height="941" alt="image" src="https://github.com/user-attachments/assets/a1e8e43e-2b02-4df0-9111-a43e3bd51284" />

Throughout the course we will incrementally implement and refine different parts of the application in order to explore:

- Angular architecture patterns
- Reactive programming with RxJS
- State management with NgRx
- Dependency Injection and service architecture
- Routing and guards
- Reactive forms and validation
- Feature modularization
- Workspace architecture using Nx

The project acts as a **learning environment where architectural decisions are more important than the UI itself**.

---

# Learning Goals

The main objective of this repository is to help developers understand how to build **scalable Angular applications**.

During the course we will focus on:

- structured application architecture
- clear separation of concerns
- dependency management
- reactive data flow
- maintainable code organization
- enterprise-level tooling

The UI exists primarily as a way to demonstrate these engineering concepts.

---

# Technology Stack

The project uses a modern Angular ecosystem commonly found in enterprise environments.

Core technologies include:

- Angular
- TypeScript
- RxJS
- NgRx
- Nx (monorepo tooling)
- Angular Material

---

# Backend Simulation

During the course the backend will be simulated using **json-server**.

This allows the frontend to work with a real HTTP API without requiring a fully implemented backend.

The goal is to keep the frontend code **close to production conditions** while maintaining a lightweight setup.

---

# Project Structure

The project is organized as an **Nx workspace**, which allows us to structure the application using libraries and clearly defined architectural boundaries.

Typical workspace structure:

- apps/
- libs/
- tools/
- nx.json
- tsconfig.base.json

Applications act as entry points, while most of the functionality is implemented inside reusable libraries.

## Library Documentation

### Data Access

| Library | Description |
| --- | --- |
| [data-access-auth](libs/data-access-auth/README.md) | NgRx auth state: login, signup, token, user |
| [data-access-create-post](libs/data-access-create-post/README.md) | NgRx state for post creation |
| [data-access-posts](libs/data-access-posts/README.md) | NgRx feed state: pagination, likes, comments |
| [data-access-profile](libs/data-access-profile/README.md) | NgRx profile state: load and update |
| [data-access-settings](libs/data-access-settings/README.md) | NgRx settings state: available languages |

### Features

| Library | Description |
| --- | --- |
| [feature-auth](libs/feature-auth/README.md) | Sign-in, sign-up, and sign-out pages |
| [feature-create-post](libs/feature-create-post/README.md) | Post creation form with image upload |
| [feature-feed](libs/feature-feed/README.md) | Paginated posts feed |
| [feature-navmenu](libs/feature-navmenu/README.md) | App shell: sidebar nav and breadcrumbs |
| [feature-not-found](libs/feature-not-found/README.md) | 404 page |
| [feature-post](libs/feature-post/README.md) | Single post detail view |
| [feature-post-card](libs/feature-post-card/README.md) | Post card component (likes, comments, carousel) |
| [feature-profile](libs/feature-profile/README.md) | Profile view and edit page |
| [feature-settings](libs/feature-settings/README.md) | Language and theme settings page |

### UI & Utilities

| Library | Description |
| --- | --- |
| [ui-components](libs/ui-components/README.md) | Shared dumb components: card, carousel, uploader, dialog, spinner |
| [pipes](libs/pipes/README.md) | Custom Angular pipes (`formatBytes`) |
| [util-forms](libs/util-forms/README.md) | Reactive form helpers: error extraction, change detection |
| [util-ngrx](libs/util-ngrx/README.md) | Shared NgRx types: `CallState`, `getError` |
| [util-services](libs/util-services/README.md) | App-wide services: HTTP, storage, theme, i18n, notifications |

---

# Development Environment

Before running the project make sure the development environment is configured.

Required tools:

- Node.js
- pnpm
- Git

See the setup guide:

[setup.md](setup.md)

See the NX commands:

[nx.md](nx.md)

See the Nx workspace guide:

[readme-workspace.md](readme-workspace.md)

---

# Running the Project

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm nx serve instaglam
```

or

```bash
pnpm start
```

---

# Available Scripts

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm start`         | Start the Angular dev server         |
| `pnpm start:api`     | Start the json-server mock API       |
| `pnpm test`          | Run all tests                        |
| `pnpm test:affected` | Run tests for affected projects only |
| `pnpm lint`          | Lint all projects                    |
| `pnpm lint:affected` | Lint affected projects only          |
| `pnpm analyze`       | Build and open bundle size treemap   |
| `pnpm dep-graph`     | Open Nx dependency graph             |
| `pnpm docker:build`  | Build the Docker image               |
| `pnpm docker:run`    | Run the Docker container on port 4200|
| `pnpm docker:up`     | Build and start with Docker Compose  |
| `pnpm docker:down`   | Stop and remove Docker Compose stack |

---

# Official Resources

| Technology       | Documentation                       |
| ---------------- | ----------------------------------- |
| Angular          | https://angular.dev                 |
| TypeScript       | https://www.typescriptlang.org/docs |
| RxJS             | https://rxjs.dev                    |
| NgRx             | https://ngrx.io/docs                |
| Nx               | https://nx.dev/docs                 |
| Angular Material | https://material.angular.io         |
| ESLint           | https://eslint.org/docs/latest      |
| Prettier         | https://prettier.io/docs/en         |
| webpack          | https://webpack.js.org/concepts     |
