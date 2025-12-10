# ErrorsTracer Dashboard

A modern, high-performance web application built with **Next.js**, **Redux Toolkit**, **TailwindCSS**, and **Bun** for managing organizations, applications, and error logs in the ErrorsTracer platform.

---

## 🚀 Overview

The ErrorsTracer frontend provides an intuitive user interface that allows users to:

- Create and manage **organizations**
- Invite team members
- Create and manage **applications** with dev/prod credentials
- Monitor **real-time error logs**
- Manage profile, settings, and integrations
- Interact with the backend (NestJS + PostgreSQL)
- Connect with official NPM client SDKs for automatic error reporting

---

## 🛠️ Tech Stack

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| **Next.js**       | Core frontend framework   |
| **Redux Toolkit** | Global state management   |
| **TailwindCSS**   | Styling and UI components |
| **TypeScript**    | Static typing             |
| **Axios**         | API communication         |
| **Bun**           | Package manager + runtime |

---

## 📁 Project Structure

```
errors-tracer-frontend/
│
└── src/
    ├── app/              # Next.js App Router (all pages)
    ├── components/       # Reusable UI components
    ├── hooks/            # Custom hooks
    ├── layout/           # Layout components
    ├── lib/              # Utilities and helpers
    ├── services/         # API services + Redux Toolkit store/slices
    └── ts/               # Global TypeScript types
│
├── public/               # Static assets
├── tailwind.config.js
├── next.config.ts
├── postcss.config.mjs
├── README.md
└── package.json

```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git  clone  https://github.com/errorstracer/dashboard.git
```

### 2. Install dependencies (using Bun)

```bash
bun  install
```

### 3. Create the environment file

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## ▶️ Running the App

### Development

```bash
bun  dev
```

App will run at:
👉 http://localhost:3000

### Production Build

```bash
bun  run  build
bun  start
```

---

## 🗄️ **Backend Repository**

ErrorsTracer Backend (NestJS + PostgreSQL):  
👉 **https://github.com/errorstracer/backend**

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

Please follow project linting and formatting rules.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find the project useful:

- Star ⭐ the repo
- Report issues 🐛
- Contribute improvements 🤝
