
import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {

    const initialFormState = {
        name: "",
        description: "",
    }

    const [formData, setFormData] = useState({...initialFormState});
        
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]:target.value,
        })
    }
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();        
        const response = await createDeck({...formData})
        history.push(`/decks/${response.id}`);
        return response;   
        
      };

      const handleCancel = () =>{
        history.push("/")
      }
    return (        
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to ="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Create Deck
                    </li>
                </ol>
            </nav>
            
        <form onSubmit={handleSubmit}>
        <h2>Create Deck</h2>
            <div className="form">                
            <label htmlFor="name">
               Name 
               <input
               id="name"
               type="text"
               name="name"
               onChange={handleChange}
               value={formData.name}
               placeholder="Deck Name"
               className="form-control">
               </input>
            </label>
            </div>
            <div className="form">              
            <label htmlFor="description">
                Description
                <textarea
                id="description"
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Brief description of the deck"
                className="form-control">
                </textarea>
            </label>
            </div>
            <button  className="btn btn-secondary mx-1" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-primary mx-1" type="submit">Submit</button>
        </form>
        </div>
        )
}

//breadcrumb: https://getbootstrap.com/docs/4.0/components/breadcrumb/
//form-control https://getbootstrap.com/docs/5.0/forms/form-control/

export default CreateDeck;