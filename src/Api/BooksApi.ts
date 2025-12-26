import axios from "axios";
import type { Book } from "../Types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function getBooks(): Promise<Book[]> {
  const res = await api.get<Book[]>("/books");
  return res.data;
}

export async function getBook(id: string): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}

export type CreateBookDto = Omit<Book, "id">;
export type UpdateBookDto = Omit<Book, "id">;

export async function createBook(data: CreateBookDto): Promise<Book> {
  const res = await api.post<Book>("/books", data);
  return res.data;
}

export async function updateBook(id: string, data: UpdateBookDto): Promise<Book> {
  const res = await api.put<Book>(`/books/${id}`, data);
  return res.data;
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/books/${id}`);
}