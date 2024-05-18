import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  console.error(
    "MongoDB URI is not defined. Please add your Mongo URI to .env.local"
  );
  throw new Error("Please add your Mongo URI to .env.local");
}

console.log("Environment:", process.env.NODE_ENV); // Log the environment
console.log("MongoDB URI:", uri); // Log the URI to check it's being read correctly

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

clientPromise
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default clientPromise;
