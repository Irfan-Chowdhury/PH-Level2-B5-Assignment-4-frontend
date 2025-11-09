import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import Unauthorized from "@/pages/Unauthorized";

import Homepage from "@/pages/Homepage";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import AddBook from "@/pages/AddBook";
import BookDetails from "@/pages/BookDetails";
import EditBook from "@/pages/EditBook";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: Books,
        path: "books"
      },
      {
        Component: AddBook,
        path: "create-book"
      },
      {
        Component: BookDetails,
        path: "books/:id"
      },
      {
        Component: EditBook,
        path: "edit-book/:id"
      },
      {
        Component: BorrowSummary,
        path: "borrow-summary"
      },
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  }
]);





// Backend : 
// Repository : https://github.com/Irfan-Chowdhury/PH-Level2-B5-Assignment-5
// Live Link : https://digital-wallet-api-blush.vercel.app


// Frontend : 
// Repository : https://github.com/Irfan-Chowdhury/PH-Level2-B5-Assignment-6-frontend
// Live Link : digital-wallet-frontend-chi.vercel.app
