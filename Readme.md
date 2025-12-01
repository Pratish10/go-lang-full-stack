# Full-Stack Project Documentation

A complete guide for developers to **clone**, **set up**, and **run** both the **backend (Go + Gin + MongoDB)** and **frontend (Next.js + Zustand + Shadcn/UI)**.

---

# Overview

This repository contains a full‑stack application built with:

### **Backend (API Server)**

- Go (Golang)
- Gin Web Framework
- PostgreSQL
- JWT Authentication
- Middleware (Auth, Logging)
- Modular folder structure

### **Frontend (Web App)**

- Next.js (App Router)
- TypeScript
- Zustand (Global Auth Store)
- TailwindCSS + Shadcn UI
- React Hook Form + Zod
- MSW (Mock Service Worker) for tests
- Jest + Testing Library

---

# Project Structure

```
go lang full stack/
├── go backend/
│   ├── config/
│   │   ├── auth-key.go
│   │   ├── database.go
│   │   └── response.go
│   ├── controllers/
│   │   ├── auth.go
│   │   └── user.go
│   ├── go.mod
│   ├── go.sum.sum
│   ├── helpers/
│   │   └── token.go
│   ├── main.go
│   ├── middleware/
│   │   └── auth.go
│   ├── models/
│   │   └── user.go
│   ├── routes/
│   │   └── routes.go
│   └── tests/
│       ├── auth_test.go
│       └── user_test.go
├── Readme.md
└── ui/
    ├── app/
    │   ├── dashboard/
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── page.tsx
    │   └── register/
    │       └── page.tsx
    ├── components/
    │   ├── auth/
    │   │   ├── login.tsx
    │   │   └── register.tsx
    │   ├── dashboard/
    │   │   ├── edit-profile-dialog.tsx
    │   │   └── profile-card.tsx
    │   ├── SharedComponent/
    │   │   └── FormInputField.tsx
    │   └── ui/
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── form.tsx
    │       ├── input.tsx
    │       └── label.tsx
    ├── components.json.json
    ├── Entities/

    ├── eslint.config.mjs
    ├── jest.config.js
    ├── jest.setup.ts
    ├── lib/
    │   ├── store/
    │   │   └── auth-store.ts
    │   ├── utils.ts
    │   └── validation/
    │       └── auth-validation.ts
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── public/
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── README.md
    ├── tests/
    │   ├── edit-profile-dialog.test.tsx
    │   ├── login.test.tsx
    │   ├── mocks/
    │   │   ├── handlers.ts
    │   │   └── server.ts
    │   ├── profile-card.test.tsx
    │   └── register.test.tsx
    ├── tsconfig.json
    ├── tsconfig.test.json
    └── types/
        └── types.ts
```

---

# Getting Started

Below are the steps to run the backend and frontend on your system.

---

# Backend Setup (Go + Gin)

## 1. Install Dependencies

Make sure you have:

- Go 1.21+
- MongoDB Compass

Install Go packages:

```bash
cd backend
go mod tidy
```

---

## ▶2. Start Backend Server

```bash
go run main.go
```

Backend will run at:

```
http://localhost:8080
```

---

# Frontend Setup (Next.js)

## 1. Install Dependencies

```bash
cd ui
pnpm install
```

---

## 2. Run Frontend

```bash
pnpm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# Testing (Frontend)

### MSW + Jest + Testing Library

To run tests:

```bash
pnpm test
```

Make sure `jest.setup.ts` contains:

```ts
import "@testing-library/jest-dom";
```

# Testing (Backend)

### MSW + Jest + Testing Library

To run tests:

```bash
go tests .\tests\auth_test.go
go tests .\tests\user_test.go
```

Make sure `jest.setup.ts` contains:

```ts
import "@testing-library/jest-dom";
```

# Authentication Flow

1. User signs in via frontend `/login`
2. API returns a JWT token
3. Token is stored in Zustand store
4. Protected routes send JWT through `Authorization: Bearer <token>`
5. Gin middleware validates JWT and authorizes the request

---

# API Endpoints

### **Auth Routes**

```
POST /register
POST /login
```

### **User Routes**

```
GET  /profile/:id
PUT  /users/:id
```

---

# 🛠 Tech Stack

### Backend

- Go + Gin
- MongoDB
- JWT
- GORM

### Frontend

- Next.js (App Router)
- Zustand
- TailwindCSS
- Shadcn UI
- MSW
- Jest

---

# Folder Breakdown

### Backend Key Files

```
controllers/  → business logic
middleware/   → JWT + Auth helpers
models/       → database models
routes/       → API routing
helpers/      → token generation, hashing
```

### Frontend Key Files

```
app/          → Next.js app router pages
components/   → UI components
lib/          → API utilities
store/        → Zustand auth store
tests/        → MSW + Jest tests
```

---
