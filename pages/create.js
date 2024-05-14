import Form from "@/components/Form";
import Link from "next/link";
import styled from "styled-components";

export default function CreatePage({ handleAddBook }) {
  return (
    <>
      <StyledLink href="/">&larr; Back to Homepage</StyledLink>
      <Form onSubmit={handleAddBook} />
    </>
  );
}

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
