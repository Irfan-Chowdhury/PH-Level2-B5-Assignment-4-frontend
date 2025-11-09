// src/pages/AddBook.tsx

import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAddBookMutation } from "@/redux/features/books/books.api";
import { useNavigate } from "react-router";

interface BookForm {
  title: string;
  author: string;
  genre: string;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "copies" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.author || !formData.isbn) {
        toast.error("Please fill in all required fields");
        return;
      }
      await addBook(formData).unwrap();
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
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                value={formData.copies}
                onChange={handleChange}
                min={1}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
