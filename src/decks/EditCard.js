import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard(){
    const {deckId, cardId} = useParams();
    const history= useHistory();
   
    const initialStateForDeck={
        id: "",
        name: "",
        description: "",
    }
    const [deck, setDeck] = useState(initialStateForDeck);
    const [card, setCard] = useState(undefined);

    const handleDone = () =>{
        history.push(`/decks/${deckId}`)
    }
    

    useEffect(() => {
        async function loadReadCard() {            
                const response = await readCard(cardId);
                setCard(response);           
        }
        loadReadCard();        
    }, [cardId]);

    useEffect(() => {
        async function loadReadDeck() {           
                const response = await readDeck(deckId);
                setDeck(response);
        }
        loadReadDeck();
    }, [deckId]);   

    
    

    

    async function handleSubmit(card) {       
        const response = await updateCard(
            { ...card },            
        );
        history.push(`/decks/${deckId}`);
        return response;
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
                    <li className="breadcrumb-item active">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
           {card &&<CardForm handlePrimary={handleSubmit} handleSecondary={handleDone} primaryButton="Submit" secondaryButton="Cancel" initialCard={card} />}
            
        </div>
    )

    /*return (
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
    )*/}

export default EditCard;