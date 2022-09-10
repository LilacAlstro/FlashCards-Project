import React from "react";
import {Link} from "react-router-dom";
import DeckList from "./DeckList";


function Home() {


    return (
        <div className="container">
            <Link to="/decks/new">
                <button type="button" className="btn btn-secondary">
                    <p>Create Deck</p>
                </button>
            </Link>

            <DeckList />

        </div>
     )
}

export default Home;