import React, { useEffect, useState } from "react";
import '../App.css';
import data from "../data/books.js";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";



export default function Dhuro() {
    const [books, setBooks] = useState(data);
    const [grade, setGrade] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [error, setError] = useState('');

    //on load get all books and set them to books and add a option is selected to each book

    useEffect(() => {
        //set books to the books from the database
        setBooks(data);
    }, [])

    const [selectedBooks, setSelectedBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const toggleBookSelection = (book) => {
      if (selectedBooks.includes(book)) {
        setSelectedBooks(selectedBooks.filter((selectedBook) => selectedBook !== book));
      } else {
        setSelectedBooks([...selectedBooks, book]);
      }
      console.log(selectedBooks)
    };
    const handleModal = () => {
      setShowModal(true);
    };


    const submit = () => {
      //submit the selected books to the database
      console.log('submitting')
      if(!name || !phone || !selectedBooks) {
        setError('Mungon Emri ose Numri i Telefonit');
        return;
      }
      axios.post('http://localhost:5000/add', {
        name: name,
        phone: phone,
        books: selectedBooks
      })
      .then(()=> {
        setSelectedBooks([])
        setShowModal(false)
        setError('')
        setName('')
        setPhone('')
      })
      .catch((error) => {
        console.log('');
        setSelectedBooks([])
        setShowModal(false)
        setError('')
        setName('')
        setPhone('')
      });

    }

    return (
      <div className="dhuro d-flex">
                {showModal && <div
            className="modal show"
            style={{ display: 'block', position: 'absolute' }}
            >
            <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>Dhuro Librat</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form.Group className="mb-3">
                <Form.Label>Emri Dhe Mbiemri</Form.Label>
                <Form.Control placeholder="Filan Fisteku" onChange={(e) => setName(e.target.value)} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numri i Telefonit</Form.Label>
                <Form.Control placeholder="04- --- ---" onChange={(e) => setPhone(e.target.value)} required/>
              </Form.Group>
            
                
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)} required>Anulo</Button>
                <Button variant="primary" onClick={() => submit()}>Dhuro</Button>
                <small className="text-danger">{error}</small>
                </Modal.Footer>
            </Modal.Dialog>
            </div>}


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
              <small className="card-text">Botuesi: {book.publisher}</small>
            </div>
          </div>
        )))}
        <button className="btn btn-primary dhuro-btn" onClick={handleModal }>Dhuro</button>
        
      </div>
    );
  }
