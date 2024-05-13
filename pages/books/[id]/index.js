import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default function BookPage({ books, handleDeleteBook }) {
  const router = useRouter();
  const { id } = router.query;

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) return null;

  return (
    <Container>
      <LinkContainer>
        <StyledLink href="/">back</StyledLink>
        <h1>BookPage</h1>
        <div>
          <Image alt="" src={foundBook.cover} width={300} height={300} />
        </div>
        <h2>{foundBook.title}</h2>
        <h3>{foundBook.description}</h3>
        <StyledButton
          type="button"
          onClick={() => {
            handleDeleteBook(id);
            router.push("/");
          }}
        >
          Delete Place
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
