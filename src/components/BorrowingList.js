import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const BorrowingList = () => {
    const [borrowings, setBorrowings] = useState([]);

    useEffect(() => {
        getBorrowings();
    }, []);

    const getBorrowings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/borrowing');
            const borrowingsData = response.data;
    
            // Fetch user and book details
            const borrowingsWithDetails = await Promise.all(borrowingsData.map(async (borrowing) => {
                const userResponse = await axios.get(`http://localhost:5000/user/${borrowing.userId}`);
                const bookResponse = await axios.get(`http://localhost:5000/book/${borrowing.bookId}`);
                return {
                    ...borrowing,
                    user: userResponse.data, // Fetch user details
                    book: bookResponse.data, // Fetch book details
                };
            }));
    
            setBorrowings(borrowingsWithDetails);
        } catch (error) {
            console.error("Error fetching borrowings:", error);
        }
    };
    

    const deleteBorrowing = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/borrowing/${id}`);
            getBorrowings();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to="/borrowing/add" className='button is-success'>Add New</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Book</th>
                            <th>Borrow For</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.map((borrowing, index) => (
                            <tr key={borrowing.id}>
                                <td>{index + 1}</td>
                                <td>{borrowing.user.name}</td>
                                <td>{borrowing.book.title}</td>
                                <td>{borrowing.borrowFor} days</td>
                                <td>{borrowing.status}</td>
                                <td>
                                    <Link to={`/borrowing/edit/${borrowing.id}`} className="button is-small is-info">Edit</Link>
                                    <button onClick={() => deleteBorrowing(borrowing.id)} className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BorrowingList;
