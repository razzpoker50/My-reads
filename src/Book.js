import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const Book = props => {
  const { id, authors, title, imageLinks } = props;

  const imageUrl =
    !!imageLinks && imageLinks.smallThumbnail ? imageLinks.smallThumbnail : "";
  const authorNames =
    !!authors && authors.length > 0 ? authors.join(", ") : "No author";

  function updateShelf(toShelf) {
    props.updateShelf({ id, authors, title, imageLinks }, toShelf);
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageUrl}")`
            }}
          />
          <BookShelfChanger updateShelf={updateShelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authorNames}</div>
      </div>
    </li>
  );
};

export default Book;
