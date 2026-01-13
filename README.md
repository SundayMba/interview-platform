# Interview Platform

**Overview**

- **Purpose:** Monorepo with `backend` and `frontend` folders for the interview platform.

**Prerequisites**

- **Node:** v16+ recommended.
- **npm:** comes with Node; or use `pnpm`/`yarn` if you prefer.

**Quick Setup**

- **Install backend deps:**

```bash
cd backend
npm install
```

- **Install frontend deps:**

```bash
cd frontend
npm install
```

**Development**

- **Backend (recommended):** add a `dev` script in `backend/package.json` (example):

```json
"scripts": {
  "dev": "nodemon src/server.js"
}
```

Install `nodemon` as a dev dependency:

```bash
cd backend
npm install --save-dev nodemon
# or globally
npm install -g nodemon
```

Run backend in dev mode:

```bash
cd backend
npm run dev
```

- **Frontend (typical Vite):**

```bash
cd frontend
npm run dev
```

**Build**

- **Backend:**

```bash
cd backend
npm run build
```

- **Frontend:**

```bash
cd frontend
npm run build
```

**Useful Commands**

- **Create Vite app (one-off):**

```bash
npx create-vite@latest my-app
# or with npm
npm init vite@latest my-app
```

- **Git: add remote and push main:**

```bash
git remote add origin git@github.com:SundayMba/interview-platform.git
git branch -M main
git push -u origin main
```

**Notes**

- Run package installs per-folder; there is no root `node_modules` unless you set up a workspace.
- Running `npx` or `npm init` executes remote package code — only use trusted packages.

---

If you want, I can:

- run the installs for you,
- add the `dev` script to `backend/package.json` and install `nodemon`, or
- create a simple `.env.example` and commit the README.
