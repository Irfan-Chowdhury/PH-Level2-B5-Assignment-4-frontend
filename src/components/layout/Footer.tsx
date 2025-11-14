import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-400">Brislym Library</span>.  
          All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/books" className="hover:text-white transition-colors">
            All Books
          </Link>
          <Link to="/borrow-summary" className="hover:text-white transition-colors">
          Borrow Summary
          </Link>
        </div>
      </div>
    </footer>
  );
}
