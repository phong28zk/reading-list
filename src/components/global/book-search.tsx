import axios from "axios";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  number_of_pages: number;
  number_of_pages_median: number;
  status: `done` | `inProgress` | `backlog`;
};

export const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 100;
  const startIndex = (currentPage - 1) * booksPerPage + 1;
  const endIndex = Math.min(startIndex+booksPerPage-1, totalBooks);

  type SearchResult = {
    docs: Book[];
    numFound: number;
  };

  const searchBooks = async (page: number = 1) => {
    console.log(`Searching...`);
    if (!query) return; // if query is empty, return
    setIsLoading(true);
    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${booksPerPage}`
      );
      setBooks(response.data.docs);
      setTotalBooks(response.data.numFound);
      setCurrentPage(page);
    } catch (error) {
      console.error(`Error fetching`, error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  const handlePreviosClick = () => {
    if (currentPage > 1) {
      searchBooks(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(totalBooks / booksPerPage)) {
      searchBooks(currentPage + 1);
    }
  };

  return (
    <>
      <div className={`p-4`}>
        <div className={`sm:max-w-sm`}>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Search for a book"
            className={`mb-2`}
          />
          <Button onClick={() => searchBooks()} disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </div>
        <div className="mt-2">
            {totalBooks > 0 && (
                <span className={`text-sm`}>
                    Showing {startIndex} - {endIndex} of {totalBooks} results
                </span>
            )}
        </div>
        <div className={`mt-4 max-h-64 overflow-auto`}>
          <Table className={`mx-10`}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className={`max-w-md mx-6`}>
              <TableRow>
                <TableHead
                  className={`w-[100px] sm:w-[120px] md:w-[200px] lg:w-[300px]`}
                >
                  Title
                </TableHead>
                <TableHead className={`w-[200px] lg:w-[300px]`}>
                  Author
                </TableHead>
                <TableHead className={`w-[150px]`}>Year</TableHead>
                <TableHead className={`w-[150px]`}>Page Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author_name?.join(", ")}</TableCell>
                  <TableCell>{book.first_publish_year}</TableCell>
                  <TableCell>
                    {book.number_of_pages_median || book.number_of_pages}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className={`mt-4 flex items-center justify-between`}>
        <Button
          variant="outline"
          disabled={currentPage <= 1 || isLoading}
          onClick={handlePreviosClick}
        >
          Previous
        </Button>
        <span>
          {" "}
          Page {currentPage}/{Math.ceil(totalBooks / booksPerPage)}
        </span>
        <Button
          variant="outline"
          disabled={
            currentPage >= Math.ceil(totalBooks / booksPerPage) || isLoading
          }
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </>
  );
};
