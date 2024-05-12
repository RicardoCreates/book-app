import Image from "next/image";
import { useRouter } from "next/router";

export default function BookPage({ books, handleDeleteBook }) {
  const router = useRouter();
  const { id } = router.query;

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) return null;

  return (
    <>
      <h1>BookPage</h1>
      <div>
        <Image alt="" src={foundBook.cover} width={300} height={300} />
      </div>
      <h2>{foundBook.title}</h2>
      <h3>{foundBook.description}</h3>
      <button
        type="button"
        onClick={() => {
          handleDeleteBook(id);
          router.push("/");
        }}
      >
        Delete Place
      </button>
    </>
  );
}
