# Angular Enterprise Training Project

This repository contains the training project used in the **Angular Enterprise Intensive Course**.

The goal of this project is not to recreate a real product, but to provide a **controlled engineering sandbox** for learning Angular architecture and enterprise frontend practices.

---

# Project Purpose

The application simulates a simplified **social media feed platform** and is intentionally designed to demonstrate real-world frontend engineering concepts.

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
- Flex Layout

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

---

# Development Environment

Before running the project make sure the development environment is configured.

Required tools:

- Node.js
- pnpm
- Git

See the setup guide:

SETUP.md

See the NX commands:

NX.md

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
