import { useParams, useNavigate } from "react-router";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/features/books/books.api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id || "");
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.author)
      return toast.error("Title & Author required");

    try {
      await updateBook({
        id: id!,
        body: {
          ...formData,
          copies: Number(formData.copies),
          available: Number(formData.copies) > 0,
        },
      }).unwrap();

      toast.success("Book updated successfully!");
      navigate(`/books/${id}`);
    } catch (err) {
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading book data...</p>;

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-semibold text-center text-sky-700 mb-6">
        Edit Book
      </h2>

      <div className="space-y-3">
        <Label>Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} />

        <Label>Author</Label>
        <Input name="author" value={formData.author} onChange={handleChange} />

        <Label>Genre</Label>
        <Input name="genre" value={formData.genre} onChange={handleChange} />

        <Label>ISBN</Label>
        <Input name="isbn" value={formData.isbn} onChange={handleChange} />

        <Label>Description</Label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <Label>Copies</Label>
        <Input
          name="copies"
          type="number"
          value={formData.copies}
          onChange={handleChange}
        />
      </div>

      <Button
        onClick={handleUpdate}
        className="w-full mt-6"
        disabled={updating}
      >
        {updating ? "Updating..." : "Save Changes"}
      </Button>
    </div>
  );
}
