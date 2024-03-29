import { create } from "zustand";

export type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: string;
  number_of_pages: number;
  number_of_pages_median: string | null;
  status: "done" | "inProgress" | "backlog";
};

interface BookState {
  books: Book[];
}

interface BookStore extends BookState {
  addBook: (newBook: Book) => void;
  removeBook: (bookToRemove: Book) => void;
  moveBook: (bookToMove: Book, newStatus: Book["status"]) => void;
  reorderBooks: (
    listType: Book["status"],
    startIndex: number,
    endIndex: number
  ) => void;
  loadBooksFromLocalStorage: () => void;
}

export const useStore = create<BookStore>((set) => ({
  books: [],

    addBook: (newBook) =>
        set((state: BookState) => {
        const updatedBooks: Book[] = [
            ...state.books,
            {
            ...newBook,
            status: "backlog",
            },
        ];
        localStorage.setItem("readingList", JSON.stringify(updatedBooks));
        return { books: updatedBooks };
        }),

    removeBook: (bookToRemove) =>
        set((state: BookState) => {
        if (
            window.confirm(`Are you sure you want to remove ${bookToRemove.title}?`)
        ) {
            const updateBooks: Book[] = state.books.filter(
            (book) => book.key !== bookToRemove.key
            );
            localStorage.setItem("readingList", JSON.stringify(updateBooks));
        }
        return state;
        }),

    moveBook: (bookToMove, newStatus) => 
    set((state: BookState) => { 
        const updateBooks: Book[] = state.books.map((book) => 
        book.key === bookToMove.key ? { ...book, status: newStatus } : book)
        localStorage.setItem("readingList", JSON.stringify(updateBooks));
        return { books: updateBooks };
    }),

    reorderBooks: (
        listType: Book["status"],
        startIndex: number,
        endIndex: number
    ) =>
    set((state: BookStore) => {
        const filteredBooks = state.books.filter((book) => book.status === listType);
        const [reorderBook] = filteredBooks.splice(startIndex, 1);
        filteredBooks.splice(endIndex, 0, reorderBook);
        const updatedBooks = state.books.map((book) => {
            book.status === listType ? filteredBooks.shift() : book;
        })
        localStorage.setItem("readingList", JSON.stringify(updatedBooks));
        return { books: filteredBooks };
    }),

    loadBooksFromLocalStorage: () => {
        const storedBooks = localStorage.getItem("readingList");
        if(storedBooks) {
            set({ books: JSON.parse(storedBooks) });
        } else {
            set({ books: [] });
        }
    }
}));


