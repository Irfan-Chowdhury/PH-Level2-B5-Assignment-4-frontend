import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BorrowSummaryItem {
  id: string;
  title: string;
  isbn: string;
  totalBorrowed: number;
}

// --- Mock data (replace with API later) ---
const borrowData: BorrowSummaryItem[] = [
  { id: "1", title: "Clean Code", isbn: "9780132350884", totalBorrowed: 5 },
  { id: "2", title: "Atomic Habits", isbn: "9780735211292", totalBorrowed: 3 },
  { id: "3", title: "The Pragmatic Programmer", isbn: "9780201616224", totalBorrowed: 7 },
];

export default function BorrowSummary() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">📖 Borrow Summary</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity Borrowed</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {borrowData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.isbn}</TableCell>
              <TableCell>{item.totalBorrowed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
