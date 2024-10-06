import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publication, setPublication] = useState("");
    const [stock, setStock] = useState("");
    const navigate = useNavigate();

    const saveBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/book', {
                category,
                title,
                author,
                publication,
                stock
            });
            navigate("/book");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveBook}>
                    <div className="field">
                        <label className="label">Category</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Category"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Author"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Publication</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={publication}
                                onChange={(e) => setPublication(e.target.value)}
                                placeholder="Publication"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Stock</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Stock"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
