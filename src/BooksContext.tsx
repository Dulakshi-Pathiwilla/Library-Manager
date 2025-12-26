import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Book } from "./Types";

interface BooksContextValue {
  books: Book[];
  addBook: (data: Omit<Book, "id">) => void;
  updateBook: (id: string, data: Omit<Book, "id">) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
}

const BooksContext = createContext<BooksContextValue | undefined>(
  undefined
);

// some demo data
const initialBooks: Book[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    publicationYear: 2009,
    genre: "Computer Science",
    copiesAvailable: 1,
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    publicationYear: 1999,
    genre: "Software Development",
    copiesAvailable: 3,
  },
];

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const addBook = (data: Omit<Book, "id">) => {
    const newBook: Book = {
      id: crypto.randomUUID(), // or Date.now().toString()
      ...data,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id: string, data: Omit<Book, "id">) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const getBookById = (id: string) => books.find((b) => b.id === id);

  return (
    <BooksContext.Provider
      value={{ books, addBook, updateBook, deleteBook, getBookById }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const ctx = useContext(BooksContext);
  if (!ctx) {
    throw new Error("useBooks must be used inside BooksProvider");
  }
  return ctx;
};