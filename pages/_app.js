import GlobalStyle from "../styles";
import { initialBooks } from "@/lib/books";
import useLocalStorage from "use-local-storage";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (arr) => fetch(arr).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [books, setBooks] = useLocalStorage("books", {
    defaultValue: initialBooks,
  });

  const router = useRouter();

  function handleAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handleDeleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      ></SWRConfig>
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
