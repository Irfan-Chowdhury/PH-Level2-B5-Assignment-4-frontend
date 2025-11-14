// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useGetBorrowSummaryQuery } from "@/redux/features/books/books.api";

// export default function BorrowSummary() {

//   const { data: borrowData = [], isLoading, isError } = useGetBorrowSummaryQuery();


//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">📖 Borrow Summary</h1>

//       <div className="overflow-x-auto border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Book Title</TableHead>
//               <TableHead>ISBN</TableHead>
//               <TableHead>Total Quantity Borrowed</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {isLoading && (
//               <TableRow>
//                 <TableCell colSpan={3} className="text-center py-6">
//                   Loading borrowed books...
//                 </TableCell>
//               </TableRow>
//             )}

//             {isError && (
//               <TableRow>
//                 <TableCell colSpan={3} className="text-center text-red-600">
//                   Failed to load borrowed data.
//                 </TableCell>
//               </TableRow>
//             )}

//             {!isLoading && !isError && borrowData.map((item, idx) => (
//                 <TableRow key={idx}>
//                   <TableCell>{item.book?.title || "N/A"}</TableCell>
//                   <TableCell>{item.book?.isbn || "N/A"}</TableCell>
//                   <TableCell>{item.totalQuantity}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetBorrowSummaryQuery } from "@/redux/features/books/books.api";

export default function BorrowSummary() {
  const [page, setPage] = useState(1);
  const limit = 10;
  

  const { data, isLoading, isError } = useGetBorrowSummaryQuery({
    page,
    limit,
  });

  const borrowData = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">📖 Borrow Summary</h1>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Borrowed</TableHead>
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

            {!isLoading &&
              !isError &&
              borrowData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.book?.title || "N/A"}</TableCell>
                  <TableCell>{item.book?.isbn || "N/A"}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Buttons */}
      {pagination && (
        // <div className="flex justify-between items-center mt-4">
        //   <Button
        //     disabled={page <= 1}
        //     onClick={() => setPage((prev) => prev - 1)}
        //   >
        //     ◀ Previous
        //   </Button>

        //   <p>
        //     Page {pagination.page} of {pagination.totalPages}
        //   </p>

        //   <Button
        //     disabled={page >= pagination.totalPages}
        //     onClick={() => setPage((prev) => prev + 1)}
        //   >
        //     Next ▶
        //   </Button>
        // </div>
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
      )}
    </div>
  );
}
