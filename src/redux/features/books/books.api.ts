import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ TypeScript interface for Book
export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ RTK Query API configuration
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl
  }),
  tagTypes: ["Books"],

  endpoints: (builder) => ({
    // --------------------------
    // 1️⃣ Get All Books
    // --------------------------
    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "books",
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: Book[] }) => response.data,
      providesTags: ["Books"],
    }),

    // --------------------------
    // 2️⃣ Get Single Book by ID
    // --------------------------
    getBookById: builder.query<Book, string>({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: Book }) => response.data,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    // --------------------------
    // 3️⃣ Create New Book
    // --------------------------
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // --------------------------
    // 4️⃣ Update Book by ID
    // --------------------------
    updateBook: builder.mutation<Book, { id: string; body: Partial<Book> }>({
      query: ({ id, body }) => ({
        url: `books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Books"],
    }),

    // --------------------------
    // 5️⃣ Delete Book by ID
    // --------------------------
    deleteBook: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // --------------------------
    // Borrow Books
    // --------------------------
    borrowBook: builder.mutation<{ success: boolean; message: string },{ book: string; quantity: number; dueDate: string }> ({
      query: (body) => ({
        url: "borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"], // to refresh available copies
    }),

    // --------------------------
    // Borrow Books List history
    // --------------------------


  getBorrowSummary: builder.query<{
        totalQuantity: number;
        book: { title: string; isbn: string };
      }[],
      void>({
      query: () => ({ 
        url: "borrow", 
        method: "GET" 
      }),
      transformResponse: (response: any) => response.data, // return the array itself
    })
  })
  
});

// ✅ Export auto-generated hooks
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;
