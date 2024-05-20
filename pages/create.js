import Form from "@/components/Form";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function CreatePage({ handleAddBook }) {
  const router = useRouter();

  const handleFormSubmit = async (book) => {
    await handleAddBook(book);
  };

  return (
    <>
      <StyledLink href="/">&larr; Back to Homepage</StyledLink>
      <Form onSubmit={handleFormSubmit} />
    </>
  );
}

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
