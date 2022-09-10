import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";




function EditDeck() {

    const { deckId } = useParams();
const history = useHistory();
const initialState = {
    id: "",
    name: "",
    description: "",
};
const [deck, setDeck] = useState(initialState);

useEffect(() => {
    async function loadReadDeck() {
        const abortController = new AbortController();
        try {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
        } catch (error) {
            console.error("error", error);
        }
        return () => {
            abortController.abort();
        };
    }
    loadReadDeck();
}, []);

async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
}

const handleChange = ({target}) => {
    setDeck({...deck, [target.name]: target.value})
}

const handleCancel = () =>{
    history.push(`/decks/${deckId}`)
}
    return (
    <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
        </nav>
        <form onSubmit={handleSubmit}>
            <h1>Edit Deck</h1>
            <div className="form">
                <label>Name</label>
                <input
                    id="name"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={deck.name}
                />
            </div>
            <div className="form">
                <label>Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={deck.description}
                />
            </div>
            <button
                className="btn btn-secondary"
                onClick={() => handleCancel()}>
                Cancel
            </button>
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        </form>
    </div>)
}

export default EditDeck;