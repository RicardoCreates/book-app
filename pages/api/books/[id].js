import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  console.log(`Received request to ${method} book with id: ${id}`);

  const client = await clientPromise;
  const db = client.db("book-app");

  switch (method) {
    case "DELETE":
      try {
        const result = await db
          .collection("books")
          .deleteOne({ _id: new ObjectId(id) });
        console.log(`Delete result: ${JSON.stringify(result)}`);
        if (result.deletedCount === 1) {
          res.status(200).json({ success: true });
        } else {
          res.status(404).json({ success: false, message: "Book not found" });
        }
      } catch (error) {
        console.error(`Failed to delete book: ${error.message}`);
        res
          .status(500)
          .json({ success: false, message: "Failed to delete book" });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
