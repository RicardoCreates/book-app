import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("book-app");

  switch (req.method) {
    case "POST":
      try {
        const newBook = req.body;
        const result = await db.collection("books").insertOne(newBook);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        console.error("Failed to add book:", error);
        res.status(500).json({ error: "Failed to add book" });
      }
      break;
    case "GET":
      try {
        const books = await db.collection("books").find({}).toArray();
        res.status(200).json(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
