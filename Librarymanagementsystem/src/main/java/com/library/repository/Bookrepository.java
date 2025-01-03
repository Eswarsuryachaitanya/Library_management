package com.library.repository;

import com.library.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Bookrepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Get all books
    public List<Book> getAllBooks() {
        String sql = "SELECT * FROM books";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Book.class));
    }

    // Get a book by ID
    public Book getBookById(Long id) {
        String sql = "SELECT * FROM books WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Book.class), id);
    }

    // Add a new book and retrieve the generated ID
    public int addBook(Book book) {
        String sql = "INSERT INTO books (title, author, price,category) VALUES (?, ?, ?,?)";
        // Insert the book and retrieve the generated ID
        jdbcTemplate.update(sql, book.getTitle(), book.getAuthor(), book.getPrice(),book.getCategory());

        // Retrieve the generated ID using the last_insert_id function
        String sqlId = "SELECT LAST_INSERT_ID()";
        Long generatedId = jdbcTemplate.queryForObject(sqlId, Long.class);

        // Set the generated ID to the book object
        book.setId(generatedId);

        return 1; // Return 1 to indicate success
    }

    // Update an existing book
    public int updateBook(Book book) {
        String sql = "UPDATE books SET title = ?, author = ?, price = ? category = ? WHERE id = ?";
        return jdbcTemplate.update(sql, book.getTitle(), book.getAuthor(), book.getPrice(),book.getCategory(), book.getId());
    }

    // Delete a book
    public int deleteBook(Long id) {
        String sql = "DELETE FROM books WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
