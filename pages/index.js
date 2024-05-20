import styled from "styled-components";
import Link from "next/link";
import Card from "@/components/Card";

export default function HomePage({ books }) {
  return (
    <div>
      <Headline>Book App</Headline>
      <List>
        {books.map((book) => (
          <Link key={book._id} href={`/books/${book._id}`} passHref>
            <StyledListItem>
              <Card book={book} />
            </StyledListItem>
          </Link>
        ))}
      </List>
      <StyledLink href="/create" $isHomepage>
        + Book
      </StyledLink>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/books");
    if (!res.ok) {
      throw new Error(`Failed to fetch books, status: ${res.status}`);
    }
    const books = await res.json();
    return { props: { books } };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { props: { books: [] } }; // Return an empty array in case of error
  }
}

const List = styled.ul`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledListItem = styled.li`
  border: 1px solid skyblue;
  text-align: center;
  position: relative;
  list-style: none;
  cursor: pointer;
  padding: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;

const Headline = styled.h1`
  text-align: center;
  color: skyblue;
`;

const StyledLink = styled(Link)`
  position: fixed;
  background-color: skyblue;
  padding: 1rem;
  border-radius: 5px;
  bottom: 2rem;
  left: ${({ $isHomepage }) => ($isHomepage ? null : "2rem")};
  right: ${({ $isHomepage }) => ($isHomepage ? "2rem" : null)};
  text-decoration: none;
  &:hover {
    color: black;
  }
`;
