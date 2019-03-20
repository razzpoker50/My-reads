import React from "react";
import Book from "./Book";

const BookShelf = props => {
  const { books, shelfKey, shelfTitle } = props;

  function updateShelf(book, toShelf) {
    props.updateShelf(book, shelfKey, toShelf);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            return (
              <Book
                key={book.name}
                {...book}
                shelfKey={shelfKey}
                updateShelf={updateShelf}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
