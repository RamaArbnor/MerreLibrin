import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';

export default function Kerko() {

    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://merre-librin-server.vercel.app/entries')
            .then((response) => {
                setEntries(response.data);
                console.log('success')
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
      <div className='container d-flex kerko'>

      {isLoading && <Spinner animation="border" role="status"  variant="success"/>}

      {entries.map((entry) => {
        return (
          <div
            className={`card p-3 m-2 col-1`}
            id='kerko-card'
            key={entry._id}

          >
            <div className="card-body">
              <h5 className="card-title">{entry.name}</h5>
              <p className="card-text">{entry.phone}</p>
              {/* <p className="card-text">{entry.books}</p> */}
              
                {entry.books.map((book) => {
                  return (
                    <div style={{marginBottom: '.5rem'}}>
                      <li>{book.bookName}</li>
                      <small>{book.publisher}</small>
                    </div>
                  )
                })}
              
            </div>  
          
          
          </div>
        )
      })}
      </div>

    )
}