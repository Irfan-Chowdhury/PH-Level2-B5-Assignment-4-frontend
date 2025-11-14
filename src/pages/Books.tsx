import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, BookOpen, Eye } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useBorrowBookMutation,
} from "@/redux/features/books/books.api";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Books() {
  // const { data: books = [], isLoading, isError } = useGetBooksQuery();
  const [page, setPage] = useState(1);  
  const { data, isLoading, isError } = useGetBooksQuery({ page, limit: 10 });

  const books = data?.data || [];                 // book list
  const pagination = data?.pagination || {};      // pagination info


  const [deleteBook] = useDeleteBookMutation();
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowQty, setBorrowQty] = useState(1);
  const [borrowDue, setBorrowDue] = useState("");

  // --- Delete Book ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  // --- Borrow Book ---
  const handleBorrow = async () => {
    if (!selectedBook) return;

    if (borrowQty < 1) return toast.error("0 quantity not allowed.");
    else if(borrowQty > selectedBook.copies) return toast.error(`Only ${selectedBook.copies} copies available`)

    if (!borrowDue) return toast.error("Please select a due date");

    try {
      await borrowBook({
        book: selectedBook._id,
        quantity: borrowQty,
        dueDate: borrowDue,
      }).unwrap();

      toast.success(`Borrowed ${borrowQty} copy/copies of "${selectedBook.title}"`);
      setBorrowOpen(false);
      navigate("/borrow-summary");
    } catch (err) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">📚 All Books</h1>
        <Button asChild>
          <Link to="/create-book">➕ Add New Book</Link>
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Loading books...
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-red-600">
                  Failed to load books.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        book.copies > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {book.copies > 0 ? "Available" : "Unavailable"}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/books/${book._id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>

                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/edit-book/${book._id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(book._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      disabled={book.copies === 0}
                      onClick={() => {
                        setSelectedBook(book);
                        setBorrowQty(1);
                        setBorrowDue("");
                        setBorrowOpen(true);
                      }}
                      className="flex items-center gap-1"
                    >
                      <BookOpen className="w-4 h-4" />
                      {book.copies > 0 ? "Borrow" : "Unavailable"}
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center gap-4 mt-4">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ◀ Previous
          </Button>

          <span className="px-3 py-1 bg-gray-100 rounded">
            Page {page} of {pagination.totalPages}
          </span>

          <Button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ▶
          </Button>
      </div>

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
            <Button onClick={handleBorrow}>Confirm Borrow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
