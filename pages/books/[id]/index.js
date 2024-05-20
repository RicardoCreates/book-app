import { fetchBookData } from "@/lib/fetchBookData";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

const BookPage = ({ book, handleDeleteBook }) => {
  const router = useRouter();

  if (!book) return <p>Loading...</p>;

  const handleDelete = async (id) => {
    await handleDeleteBook(id);
  };

  return (
    <Container>
      <LinkContainer>
        <StyledLink href="/">&larr; Back to Homepage</StyledLink>
        <h1>{book.title}</h1>
        <div>
          <Image alt="" src={book.cover} width={300} height={300} />
        </div>
        <h2>{book.author}</h2>
        <h3>{book.description}</h3>
        <StyledButton onClick={() => handleDelete(book._id)}>
          Delete Book
        </StyledButton>
      </LinkContainer>
    </Container>
  );
};

export default BookPage;

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const book = await fetchBookData(id);

    if (!book) {
      return { notFound: true };
    }

    return {
      props: { book: JSON.parse(JSON.stringify(book)) },
    };
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return { props: { error: "Failed to fetch book" } };
  }
}

const StyledButton = styled.button`
  background-color: skyblue;
  padding: 1rem;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  align-self: center;
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
  left: 2rem;
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
