import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../decks/Home";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../decks/CreateDeck";
import Study from "../decks/Study";
import Deck from "../decks/Deck";
import EditDeck from "../decks/EditDeck"
import AddCard from "../decks/AddCard";
import EditCard from "../decks/EditCard";


function Layout() {
  return (
      <>
          <Header />
          <div className="container">
              <Switch>
                  <Route exact path="/">
                      <Home />
                  </Route>
                  <Route path="/decks/new">
                      <CreateDeck />
                  </Route>
                  <Route exact path="/decks/:deckId">
                      <Deck />
                  </Route>
                  <Route path="/decks/:deckId/study">
                      <Study />
                  </Route>
                  <Route path="/decks/:deckId/edit">
                      <EditDeck />
                  </Route>
                  <Route path="/decks/:deckId/cards/new">
                      <AddCard />
                  </Route>
                  <Route path="/decks/:deckId/cards/:cardId/edit">
                      <EditCard />
                  </Route>
                  <NotFound />
              </Switch>
          </div>
      </>
  );
}

export default Layout;
