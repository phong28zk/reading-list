"use client";
import React, { useEffect, useState } from "react";
import { Book, BookSearch } from "@/components/global/book-search";
import { BookList } from "@/components/global/book-list";
import { useStore } from "../lib/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const { loadBooksFromLocalStorage } = useStore((state) => state);
  const { setTheme } = useTheme();
  useEffect(() => {
    loadBooksFromLocalStorage();
  }, [loadBooksFromLocalStorage]);

  return (
    <>
      <div className="flex flex-row container mt-5">
        <div className="items-center">Hello</div>
        <div className=" ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="container">
        <BookSearch />
        <BookList />
      </div>
    </>
  );
}
