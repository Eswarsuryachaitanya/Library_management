package com.library.controller;

import com.library.model.Book;
import com.library.service.Bookservice; // Service interface for book operations
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class Bookcontroller { // Corrected class name to follow PascalCase

    @Autowired
    private Bookservice bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if the book is not found
        }
    }

    @PostMapping
    public ResponseEntity<String> addBook(@RequestBody Book book) {
        // Ensure the `category` field is included in the request payload
        if (book.getCategory() == null || book.getCategory().isEmpty()) {
            return ResponseEntity.badRequest().body("Category is required");
        }
        bookService.addBook(book);
        return ResponseEntity.ok("Book added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBook(@PathVariable Long id, @RequestBody Book book) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("Invalid book ID");
        }
        // Validate the `category` field
        if (book.getCategory() == null || book.getCategory().isEmpty()) {
            return ResponseEntity.badRequest().body("Category is required");
        }
        book.setId(id);
        bookService.updateBook(book);
        return ResponseEntity.ok("Book updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("Invalid book ID");
        }
        bookService.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully");
    }
}
