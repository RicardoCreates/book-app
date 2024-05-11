import { useRouter } from "next/router";
import styled from "styled-components";
import { nanoid } from "nanoid";

export default function Form({ onSubmit, defaultData }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // const id = defaultData.id || nanoid();
    const id = defaultData?.id || nanoid();
    const bookData = { ...data, id };

    onSubmit(bookData);

    router.push("/");
  }

  return (
    <>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={defaultData?.title}
        />
        <button type="submit">Add Book</button>
      </form>
    </>
  );
}
