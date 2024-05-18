import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  console.log(`Request method: ${req.method}, Book ID: ${id}`);

  try {
    const client = await clientPromise;
    const db = client.db("book-app");

    if (req.method === "DELETE") {
      try {
        const result = await db
          .collection("books")
          .deleteOne({ _id: new ObjectId(id) });
        console.log(`Delete result: ${JSON.stringify(result)}`);

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Book deleted successfully" });
        } else {
          res.status(404).json({ message: "Book not found" });
        }
      } catch (error) {
        console.error("Failed to delete book:", error);
        res.status(500).json({ error: "Failed to delete book" });
      }
    } else {
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection error" });
  }
}
