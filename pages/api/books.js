import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("book-app");

  switch (req.method) {
    case "POST":
      const newBook = JSON.parse(req.body);
      const result = await db.collection("books").insertOne(newBook);
      res.status(201).json(result.ops[0]);
      break;
    case "GET":
      const books = await db.collection("books").find({}).toArray();
      res.status(200).json(books);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
