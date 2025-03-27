import { Book } from "../types/book";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    category: "Fantasia",
    isbn: "978-8533615540",
    publicationYear: 1954,
    status: "available",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    category: "Ficção Distópica",
    isbn: "978-0451524935",
    publicationYear: 1949,
    status: "borrowed",
  },
  {
    id: "3",
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    category: "Romance Clássico",
    isbn: "978-8572329353",
    publicationYear: 1813,
    status: "available",
  },
  {
    id: "4",
    title: "Neuromancer",
    author: "William Gibson",
    category: "Cyberpunk",
    isbn: "978-0441569595",
    publicationYear: 1984,
    status: "available",
  },
  {
    id: "5",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasia",
    isbn: "978-8533613409",
    publicationYear: 1937,
    status: "borrowed",
  },
];
