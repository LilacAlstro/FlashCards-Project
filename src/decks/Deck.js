import React, {useState, useEffect} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index"


function Deck() {

    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadReadDeck() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                setCards(response.cards)
            } catch (error) {
                console.error("error", error);
            }
            return () => {
                abortController.abort();
            };
            
        }
        loadReadDeck();        
    }, [deckId]);

    const history = useHistory();

    const handleAddCard = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}/cards/new`)
    }

    const handleEditDeck = () => {
        history.push(`/decks/${deckId}/edit`)
    }

    const handleStudy = () =>{
        history.push(`/decks/${deckId}/study`);
    }

    async function handleDelete(deck) {
        if (window.confirm("You will not be able to recover it")){
            await deleteDeck(deck)
        }
       
        {
            history.push("/");
        }
    }

    async function handleDeleteCard(card){
        if(window.confirm("You will not be able to recover it")){
            await deleteCard(card)
        }
       
        {history.go(0)};
    }

    const handleEditCard = (card) =>{
        history.push(`/decks/${deckId}/cards/${card}/edit`);
    }

    
    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
            </nav>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{deck.name}</h2>
                    <p>{deck.description}</p>
                    <button
                        onClick={handleEditDeck}
                        className="btn btn-secondary"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleStudy}
                        className="btn btn-primary"
                    >
                        Study
                    </button>
                    <button
                        onClick={handleAddCard}
                        className="btn btn-primary"
                    >   
                        Add Cards
                    </button>
                    <button
                        onClick={() => handleDelete(deckId)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <h1>Cards</h1>
            {cards.map((card) => {
                return (
                    <div className="card-deck" key={card.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">{card.front}</div>
                                    <div className="col">{card.back}</div>
                                </div>
                                <div className="container row">
                                    <button
                                        onClick={() => handleEditCard(card.id)}
                                        className="btn btn-secondary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCard(card.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
    
};

export default Deck;