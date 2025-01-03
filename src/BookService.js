import axios from 'axios';

const BASE_URL = "http://localhost:8082/api/books";

class BookService {
  // Fetch all books
  getBooks() {
    return axios.get(BASE_URL);
  }

  // Add a new book
  addBook(book) {
    return axios.post(BASE_URL, book);
  }

  // Delete a book by ID
  deleteBook(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

// Export an instance of BookService
const bookServiceInstance = new BookService();
export default bookServiceInstance;
