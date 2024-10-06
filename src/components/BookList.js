import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const BookList = () => {
    const [book, setBook] = useState([]);

    useEffect(() => {
        getBook();
    }, []);

    const getBook = async () => {
        const response = await axios.get('http://localhost:5000/book');
        setBook(response.data);
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/book/${id}`);
            getBook();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to="/book/add" className='button is-success'>Add New Book</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Category</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publication</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.category}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publication}</td>
                                <td>{book.stock}</td>
                                <td>
                                    <Link to={`/book/edit/${book.id}`} className="button is-small is-info">Edit</Link>
                                    <button onClick={() => deleteBook(book.id)} className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
