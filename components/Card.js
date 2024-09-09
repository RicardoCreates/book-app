import Image from "next/image";

export default function Card({ book }) {
  console.log(book.cover)
  return (
    <>
      <figure>
        <div style={{ position: "relative", height: "300px" }}>
          <Image
            alt={book.title}
            src={book.cover && book.cover.startsWith('http') ? book.cover : '/path/to/placeholder.jpg'}
            width={300}
            height={300}
          />
        </div>
        <figcaption>{book.title}</figcaption>
      </figure>
      <p>Year: {book.publishYear}</p>
    </>
  );
}
