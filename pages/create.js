import Form from "@/components/Form";
import Link from "next/link";

export default function CreatePage({ handleAddBook }) {
  return (
    <>
      <Link href="/">&larr; Back to Homepage</Link>
      <Form onSubmit={handleAddBook} />
    </>
  );
}
