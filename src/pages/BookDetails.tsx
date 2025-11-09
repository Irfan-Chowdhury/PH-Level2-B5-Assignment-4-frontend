import { useParams, Link } from "react-router";
import { useGetBookByIdQuery } from "@/redux/features/books/books.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id || "");

  if (isLoading) return <p className="text-center mt-10">Loading book...</p>;
  if (isError || !book)
    return <p className="text-center text-red-600 mt-10">Book not found.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-sky-700">
            {book.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Description:</strong> {book.description || "No description available."}</p>
          <p>
            <strong>Copies:</strong>{" "}
            <span
              className={`font-medium ${
                book.copies > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {book.copies}
            </span>
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" asChild>
          <Link to="/books">Back to List</Link>
        </Button>
        <Button asChild>
          <Link to={`/edit-book/${book._id}`}>Edit Book</Link>
        </Button>
      </div>
    </div>
  );
}
