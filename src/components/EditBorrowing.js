import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBorrowing = () => {
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const [borrowFor, setBorrowFor] = useState(2);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchBorrowingById();
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

    const updateBorrowing = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/borrowing/${id}`, {
                userId,
                bookId,
                borrowFor
            });
            navigate("/borrowing");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBorrowingById = async () => {
        const response = await axios.get(`http://localhost:5000/borrowing/${id}`);
        setUserId(response.data.userId);
        setBookId(response.data.bookId);
        setBorrowFor(response.data.borrowFor);
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateBorrowing}>
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
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBorrowing;
