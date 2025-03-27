import { useBooks } from "./books";
import { BookCard } from "./BookCard/book-card";
import { SearchBar } from "./SearchBar/search";

export const HomePage = () => {
  const { state, filteredBooks, dispatch } = useBooks();

  return (
    <div>
      <SearchBar
        onSearch={(query) => {
          dispatch({ type: "SET_SEARCH_QUERY", payload: query });
        }}
      />

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onStatusChange={(id, status) =>
                dispatch({
                  type: "UPDATE_BOOK_STATUS",
                  payload: { id, status },
                })
              }
            />
          ))
        ) : (
          <div className="no-results">
            Nenhum livro encontrado para "{state.searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
