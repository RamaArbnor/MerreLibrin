import React, { useEffect, useState, useRef } from "react";
import data from "../data/books.js";
import axios from "axios";

export default function Dhuro() {
    const [books, setBooks] = useState(data);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const modalRef = useRef(null);

    useEffect(() => {
        setBooks(data);
    }, []);

    const toggleBookSelection = (book) => {
        if (selectedBooks.includes(book)) {
            setSelectedBooks(selectedBooks.filter((selectedBook) => selectedBook !== book));
        } else {
            setSelectedBooks([...selectedBooks, book]);
        }
    };

    const handleModal = () => {
        setShowModal(true);
        setTimeout(() => {
            modalRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const submit = () => {
        if (!name || !phone || selectedBooks.length === 0) {
            setError("Mungon Emri, Numri i Telefonit, ose librat e zgjedhur");
            return;
        }

        axios
            .post("https://merre-librin-server.vercel.app/add", {
                name,
                phone,
                books: selectedBooks,
            })
            .then(() => {
                setSelectedBooks([]);
                setShowModal(false);
                setError("");
                setName("");
                setPhone("");
            })
            .catch((error) => {
                console.error(error);
                setSelectedBooks([]);
                setShowModal(false);
                setError("");
                setName("");
                setPhone("");
            });
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.bookName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = selectedGrade === "" || book.grade === parseInt(selectedGrade);
        return matchesSearch && matchesGrade;
    });

    return (
        <div className="dhuro-container">
            {showModal && (
                <div
                    className="modal show"
                    style={{ display: "block", position: "absolute" }}
                    ref={modalRef}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Dhuro Librat</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Emri Dhe Mbiemri</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Filan Fisteku"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Numri i Telefonit</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="04- --- ---"
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Anulo
                                </button>
                                <button type="button" className="btn btn-primary" onClick={submit}>
                                    Dhuro
                                </button>
                                <small className="text-danger">{error}</small>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Kërko libër..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="grade-select"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                >
                    <option value="">Zgjedh Klasën</option>
                    <option value={1}>Klasa 1</option>
                    <option value={2}>Klasa 2</option>
                    <option value={3}>Klasa 3</option>
                    <option value={4}>Klasa 4</option>
                    <option value={5}>Klasa 5</option>
                    <option value={6}>Klasa 6</option>
                    <option value={7}>Klasa 7</option>
                    <option value={8}>Klasa 8</option>
                    <option value={9}>Klasa 9</option>
                </select>
            </div>

            <div className="books-container">
                {filteredBooks.map((book) => (
                    <div
                        className={`book-card ${selectedBooks.includes(book) ? "selected" : ""}`}
                        key={book.bookName}
                        onClick={() => toggleBookSelection(book)}
                    >
                        <h5>{book.bookName}</h5>
                        <p>Klasa: {book.grade}</p>
                        <p>Botuesi: {book.publisher}</p>
                    </div>
                ))}
            </div>

            <button className="btn btn-primary dhuro-btn" onClick={handleModal}>
                Dhuro
            </button>
        </div>
    );
}
