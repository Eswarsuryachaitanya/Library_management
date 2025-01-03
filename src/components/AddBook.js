import React, { useState } from "react";
import "./AddBook.css";
import BookService from "../BookService";

const AddBook = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        price: "",
        category: "", // New field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        BookService.addBook(book)
            .then(() => {
                alert("Book added successfully");
                setBook({ title: "", author: "", price: "", category: "" }); // Reset form
            })
            .catch((error) => {
                console.error("Error adding book:", error);
                alert("Failed to add book");
            });
    };

    return (
        <div className="add-book-container">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Enter book title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        placeholder="Enter book price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        placeholder="Enter book category"
                        required
                    />
                </div>
                <button type="submit" className="add-button">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
