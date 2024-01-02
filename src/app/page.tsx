"use client";
import React, { useEffect, useState } from "react";
import { Book, BookSearch } from "@/components/global/book-search";
import { BookList } from "@/components/global/book-list";
import { useStore } from '../lib/store'
export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const {loadBooksFromLocalStorage} = useStore((state)=>state)

  useEffect(() => {
    loadBooksFromLocalStorage()
  }, [loadBooksFromLocalStorage]);



  return (
    <div className="container mx-auto">
      <BookSearch />
      <BookList/>
    </div>
  );
}
