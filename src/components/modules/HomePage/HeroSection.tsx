import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  BookOpen,
  LibraryBig,
  ClipboardList,
  HandHeart,
} from "lucide-react";
import {
  useGetBooksQuery,
  useBorrowBookMutation,
} from "@/redux/features/books/books.api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const navigate = useNavigate();
  // const { data: books = [], isLoading, isError } = useGetBooksQuery();
  const [page, setPage] = useState(1);  
  const { data, isLoading, isError } = useGetBooksQuery({ page, limit: 10 });
  const books = data?.data || [];                 // book list

  const [borrowBook, { isLoading: borrowing }] = useBorrowBookMutation();

  // --- Borrow Modal State ---
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [borrowQty, setBorrowQty] = useState(1);
  const [borrowDue, setBorrowDue] = useState("");

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/2232/2232688.png";

  // --- Sort newest first ---
  const sortedBooks = [...books].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // --- Borrow Modal Handler ---
  const openBorrowModal = (book: any) => {
    setSelectedBook(book);
    setBorrowQty(1);
    setBorrowDue("");
    setBorrowOpen(true);
  };

  // --- Confirm Borrow ---
  const handleBorrow = async () => {
    if (!selectedBook) return;
    
    if (borrowQty < 1) return toast.error("0 quantity not allowed.");
    else if(borrowQty > selectedBook.copies) return toast.error(`Only ${selectedBook.copies} copies available`)

    if (!borrowDue) return toast.error("Please select a due date");

    try {
      await borrowBook({
        book: selectedBook._id, // matches your RTK definition
        quantity: borrowQty,
        dueDate: borrowDue,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      setBorrowOpen(false);
      setSelectedBook(null);
      navigate("/borrow-summary");
    } catch (err) {
      toast.error("Failed to borrow. Try again!");
    }
  };

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
              className="bg-white text-sky-700 hover:bg-gray-100 font-semibold"
            >
              <Link to="/create-book">Add New Book</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <LibraryBig className="mx-auto w-10 h-10 text-sky-600 mb-4" />,
              title: "Organize Collection",
              desc: "Keep every book catalogued by author, genre, and ISBN for quick access.",
            },
            {
              icon: <BookOpen className="mx-auto w-10 h-10 text-sky-600 mb-4" />,
              title: "Easy Borrowing",
              desc: "Borrow books seamlessly while the system tracks availability automatically.",
            },
            {
              icon: (
                <ClipboardList className="mx-auto w-10 h-10 text-sky-600 mb-4" />
              ),
              title: "Borrow Summary",
              desc: "Get a quick overview of all borrowed books and total quantities at a glance.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book List Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-10">
            Available Books
          </h2>

          {isLoading && (
            <p className="text-center text-gray-500">Loading books...</p>
          )}
          {isError && (
            <p className="text-center text-red-500">
              Failed to fetch books. Please try again later.
            </p>
          )}
          {!isLoading && !isError && sortedBooks.length === 0 && (
            <p className="text-center text-gray-500">
              No books found. Add a new one to get started!
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {sortedBooks.map((book: any) => (
              <div
                key={book._id}
                className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-gray-50"
              >
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 font-semibold text-lg">
                    {book.title || "Untitled Book"}
                  </div>
                )}
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Author:</span>{" "}
                    {book.author || "Unknown"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Genre:</span>{" "}
                    {book.genre || "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">ISBN:</span>{" "}
                    {book.isbn || "N/A"}
                  </p>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      book.copies > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.copies > 0
                      ? `Available (${book.copies} copies)`
                      : "Unavailable"}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-center gap-3 mt-5">
                    <Button
                      size="sm"
                      className="bg-sky-600 hover:bg-sky-700 flex items-center gap-1"
                      disabled={book.copies <= 0}
                      onClick={() => openBorrowModal(book)}
                    >
                      <HandHeart className="w-4 h-4" /> Borrow
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Borrow Book Modal --- */}
      <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-3">
              <p className="font-medium">Book: {selectedBook.title}</p>
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                max={selectedBook.copies}
                value={borrowQty}
                onChange={(e) => setBorrowQty(Number(e.target.value))}
              />
              <Label>Due Date</Label>
              <Input
                type="date"
                value={borrowDue}
                onChange={(e) => setBorrowDue(e.target.value)}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleBorrow} disabled={borrowing}>
              {borrowing ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
