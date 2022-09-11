import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";


function Study() {

    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, isFront] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function loadReadDeck() {
            const abortController = new AbortController();
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
            setCards(response.cards);
            return () => {
                abortController.abort();
            };
        }
        loadReadDeck();
    }, [deckId]);

    const handleFlip = () => {
        if (front){
            isFront(false)
        }
        else{isFront(true)}
    }

    function nextCard(index, total) {
        console.log(index);
        if (index < total) {
            setCardNumber(cardNumber + 1);
            isFront(true);
        } else {
            if (
                window.confirm(
                    `Restart Deck?`
                )
            ) {
                setCardNumber(1);
                isFront(true);
            } else {
                history.push("/");
            }
        }
    }


    function nextButton(cards, index) {
        if (front) {
            return null;
        } else {
            return (
                <button
                    onClick={() => nextCard(index + 1, cards.length)}
                    className="btn btn-primary"
                >
                    Next
                </button>
            );
        }
    }

    const handleAddCard = (event) => {
        event.preventDefault();
        history.push(`/decks/${deckId}/cards/new`)
    }

    if (cards.length>2){return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to = "/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link>{deck.name}</Link>                          
                    </li>
                    <li className="breadcrumb-item active">
                        Study
                    </li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>

                {cards.map((card,index) =>{
                    if (index === cardNumber - 1){
                        return (
                            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{`Card ${index + 1} of ${cards.length}`}</h2>
                    <p className="card-text">{front ? card.front : card.back}</p>
                    <button type="button" class="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {nextButton(cards, index)}                    
                </div>
            </div>
                        )
                    }
                })}            
         </div>
        )
    }
    else{
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
                        <Link>{deck.name}</Link>                          
                    </li>
                    <li className="breadcrumb-item active">
                        Study
                    </li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            <h2>Not Enough cards.</h2>
            <h3>You need at least 3 cards to study. There are {cards.length} cards in this deck.</h3>
            <button className="btn btn-primary" onClick={handleAddCard}>Add cards</button>
        </div>
        );}    
}

//breadcrumb: https://getbootstrap.com/docs/4.0/components/breadcrumb/
//card: https://getbootstrap.com/docs/4.0/components/card/


export default Study;