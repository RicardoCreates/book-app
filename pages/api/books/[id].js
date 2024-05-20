import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;

  const client = await clientPromise;
  const db = client.db("book-app");

  try {
    let book;
    if (ObjectId.isValid(id)) {
      book = await db.collection("books").findOne({ _id: new ObjectId(id) });
    } else {
      book = await db.collection("books").findOne({ _id: id });
    }

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    switch (method) {
      case "GET":
        res.status(200).json(book);
        break;
      case "DELETE":
        const result = await db
          .collection("books")
          .deleteOne({ _id: book._id });
        if (result.deletedCount === 1) {
          res.status(200).json({ success: true });
        } else {
          res.status(404).json({ success: false, message: "Book not found" });
        }
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(`Failed to handle book with id: ${id}`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
