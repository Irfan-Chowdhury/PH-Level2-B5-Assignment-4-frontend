# 📚 Library Management System

> A clean and fully functional **library management application** built with **React + TypeScript + Redux Toolkit Query (RTK Query)** for the frontend, and **Node.js + Express + MongoDB (Mongoose)** for the backend.  
> The system allows users to manage books, perform CRUD operations, borrow books, and view borrow summaries — all through a minimal and responsive UI.

---

## 🚀 Live Demo

- **Frontend:** [https://your-frontend-link.vercel.app](#)
- **Backend:** [https://your-backend-link.onrender.com/api](#)
- **GitHub Repositories:**
  - [Frontend Repo](#)
  - [Backend Repo](#)

---

## 🧩 Project Overview

This project is a **Minimal Library Management System** developed as part of a full-stack practical assignment.  
It demonstrates modular frontend-backend integration, RESTful API communication, and a clean architecture with real-world business logic.

**Key Focus Areas:**
- Strong separation of concerns (Frontend ↔ Backend)
- State management using **Redux Toolkit Query**
- Scalable, modular, and type-safe code structure
- Simple, elegant UI powered by **Tailwind CSS**

---

## ✨ Features

### 📖 Book Management
- Add, edit, and delete books.
- Each book includes: title, author, genre, ISBN, description, and available copies.
- Automatic availability update — if copies reach 0, the book becomes *Unavailable*.
- Real-time UI updates via RTK Query cache invalidation.

### 💼 Borrow Management
- Borrow books directly from the book list or details page.
- Enter quantity and due date before confirming.
- Business logic ensures borrowing cannot exceed available copies.
- Updates copies count dynamically in the UI.
- Displays a success notification after successful borrow.

### 📊 Borrow Summary
- Aggregated list of all borrowed books.
- Shows **Book Title**, **ISBN**, and **Total Quantity Borrowed**.
- Data fetched via backend aggregation API.

### 🖥️ Interface Overview
| Page | Path | Description |
|------|------|-------------|
| **Book List** | `/books` | Displays all books with CRUD + borrow actions |
| **Add Book** | `/create-book` | Form to add new books |
| **Book Details** | `/books/:id` | Detailed info for a single book |
| **Edit Book** | `/edit-book/:id` | Full-page form to edit existing book |
| **Borrow Summary** | `/borrow-summary` | Displays total borrowed books with quantities |

---

## 🧠 Tech Stack

### 🖥️ Frontend
- **React + TypeScript**
- **Redux Toolkit Query (RTK Query)** for state and API management
- **Tailwind CSS** for responsive styling
- **Lucide React** icons
- **Sonner** for toast notifications
- **Framer Motion** for smooth animations

### ⚙️ Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **MVC Architecture (Modular)**
- RESTful API with clean controller-service design

---

## 🧾 API Endpoints (Backend)

### 📚 Books
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/books` | Get all books |
| `GET` | `/api/books/:id` | Get single book by ID |
| `POST` | `/api/books` | Add new book |
| `PUT` | `/api/books/:id` | Update existing book |
| `DELETE` | `/api/books/:id` | Delete book |

### 📦 Borrow
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/borrow` | Borrow a book (includes quantity & due date) |
| `GET` | `/api/borrow` | Get borrow summary (aggregated total per book) |

---

## 🧩 Core Logic Highlights

### ✅ Borrow Functionality
- Validates quantity before borrowing.
- Automatically decrements copies in inventory.
- If copies = 0 → updates `available = false`.

### ✅ RTK Query Setup
- Each CRUD operation automatically **invalidates cache**.
- Uses `transformResponse` for clean and typed data handling.

### ✅ UI Enhancements
- Responsive layouts with Tailwind.
- Real-time feedback with toast messages.
- Dialog modals for Add/Edit/Borrow actions.

---

## 📂 Folder Structure (Frontend)

```txt
src/
├── components/
│ ├── ui/ # Reusable UI components (Button, Input, Dialog)
├── pages/
│ ├── Books.tsx # List + CRUD actions
│ ├── AddBook.tsx # Create new book
│ ├── BookDetails.tsx # Single book view
│ ├── EditBook.tsx # Edit existing book
│ ├── BorrowSummary.tsx# Borrow summary table
├── redux/
│ ├── api/
│ │ └── apiSlice.ts # Base RTK Query config
│ └── features/
│ └── books/
│ └── books.api.ts # Book + Borrow API endpoints
├── App.tsx
└── main.tsx
```



---

## ⚙️ Installation & Setup

### 🖥️ Frontend Setup
```bash
git clone git@github.com:Irfan-Chowdhury/PH-Level2-B5-Assignment-4-frontend.git
cd minimal-library-frontend
npm install
npm run dev


