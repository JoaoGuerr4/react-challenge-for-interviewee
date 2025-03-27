export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  publicationYear: number;
  status: "available" | "borrowed";
}

export type BookFormData = Omit<Book, "id" | "status">;
