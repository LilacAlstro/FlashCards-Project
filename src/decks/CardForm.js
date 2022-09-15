import React, { useState, useEffect } from "react";


function CardForm({ initialCard, handlePrimary, handleSecondary, primaryButton, secondaryButton }){


    const initialStateForCard={
        id: initialCard?.id ?? "",
        front: initialCard?.front ?? "",
        back: initialCard?.back ?? "",
        deckId: initialCard?.deckId ?? "",
    }
    console.log(initialStateForCard);
    const [card, setCard] = useState(initialStateForCard);

    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }   

    const handleButton = (event) => { 
        event.preventDefault();          
        handlePrimary(card);
    }    

    useEffect(() => {
    console.log(initialCard);
    }, [initialCard]);

    return (        
        <div>
            <form>            
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
                    <button className="btn btn-secondary" onClick={() => handleSecondary()}>
                        {`${secondaryButton}`}
                    </button>
                    <button className="btn btn-primary" onClick={handleButton}>
                        {`${primaryButton}`}
                    </button>
                </form>              
        </div>
    )
}

export default CardForm;