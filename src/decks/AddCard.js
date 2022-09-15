import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function loadReadDeck() {
           
                const response = await readDeck(deckId);
                setDeck(response);
        }
        loadReadDeck();
    }, [deckId]);


    async function handleSubmit(card) {               
        const response = await createCard(
            deckId,
            { ...card },            
        );
        history.go(0);
       
        return response;
    }

    async function handleDone() {
        history.push(`/decks/${deckId}`);
    }

return (
    <div>
        <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>           
            <CardForm handlePrimary={handleSubmit} handleSecondary={handleDone} primaryButton="Save" secondaryButton="Done"/>        

    </div>
)
    
    
  /*  return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{deck.name}: Add Card</h2>
                <div className="form">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newCard.front}
                    />
                </div>
                <div className="form">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newCard.back}
                    />
                </div>
                <button className="btn btn-secondary" onClick={() => handleDone()}>
                    Done
                </button>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    );*/
}

export default AddCard;