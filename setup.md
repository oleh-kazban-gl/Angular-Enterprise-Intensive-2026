# Development Environment Setup

Before starting the course, make sure your local development environment is properly configured.

This course uses the following tools:

- Node.js
- pnpm
- Angular CLI
- Git
- Visual Studio Code (recommended)

Follow the steps below.

---

# 1. Install Node.js

Download the **LTS version** of Node.js:

https://nodejs.org

Recommended version:
```Node.js 22+```

Verify installation:
```node -v```

You should see something similar to:
```v22.x.x```

Verify NPM installation:
```npm -v```

You should see something similar to:
```11.x.x```

# 2. Install pnpm
This course uses pnpm as the package manager.
Install it globally:

```npm install -g pnpm```

Verify installation:

```pnpm -v```

# 3. Install Git

Download Git:

```https://git-scm.com```

Verify installation:

```git --version```

# 4. IDE
- VS Code + Extensions ```https://code.visualstudio.com```

  Recommended extensions:

  - Angular Language Service
  - ESLint
  - Prettier
  - NX Console
  - Jest/Vitest runner


- MS Visual Studio
- IDEA/WebStorm

# 5. Clone the Course Repository

Clone the repository:

```git clone <repository-url>```

Navigate to the project folder:

```cd <repository-folder>```

Install dependencies:

```pnpm install```

# 6. Verify the Workspace

Run:

```pnpm nx graph```

If everything is configured correctly, Nx will open the dependency graph in your browser.

# 7. Troubleshooting
- Node version issues

  Check Node version:

  ```node -v```

  Upgrade if necessary.

- pnpm not found

  Restart your terminal after installing pnpm.

- Permission issues (macOS/Linux)

  Try installing pnpm using:

  ```sudo npm install -g pnpm```
 
# You're Ready

Your environment is now ready for the course.

You can proceed with the first module.
