import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function fetchBookData(id) {
  const client = await clientPromise;
  const db = client.db("book-app");

  try {
    let book;
    if (ObjectId.isValid(id)) {
      book = await db.collection("books").findOne({ _id: new ObjectId(id) });
    } else {
      book = await db.collection("books").findOne({ _id: id });
    }
    return book;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    throw new Error("Failed to fetch book");
  }
}
