import React, { useEffect, useState } from "react";
import '../App.css';
import data from "../data/books.js";


export default function Dhuro() {
    const [books, setBooks] = useState(data);
    const [grade, setGrade] = useState();

    //on load get all books and set them to books and add a option is selected to each book

    useEffect(() => {
        //set books to the books from the database
        setBooks(data);
    }, [])

    const [selectedBooks, setSelectedBooks] = useState([]);

    const toggleBookSelection = (book) => {
      if (selectedBooks.includes(book)) {
        setSelectedBooks(selectedBooks.filter((selectedBook) => selectedBook !== book));
      } else {
        setSelectedBooks([...selectedBooks, book]);
      }
      console.log(selectedBooks)
    };
  
    return (
      <div className="dhuro d-flex">
              <div>
        <label htmlFor="gradeSelector" className="text-center text-white m-2">Zgjedh Klasen:</label>
        <select
          id="gradeSelector"
          onChange={(e) => setGrade(e.target.value)}
          value={grade}
        >
          <option value="">All</option>
          <option value={1}>Klasa 1</option>
          <option value={2}>Klasa 2</option>
          <option value={3}>Klasa 3</option>
          <option value={4}>Klasa 4</option>
          <option value={5}>Klasa 5</option>
          <option value={6}>Klasa 6</option>
          <option value={7}>Klasa 7</option>
          <option value={8}>Klasa 8</option>
          <option value={9}>Klasa 9</option>
          {/* Add more grade options as needed */}
        </select>
      </div>
        {books.map((book) => (
          ((grade === '' || parseInt(book.grade) === parseInt(grade)) && 
            <div
            className={`card p-3 m-3 col-1 ${selectedBooks.includes(book) ? 'selected' : ''}`}
            key={book.bookName}
            onClick={() => toggleBookSelection(book)}
          >
            <div className="card-body">
              <h5 className="card-title">{book.bookName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{book.publisher}</h6>
              <p className="card-text">Klasa: {book.grade}</p>
            </div>
          </div>
        )))}
        <button className="btn btn-primary dhuro-btn">Dhuro</button>
        
      </div>
    );
  }
