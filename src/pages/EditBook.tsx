import { useParams, useNavigate } from "react-router";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/features/books/books.api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

const GENRE_OPTIONS: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

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

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  // Load data into form
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

  // Validation
  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.genre) newErrors.genre = "Please select a genre";
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.copies < 1) newErrors.copies = "Minimum 1 copy required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

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
      navigate("/books");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update book");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading book data...</p>;

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-semibold text-center text-sky-700 mb-6">
        Edit Book
      </h2>

      <div className="space-y-4">

        {/* TITLE */}
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* AUTHOR */}
        <div>
          <Label>Author</Label>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? "border-red-500" : ""}
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author}</p>
          )}
        </div>

        {/* GENRE DROPDOWN */}
        <div>
          <Label>Genre</Label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.genre ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Genre</option>
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm">{errors.genre}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <Label>ISBN</Label>
          <Input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className={errors.isbn ? "border-red-500" : ""}
          />
          {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn}</p>}
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* COPIES */}
        <div>
          <Label>Copies</Label>
          <Input
            name="copies"
            type="number"
            value={formData.copies}
            min={1}
            onChange={handleChange}
            className={errors.copies ? "border-red-500" : ""}
          />
          {errors.copies && (
            <p className="text-red-500 text-sm">{errors.copies}</p>
          )}
        </div>

      </div>

      <Button
        onClick={handleUpdate}
        className="w-full mt-6"
        disabled={updating}
      >
        {updating ? "Updating..." : "Update"}
      </Button>
    </div>
  );
}
