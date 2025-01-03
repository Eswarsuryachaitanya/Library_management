import React, { useEffect, useState } from "react";
import AddBook from "./components/AddBook"; // Ensure the path is correct
import BookList from "./components/BookList"; // Ensure the path is correct
import bookServiceInstance from "./BookService"; // Import the book service
import "./App.css"; // Add styles if needed

function App() {
    const [books, setBooks] = useState([]);

    // Function to fetch all books
    const fetchBooks = () => {
        bookServiceInstance
            .getBooks()
            .then((response) => {
                setBooks(response.data); // Update state with fetched books
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    };

    // UseEffect to fetch books on component load
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="App">
            <h1>Book Management System</h1>
            {/* AddBook component to handle adding a book */}
            <AddBook onAddBook={fetchBooks} />
            {/* BookList component to display books */}
            <BookList books={books} />
        </div>
    );
}

export default App;
