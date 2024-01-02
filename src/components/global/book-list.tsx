import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "./book-search";
import { Button } from "../ui/button";
import { useStore } from "@/lib/store";

export const BookList = () => {
  const { books, moveBook, removeBook } = useStore((state) => state);
  const moveToList = (book: Book, targetList: Book['status']) => {
    moveBook(book, targetList)
  }

  const renderBookItem = (book: Book, index: number) => {
    return (
      <Card key={index} className={`mb-4`}>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p>
              <span className={`font-bold`}>Author:</span>{" "}
              {book.author_name?.join(", ")}
            </p>
            <p>
              <span className={`font-bold`}>First Publish Year:</span>{" "}
              {book.first_publish_year}
            </p>
            <p>
              <span className={`font-bold`}>Number of Pages (Median):</span>{" "}
              {book.number_of_pages_median}
            </p>
            <p>
              <span className={`font-bold`}>Status:</span> {book.status}
            </p>
          </CardDescription>
        </CardContent>
        <CardFooter className={`gap-4`}>
          <Button variant="default" onClick={() => moveToList(book, "backlog")}>
            Backlog
          </Button>
          <Button
            variant="default"
            onClick={() => moveToList(book, "inProgress")}
          >
            In Progress
          </Button>
          <Button variant="default" onClick={() => moveToList(book, "done")}>
            Done
          </Button>
        </CardFooter>
        <CardFooter>
          <Button variant="destructive" onClick={() => removeBook(book)}>
            Remove Book
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className={`space-y-8 p-4`}>
      <h2 className={`mb-4 text-2xl font-bold`}>Reading List</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {books.filter((book) => book.status === "backlog").length > 0 && (
          <div>
            <h3 className={`mb-4 text-xl font-bold`}>Backlog</h3>
            {books
              .filter((book) => book.status === "backlog")
              .map(renderBookItem)}
          </div>
        )}
        {books.filter((book) => book.status === "inProgress").length > 0 && (
          <div className={``}>
            <h3 className={`mb-4 text-xl font-bold`}>In Progress</h3>
            {books
              .filter((book) => book.status === "inProgress")
              .map(renderBookItem)}
          </div>
        )}
        {books.filter((book) => book.status === "done").length > 0 && (
          <div>
            <h3 className={`mb-4 text-xl font-bold`}>Done</h3>
            {books.filter((book) => book.status === "done").map(renderBookItem)}
          </div>
        )}
      </div>
    </div>
  );
};
