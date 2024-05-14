import GlobalStyle from "../styles";
import { useLocalStorageState } from "react"; // Import useLocalStorageState hook
import { initialBooks } from "@/lib/books";
import { fetchBooks } from "@/lib/api";
import { useEffect } from "react";

export default async function App({ Component, pageProps }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        // Handle error in UI if needed (e.g., display an error message)
      }
    };

    fetchData();
  }, []);

  function handleAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handleDeleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
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
