import styled from "styled-components";

export default function Form({ onSubmit, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Ensure publishYear and pages are numbers
    data.publishYear = parseInt(data.publishYear, 10);
    data.pages = parseInt(data.pages, 10);

    onSubmit(data);
  }

  return (
    <>
      <StyledHeadline>Add Book</StyledHeadline>
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="title">Title</StyledLabel>
          <StyledInput
            type="text"
            id="title"
            name="title"
            defaultValue={defaultData?.title}
            required
          />
          <StyledLabel htmlFor="author">Author</StyledLabel>
          <StyledInput
            type="text"
            id="author"
            name="author"
            defaultValue={defaultData?.author}
            required
          />
          <StyledLabel htmlFor="publishYear">Publish Year</StyledLabel>
          <StyledInput
            type="number"
            id="publishYear"
            name="publishYear"
            defaultValue={defaultData?.publishYear}
            required
          />
          <StyledLabel htmlFor="description">Description</StyledLabel>
          <StyledTextarea
            id="description"
            name="description"
            defaultValue={defaultData?.description}
            required
          />
          <StyledLabel htmlFor="genre">Genre</StyledLabel>
          <StyledInput
            type="text"
            id="genre"
            name="genre"
            defaultValue={defaultData?.genre}
            required
          />
          <StyledLabel htmlFor="pages">Pages</StyledLabel>
          <StyledInput
            type="number"
            id="pages"
            name="pages"
            defaultValue={defaultData?.pages}
            required
          />
          <StyledLabel htmlFor="cover">Cover</StyledLabel>
          <StyledInput
            type="text"
            id="cover"
            name="cover"
            defaultValue={defaultData?.cover}
            required
          />
          <StyledButton type="submit">Add Book</StyledButton>
        </StyledForm>
      </StyledContainer>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 2rem;
  gap: 1.5rem;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  height: 100px;
  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const StyledHeadline = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const StyledButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #005bb5;
  }
`;

const StyledContainer = styled.div`
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
