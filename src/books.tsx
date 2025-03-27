import { createContext, useContext, useReducer, useEffect } from "react";
import localforage from "localforage";
import { Book } from "./types/book";
import { mockBooks } from "./mocks/books";

type State = {
  books: Book[];
  searchQuery: string;
};

type Action =
  | { type: "ADD_BOOK"; payload: Book | Book[] }
  | {
      type: "UPDATE_BOOK_STATUS";
      payload: { id: string; status: "available" | "borrowed" };
    }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "CLEAR_SEARCH" };

type BooksContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  filteredBooks: Book[];
};

const BooksContext = createContext<BooksContextType>({} as BooksContextType);

const initialState: State = {
  books: [],
  searchQuery: "",
};

const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: Array.isArray(action.payload)
          ? action.payload
          : [...state.books, action.payload],
      };

    case "UPDATE_BOOK_STATUS":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? { ...book, status: action.payload.status }
            : book
        ),
      };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "CLEAR_SEARCH":
      return { ...state, searchQuery: "" };

    default:
      return state;
  }
};

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initializeBooks = async () => {
      const storedBooks = await localforage.getItem<Book[]>("books");

      if (!storedBooks || storedBooks.length === 0) {
        dispatch({ type: "ADD_BOOK", payload: mockBooks });
      } else {
        dispatch({ type: "ADD_BOOK", payload: storedBooks });
      }
    };

    initializeBooks();
  }, []);

  useEffect(() => {
    localforage.setItem("books", state.books);
  }, [state.books]);

  const filteredBooks = state.books.filter((book) => {
    const searchTerm = normalizeString(state.searchQuery);

    if (!searchTerm) return true;

    const searchTerms = searchTerm.split(" ").filter((term) => term.length > 0);

    const title = normalizeString(book.title);
    const category = normalizeString(book.category);

    return searchTerms.every(
      (term) => title.includes(term) || category.includes(term)
    );
  });

  return (
    <BooksContext.Provider value={{ state, dispatch, filteredBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
