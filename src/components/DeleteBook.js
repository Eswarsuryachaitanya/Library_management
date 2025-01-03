import React from 'react';
import BookService from './BookService';

const DeleteBook = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await BookService.deleteBook(bookId);
      alert(`Book with ID ${bookId} has been deleted.`);
      onDelete(); // Callback to refresh the book list
    } catch (error) {
      console.error('Error deleting the book:', error);
      alert('Failed to delete the book. Please try again.');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteBook;
