import React from "react";

const BookShelfChanger = props => {
  const handleChange = e => {
    props.updateShelf(e.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select onChange={handleChange} onBlur={handleChange}>
        <option value="move">Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
