export async function fetchBooks() {
  try {
    const response = await fetch("https://your-api-endpoint.com/books"); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Re-throw the error for handling in the component
  }
}
