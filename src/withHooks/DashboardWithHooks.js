import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../BookShelf";
import { getAll } from "../BooksAPI";
import { update } from "../BooksAPI";

export const SHELFS = {
  currentlyReading: {
    shelfKey: "currentlyReading",
    shelfTitle: "Currently Reading"
  },
  read: {
    shelfKey: "read",
    shelfTitle: "Read"
  },
  wantToRead: {
    shelfKey: "wantToRead",
    shelfTitle: "Want To Read"
  }
};

const BOOK_SHELFS = [
  {
    shelfKey: SHELFS.currentlyReading.shelfKey,
    shelfTitle: "Currently Reading",
    books: []
  },
  {
    shelfKey: SHELFS.read.shelfKey,
    shelfTitle: "Read",
    books: []
  },
  {
    shelfKey: SHELFS.wantToRead.shelfKey,
    shelfTitle: "Want to Read",
    books: []
  }
];

const Dashboard = () => {
  const [bookShelfs, setBookShelfs] = useState(BOOK_SHELFS);

  useEffect(() => {
    getAll().then(books => {
      const updatedBookShelfs = books.reduce(
        (acc, book) => {
          const shelf = book.shelf;
          const currShelf = acc.find(bookShelf => bookShelf.shelfKey === shelf);

          if (!!currShelf) {
            currShelf.books = [...currShelf.books, book];
          } else {
            acc.push({
              ...SHELFS[shelf],
              books: [book]
            });
          }
          return acc;
        },
        [...BOOK_SHELFS]
      );

      setBookShelfs(updatedBookShelfs);
    });
  }, []);

  function updateShelfAndRefresh(book, fromShelf, toShelf) {
    update(book, toShelf).then(() => {
      refreshShelf(book, fromShelf, toShelf);
    });
  }

  function refreshShelf(updatedBook, fromShelf, toShelf) {
    const updatedBookShelfs = bookShelfs.map(bookShelf => {
      if (bookShelf.shelfKey !== fromShelf && bookShelf.shelfKey !== toShelf) {
        return bookShelf;
      } else if (bookShelf.shelfKey === toShelf) {
        return {
          ...bookShelf,
          books: [...bookShelf.books, updatedBook]
        };
      } else {
        const { books } = bookShelf;
        const updatedBooks = books.filter(book => book.id !== updatedBook.id);

        return {
          ...bookShelf,
          books: [...updatedBooks]
        };
      }
    });

    setBookShelfs(updatedBookShelfs);
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelfs.map(({ shelfKey, shelfTitle, books }) => {
            return (
              <BookShelf
                key={shelfKey}
                books={books}
                shelfKey={shelfKey}
                shelfTitle={shelfTitle}
                updateShelf={updateShelfAndRefresh}
              />
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Dashboard;
