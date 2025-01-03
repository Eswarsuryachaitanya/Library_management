import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookService from "../BookService";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({ title: "", author: "", price: "" });

    useEffect(() => {
        BookService.getBookById(id)
            .then((response) => setBook(response.data))
            .catch((error) => console.error("Error fetching book:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        BookService.updateBook(id, book)
            .then(() => {
                alert("Book updated successfully");
                navigate("/books");
            })
            .catch((error) => {
                console.error("Error updating book:", error);
            });
    };

    return (
        <div>
            <h2>Update Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;
