import React, { useEffect, useState } from "react";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [editBook, setEditBook] = useState(null);

    // Fetch books from the backend
    const fetchBooks = async () => {
        const response = await fetch("http://localhost:8082/api/books");
        if (response.ok) {
            const data = await response.json();
            setBooks(data);
        } else {
            alert("Failed to fetch books");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Delete book
    const deleteBook = async (id) => {
        const response = await fetch(`http://localhost:8082/api/books/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Book deleted successfully");
            fetchBooks(); // Reload book list
        } else {
            alert("Failed to delete book");
        }
    };

    // Update book
    const handleUpdate = async (id, updatedBook) => {
        const response = await fetch(`http://localhost:8082/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
            alert("Book updated successfully");
            fetchBooks(); // Reload book list
            setEditBook(null); // Close edit form
        } else {
            alert("Failed to update book");
        }
    };

    return (
        <div>
            <h2>Books List</h2>

            {/* Edit book form */}
            {editBook && (
                <div>
                    <h3>Update Book</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(editBook.id, editBook);
                        }}
                    >
                        <input
                            type="text"
                            value={editBook.title}
                            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={editBook.author}
                            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                            placeholder="Author"
                        />
                        <input
                            type="number"
                            value={editBook.price}
                            onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
                            placeholder="Price"
                        />
                        <button type="submit">Update</button>
                        <button onClick={() => setEditBook(null)}>Cancel</button>
                    </form>
                </div>
            )}

            {/* Display books list */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.price}</td>
                            <td>
                                <button onClick={() => setEditBook(book)}>Edit</button>
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
