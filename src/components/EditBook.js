import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publication, setPublication] = useState("");
    const [stock, setStock] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBookById();
    }, []);

    const updateBook = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/book/${id}`, {
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

    const getBookById = async () => {
        const response = await axios.get(`http://localhost:5000/book/${id}`);
        setCategory(response.data.category);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublication(response.data.publication);
        setStock(response.data.stock);
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateBook}>
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
                        <button type="submit" className="button is-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
