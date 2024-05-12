import styled from "styled-components";
import Link from "next/link";
import Card from "@/components/Card";

export default function HomePage({ books }) {
  return (
    <div>
      <Headline>Book App</Headline>
      <List>
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <ListItem>
              <Card book={book} />
            </ListItem>
          </Link>
        ))}
      </List>
      <StyledLink href="/create" $isHomepage>
        + Book
      </StyledLink>
    </div>
  );
}

const List = styled.ul`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.li`
  border: 1px solid skyblue;
  text-align: center;
  position: relative;
  list-style: none;
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
