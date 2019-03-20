import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "../Book";
import { search, update } from "../BooksAPI";

const SearchWithHooks = props => {
  const [allBooks, setAllBooks] = useState([]);
  const [searchTerm, setSearchterm] = useState("horror");

  useEffect(() => {
    search(searchTerm).then(res => {
      if (Array.isArray(res)) {
        setAllBooks(res);
      } else {
        setAllBooks([]);
      }
    });
  }, [searchTerm]);

  const handleSearch = e => {
    setSearchterm(e.target.value);
  };

  const updateShelf = (book, shelf) => {
    update(book, shelf);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="search-books-results">
        {allBooks.length === 0 ? (
          <h3>No results. please enter a search term</h3>
        ) : (
          <ol className="books-grid">
            {allBooks.map(({ id, authors, title, imageLinks }) => {
              const props = {
                id,
                authors,
                title,
                imageLinks
              };
              return <Book key={id} {...props} updateShelf={updateShelf} />;
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchWithHooks;
