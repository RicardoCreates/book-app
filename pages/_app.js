import GlobalStyle from "../styles";
import { useState } from "react";
import { initialBooks } from "@/lib/books";

export default function App({ Component, pageProps }) {
  const [books, setBooks] = useState(initialBooks);

  function handleAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handelDeleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        books={books}
        handleAddBook={handleAddBook}
        handelDeleteBook={handelDeleteBook}
      />
    </>
  );
}
