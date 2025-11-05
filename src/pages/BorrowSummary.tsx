import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/features/books/books.api";

export default function BorrowSummary() {

  const { data: borrowData = [], isLoading, isError } = useGetBorrowSummaryQuery();


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">📖 Borrow Summary</h1>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity Borrowed</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Loading borrowed books...
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-red-600">
                  Failed to load borrowed data.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && borrowData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.book?.title || "N/A"}</TableCell>
                  <TableCell>{item.book?.isbn || "N/A"}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
