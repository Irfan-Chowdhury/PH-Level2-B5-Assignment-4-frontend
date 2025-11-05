import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, BookOpen, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/redux/features/books/books.api";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export default function Books() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Book>>({});
  const [borrowQty, setBorrowQty] = useState<number>(1);
  const [borrowDue, setBorrowDue] = useState<string>("");

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Add Book ---
  const handleAddBook = async () => {
    if (!formData.title || !formData.author)
      return toast.error("Title & Author required");

    try {
      await addBook({
        title: formData.title,
        author: formData.author,
        genre: formData.genre || "Unknown",
        isbn: formData.isbn || "N/A",
        description: formData.description || "",
        copies: Number(formData.copies) || 1,
        available: (formData.copies || 1) > 0,
      }).unwrap();

      toast.success("Book added successfully!");
      setAddOpen(false);
      setFormData({});
    } catch (err) {
      toast.error("Failed to add book");
    }
  };

  // --- Edit Book ---
  const handleEditBook = async () => {
    if (!selectedBook) return;
    try {
      await updateBook({
        id: selectedBook._id,
        body: {
          ...formData,
          copies: Number(formData.copies),
          available: Number(formData.copies) > 0,
        },
      }).unwrap();

      toast.success("Book updated!");
      setEditOpen(false);
      setFormData({});
    } catch {
      toast.error("Failed to update book");
    }
  };

  // --- Delete Book ---
  const handleDelete = async (id: string) => {
    console.log(id);
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  // --- Borrow Book (UI Only for Now) ---
  const handleBorrow = () => {
    if (!selectedBook) return;
    const qty = Number(borrowQty);
    if (qty > selectedBook.copies)
      return toast.error("Not enough copies available");

    toast.success(
      `Borrowed ${qty} copy/copies of "${selectedBook.title}". Redirecting...`
    );
    setBorrowOpen(false);

    // redirect to summary
    window.location.href = "/borrow-summary";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">📚 Book List</h1>
        <Button onClick={() => setAddOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Book
        </Button>
      </div>

      {/* Table */}
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
                        book.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedBook(book);
                        setFormData(book);
                        setEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
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
                      onClick={() => {
                        setSelectedBook(book);
                        setBorrowQty(1);
                        setBorrowDue("");
                        setBorrowOpen(true);
                      }}
                    >
                      <BookOpen className="w-4 h-4" /> Borrow
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* --- Add Book Modal --- */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Title</Label>
            <Input name="title" onChange={handleChange} />
            <Label>Author</Label>
            <Input name="author" onChange={handleChange} />
            <Label>Genre</Label>
            <Input name="genre" onChange={handleChange} />
            <Label>ISBN</Label>
            <Input name="isbn" onChange={handleChange} />
            <Label>Description</Label>
            <Input name="description" onChange={handleChange} />
            <Label>Copies</Label>
            <Input name="copies" type="number" onChange={handleChange} />
          </div>
          <DialogFooter>
            <Button onClick={handleAddBook}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Edit Book Modal --- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label>Title</Label>
            <Input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
            <Label>Author</Label>
            <Input
              name="author"
              value={formData.author || ""}
              onChange={handleChange}
            />
            <Label>Genre</Label>
            <Input
              name="genre"
              value={formData.genre || ""}
              onChange={handleChange}
            />
            <Label>ISBN</Label>
            <Input
              name="isbn"
              value={formData.isbn || ""}
              onChange={handleChange}
            />
            <Label>Description</Label>
            <Input
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <Label>Copies</Label>
            <Input
              name="copies"
              type="number"
              value={formData.copies || ""}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEditBook}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
