import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("books");

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const result = await db
        .collection("books")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting book", error });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
