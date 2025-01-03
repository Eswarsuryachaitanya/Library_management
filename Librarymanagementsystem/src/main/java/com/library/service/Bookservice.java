package com.library.service;

import com.library.model.Book;
import com.library.repository.Bookrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Bookservice {

    @Autowired
    private Bookrepository bookRepository;

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.getAllBooks();
    }

    // Get a book by ID
    public Book getBookById(Long id) {
        return bookRepository.getBookById(id);
    }

    // Add a new book
    public void addBook(Book book) {
        bookRepository.addBook(book); // This will now set the ID after insertion
    }

    // Update an existing book
    public void updateBook(Book book) {
        bookRepository.updateBook(book);
    }

    // Delete a book
    public void deleteBook(Long id) {
        bookRepository.deleteBook(id);
    }
}
