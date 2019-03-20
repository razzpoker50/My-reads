import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { search, update } from "./BooksAPI";

class Search extends Component {
  state = {
    allBooks: []
  };

  handleSearch = e => {
    search(e.target.value).then(res => {
      if (Array.isArray(res)) {
        this.setState({
          allBooks: res
        });
      } else {
        this.setState({
          allBooks: []
        });
      }
    });
  };

  updateShelf = (book, shelf) => {
    update(book, shelf);
  };

  render() {
    const { allBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
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
                return (
                  <Book key={id} {...props} updateShelf={this.updateShelf} />
                );
              })}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
