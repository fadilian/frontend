import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBorrowing = () => {
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const [borrowFor, setBorrowFor] = useState(2);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchBooks();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/user');
        setUsers(response.data);
    };

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/book');
        setBooks(response.data);
    };

    const saveBorrowing = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/borrowing', {
                userId,
                bookId,
                borrowFor,
                status: "borrowed" // Automatically set status
            });
            navigate("/borrowing");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveBorrowing}>
                    <div className="field">
                        <label className="label">User</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Book</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
                                    <option value="">Select Book</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>{book.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Borrow For</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={borrowFor} onChange={(e) => setBorrowFor(e.target.value)}>
                                    {[...Array(14)].map((_, i) => (
                                        <option key={i + 2} value={i + 2}>{i + 2} days</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <button type='submit' className='button is-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBorrowing;
