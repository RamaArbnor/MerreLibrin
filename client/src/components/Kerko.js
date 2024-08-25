import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Kerko() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('https://merre-librin-server.vercel.app/entries')
            .then((response) => {
                setEntries(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredEntries = entries.filter(entry =>
        entry?.books?.some(book => book?.bookName.toLowerCase().includes(searchTerm))
    );

    return (
        <div className="container-kerko">
            <input
                type="text"
                placeholder="Kerko me emer librin..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
                {isLoading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="entries">
                        {filteredEntries.length === 0 ? (
                            <h1>Nuk ka libra ende ...</h1>
                        ) : (
                            filteredEntries.map((entry, index) => (
                                <div className="entry" key={index}>
                                    <h2>{entry?.name}</h2>
                                    <p>Phone: {entry?.phone}</p>
                                    <h3>Books:</h3>
                                    {entry?.books.length > 0 ? (
                                        <ul>
                                            {entry?.books.map((book, bookIndex) => (
                                                <li key={bookIndex}>
                                                    <strong>{book?.bookName}</strong> - {book?.publisher}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No books listed.</p>
                                    )}
                                    {/* <button>View More</button> */}
                                </div>
                            ))
                        )}
                    </div>
                )}
        </div>
    );
}
