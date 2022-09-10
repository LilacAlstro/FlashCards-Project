import React, {useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function DeckList(){

    
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function loadListDecks() {
            const abortController = new AbortController();
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error) {
                console.error("error", error);
            }
            return () => {
                abortController.abort();
            };
        }
        loadListDecks();        
    }, []);


    const history = useHistory();

    async function handleDelete(deck) {
        if (window.confirm("You will not be able to recover it")){
            await deleteDeck(deck)
        }
        {
            history.go(0);
        }
    }
        

    return(
        <div>
           {decks.map((deck) =>{
            return (
                <div className="card" key={deck.id}>
                    <div className="card-title">
                        {`${deck.name}`}
                    </div>

                    <div className="card-subtitle">
                        {`${deck.cards.length} cards`}
                    </div>

                    <div className="card-text">
                        {`${deck.description}`}
                    </div>

                    
                     <div className="button-containner">

                     <Link to={`/decks/${deck.id}`}>
                      <button className="btn btn-secondary">View Button</button>
                     </Link>

                     <Link to={`/decks/${deck.id}/study`}>
                      <button className="btn btn-primary">Study Button</button>
                      </Link>

                     <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>Delete Button</button>
                     </div>
                    
                </div>
            )
           })}
        </div>
    )
}

/*

Starter placeholder code, kept for personal reference.
 (
        <div>
        <div className="card">
            <div>
            <h2 className="card-title">Deck Title</h2>            
            <p className="card-text">Deck list text</p>

        <Link to="/decks/deckId">
            <button className="btn btn-secondary">View Button</button>
        </Link>

        <Link to="/decks/deckId/study">
            <button className="btn btn-primary">Study Button</button>
        </Link>

            <button className="btn btn-danger">Delete Button</button>
            </div>

        </div>
        </div>
    )
*/


export default DeckList;