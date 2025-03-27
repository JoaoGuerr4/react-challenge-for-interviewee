import { Book } from "../types/book";
import styles from "./styles.module.css";

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, newStatus: "available" | "borrowed") => void;
}

export const BookCard = ({ book, onStatusChange }: BookCardProps) => {
  const handleStatusToggle = () => {
    const newStatus = book.status === "available" ? "borrowed" : "available";
    onStatusChange(book.id, newStatus);
  };

  return (
    <div className={`${styles.card} ${styles[book.status]}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>Autor: {book.author}</p>
        <p className={styles.category}>Categoria: {book.category}</p>
        <div className={styles.details}>
          <span>Ano: {book.publicationYear}</span>
          <span>ISBN: {book.isbn}</span>
        </div>
      </div>

      <button
        onClick={handleStatusToggle}
        className={`${styles.statusButton} ${styles[book.status]}`}
        aria-label={`Alterar status para ${
          book.status === "available" ? "emprestado" : "disponível"
        }`}
      >
        {book.status === "available" ? "Disponível" : "Emprestado"}
      </button>
      <div className="books-grid"></div>
    </div>
  );
};
