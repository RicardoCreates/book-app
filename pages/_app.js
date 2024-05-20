import GlobalStyle from "../styles";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
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

    if (res.ok) {
      const addedBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]); // Update state with the new book
      router.push("/"); // Navigate to the homepage
    } else {
      console.error("Failed to add the book");
    }
  }

  async function handleDeleteBook(id) {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); // Update state after deleting the book
        router.push("/"); // Navigate to the homepage
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
