import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAddBookMutation } from "@/redux/features/books/books.api";
import { useNavigate } from "react-router";

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

interface BookForm {
  title: string;
  author: string;
  genre: Genre | "";
  isbn: string;
  description: string;
  copies: number;
}

export default function AddBook() {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const [formData, setFormData] = useState<BookForm>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookForm, string>>>(
    {}
  );

  // Validate form values
  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookForm, string>> = {};

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "copies" ? Number(value) : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      await addBook({
        ...formData,
        available: formData.copies > 0,
      }).unwrap();

      toast.success("Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Add book failed:", error);
      toast.error("Failed to add book. Try again!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Add New Book
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Author */}
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

            {/* Genre Dropdown */}
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
              {errors.isbn && (
                <p className="text-red-500 text-sm">{errors.isbn}</p>
              )}
            </div>

            {/* Description */}
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

            {/* Copies */}
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
