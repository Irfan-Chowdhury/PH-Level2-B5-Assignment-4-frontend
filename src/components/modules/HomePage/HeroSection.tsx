import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { BookOpen, LibraryBig, ClipboardList, HandHeart } from "lucide-react";

export default function HeroSection() {
  // Static mock books
  const books = [
    {
      id: "1",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      genre: "Software Engineering",
      isbn: "978-0201616224",
      copies: 4,
      available: true,
      image:
        "https://cdn.kobo.com/book-images/f93b6f9a-13b7-4e12-9b62-6ee35cf1c4b1/1200/1200/False/the-pragmatic-programmer.jpg",
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      genre: "Programming",
      isbn: "978-0132350884",
      copies: 0,
      available: false,
      image:
        "https://cdn.kobo.com/book-images/43b8e7a7-b357-4a1e-bfb7-fbc5a0f7cb38/1200/1200/False/clean-code.jpg",
    },
    {
      id: "3",
      title: "Deep Learning with Python",
      author: "François Chollet",
      genre: "Artificial Intelligence",
      isbn: "978-1617294433",
      copies: 2,
      available: true,
      image:
        "https://cdn.kobo.com/book-images/f0df47a9-1784-40f1-bd2d-01ff90f7ef9d/1200/1200/False/deep-learning-with-python.jpg",
    },
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Manage Your Library with Ease
          </motion.h1>

          <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-100">
            A minimal system to organize books, manage borrows, and keep track
            of your collection — all in one place.
          </p>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-white text-sky-700 hover:bg-gray-100 font-semibold"
            >
              <Link to="/books">View All Books</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-sky-700 font-semibold"
            >
              <Link to="/create-book">Add New Book</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <LibraryBig className="mx-auto w-10 h-10 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Organize Collection</h3>
            <p className="text-gray-600">
              Keep every book catalogued by author, genre, and ISBN for quick
              access.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <BookOpen className="mx-auto w-10 h-10 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Borrowing</h3>
            <p className="text-gray-600">
              Borrow books seamlessly while the system tracks availability
              automatically.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <ClipboardList className="mx-auto w-10 h-10 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Borrow Summary</h3>
            <p className="text-gray-600">
              Get a quick overview of all borrowed books and total quantities at
              a glance.
            </p>
          </div>
        </div>
      </section>

      {/* Book List Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-10">
            Available Books
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-gray-50"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Genre:</span> {book.genre}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </p>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      book.available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.available
                      ? `Available (${book.copies} copies)`
                      : "Unavailable"}
                  </p>

                  {/* Borrow Action */}
                  <div className="flex justify-center mt-5">
                    <Button
                      size="sm"
                      className="bg-sky-600 hover:bg-sky-700 flex items-center gap-1"
                      disabled={!book.available}
                    >
                      <Link
                        to={`/borrow/${book.id}`}
                        className="flex items-center gap-1"
                      >
                        <HandHeart className="w-4 h-4" /> Borrow
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
