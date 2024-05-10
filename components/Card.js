import Image from "next/image";

export default function Card({ book }) {
  return (
    <>
      <figure>
        <div style={{ position: "relative", height: "300px" }}>
          <Image alt="" src={book.cover} width={300} height={300} />
        </div>
        <figcaption>{book.title}</figcaption>
      </figure>
      <p>Year: {book.publishYear}</p>
    </>
  );
}
