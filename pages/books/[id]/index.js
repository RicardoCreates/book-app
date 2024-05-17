import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Importiere ObjectId

export default function BookPage({ book, handleDeleteBook }) {
  const router = useRouter();

  if (!book) return <p>Loading...</p>;

  return (
    <Container>
      <LinkContainer>
        <StyledLink href="/">back</StyledLink>
        <h1>BookPage</h1>
        <div>
          <Image alt="" src={book.cover} width={300} height={300} />
        </div>
        <h2>{book.title}</h2>
        <h3>{book.description}</h3>
        <StyledButton
          type="button"
          onClick={async () => {
            await handleDeleteBook(book._id);
            router.push("/");
          }}
        >
          Delete Book
        </StyledButton>
      </LinkContainer>
    </Container>
  );
}

const StyledButton = styled.button`
  background-color: skyblue;
  border: none;
  cursor: pointer;
  align-self: center;
  border-radius: 14px;
  padding: 1rem;
  text-decoration: none;
  color: grey;
  font-size: 1rem;

  &:hover {
    color: black;
  }
`;

const StyledLink = styled(Link)`
  position: fixed;

  background-color: skyblue;

  padding: 1rem;
  border-radius: 14px;

  bottom: 2rem;
  left: ${({ $isHomepage }) => ($isHomepage ? null : "2rem")};
  right: ${({ $isHomepage }) => ($isHomepage ? "2rem" : null)};

  text-decoration: none;

  &:hover {
    color: black;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Container = styled.section`
  padding: 1rem;
`;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await clientPromise;
  const db = client.db("book-app");
  const book = await db.collection("books").findOne({ _id: new ObjectId(id) });

  return {
    props: {
      book: JSON.parse(JSON.stringify(book)),
    },
  };
}
