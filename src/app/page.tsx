"use client";
import React, { useEffect, useState } from "react";
import { Book, BookSearch } from "@/components/global/book-search";
import { BookList } from "@/components/global/book-list";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("readingList");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const addBook = (newBook: Book) => {
    const updateBooks: Book[] = [...books, { ...newBook, status: "backlog" }];
    setBooks(updateBooks);
    localStorage.setItem("readingList", JSON.stringify(updateBooks)); 
  };

  const moveBook = (bookToMove: Book, newStatus: Book["status"]) => {
    // const updateBooks: Book[] = books.map((book) => {
    //   if (book.key === bookToMove.key?{ ...book, status: newStatus}:book) {
    //     return { ...book, status: newStatus };
    //   }
    //   return book;
    // })
    // setBooks(updateBooks);

    const updateBooks: Book[] = books.map((book) => 
    book.key === bookToMove.key ? { ...book, status: newStatus } : book)
    setBooks(updateBooks);
  }

  const removeBook = (bookToRemove: Book) => {
    if(window.confirm(`Are you sure you want to remove ${bookToRemove.title}?`)){
      const updateBooks: Book[] = books.filter((book) => book.key !== bookToRemove.key)
      setBooks(updateBooks);
    }
  }

  return (
    <div className="container mx-auto">
      <BookSearch onAddBook={addBook}/>
      <BookList books={books} onMoveBook={moveBook} onRemoveBook={removeBook}/>
    </div>
  );
}
