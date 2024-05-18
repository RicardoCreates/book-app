import GlobalStyle from "../styles";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    }

    fetchBooks();
  }, []);

  async function handleAddBook(newBook) {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const addedBook = await res.json();
    setBooks([...books, addedBook]);
  }

  async function handleDeleteBook(id) {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBooks(books.filter((book) => book._id !== id));
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        books={books}
        handleAddBook={handleAddBook}
        handleDeleteBook={handleDeleteBook}
      />
    </>
  );
}
