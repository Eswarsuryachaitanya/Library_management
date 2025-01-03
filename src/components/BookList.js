import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookList.css"; // Add styles if needed

const BookList = () => {
    const [books, setBooks] = useState([]);

    // Fetch books from the backend
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8082/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    // Delete a book
    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/api/books/${id}`);
            setBooks(books.filter((book) => book.id !== id)); // Update the local state
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    // Group books by category (example categories)
    const categorizeBooks = () => {
        const categories = {};
        books.forEach((book) => {
            const category = book.category || "Uncategorized"; // Use "Uncategorized" if no category
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(book);
        });
        return categories;
    };

    const categorizedBooks = categorizeBooks();

    return (
        <div className="book-list-container">
            <h1>Book List</h1>
            {Object.keys(categorizedBooks).map((category) => (
                <div key={category} className="category-block">
                    <h2>{category}</h2>
                    <ul>
                        {categorizedBooks[category].map((book) => (
                            <li key={book.id}>
                                {book.title} by {book.author} - ${book.price}
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BookList;
