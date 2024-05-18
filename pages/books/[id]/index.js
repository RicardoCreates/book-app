import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default function BookPage({ books, handleDeleteBook, handleAddBook }) {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: book,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/books/${id}`, { refreshInterval: 400 });
  if (!session) {
    return (
      <>
        <Link link="/" />
        <p>You are not authorized to visit this page.</p>
      </>
    );
  }
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await toast.promise(
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      }),
      {
        pending: "Upload is pending",
        error: "Upload rejected 🤯",
      }
    );

    const { url } = await response.json();

    const imageData = {
      ...book,
    };
    event.target.reset();

    handleAddBook(imageData, id, mutate);
    setSelectedName(null);
  }

  if (!book) return null;
  if (status !== "authenticated") {
    return <h1>Please Login</h1>;
  }

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
