import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readCard, readDeck, updateCard } from "../utils/api/index";

function EditCard(){
    const {deckId, cardId} = useParams();

    const initialStateForCard={
        id: "",
        front: "",
        back: "",
        deckId: "",
    }
    const [card, setCard] = useState(initialStateForCard);

    const initialStateForDeck={
        id: "",
        name: "",
        description: "",
    }

    const [deck, setDeck] = useState(initialStateForDeck)

    useEffect(() => {
        async function loadReadCard() {
            const abortController = new AbortController();
            try {
                const response = await readCard(cardId, abortController.signal);
                setCard(response);
            } catch (error) {
                console.error("error", error);
            }
            return () => {
                abortController.abort();
            };
        }
        loadReadCard();        
    }, []);

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
    
    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    const history= useHistory();

    async function handleSubmit(event) {
        event.preventDefault();        
        const response = await updateCard(
            { ...card },            
        );
        history.push(`/decks/${deckId}`);
        setCard(initialStateForCard);
        return response;
    }

    const handleCancel = () =>{
        history.push(`/decks/${deckId}`)
    }

    return (
    <div>
        <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to = "/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>                        
                    </li>
                    <li className="breadcrumb-item active">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <h3>Front</h3>
            <div className="form">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={card.front}
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
                        value={card.back}
                    />
                </div>
                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
    )}

export default EditCard;