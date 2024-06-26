import { useState } from "react";
import "../App.css";

// Components
import Dealer from "./Dealer.jsx";
import Player from "./Player.jsx";
import Deck from "./Deck.jsx";
import Wins from "./Wins.jsx";

function Table(props) {
  return (
    <>
      <div className="wins-container">
        <Wins props={props.wins} />
      </div>
      <div className="deak-me-in-container">
        {props.startGame ? null : (
          <button onClick={props.onDealClick}>Deal Me In</button>
        )}
      </div>
      <div className="deck-container">
        <Deck deck={props.cards} />
        {console.log(props)}
      </div>

      {/* dealer and player containers */}
      <div className="dealer-and-player-containers">
        <div className="dealer-container container">
          <Dealer score={props.dealerScore} hand={props.dealerHand} />
        </div>

        <div className="player-container container">
          <Player score={props.playerScore} hand={props.playerHand} />
          <div className="hit-or-stand-container">
            {/* hide these two buttons if props.startGame is false */}
            {props.startGame ? (
              <>
                <button onClick={props.onHitClick}>Hit</button>
                <button onClick={props.onStandClick}>Stand</button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;

// players place their bets
// dealer deals other players cards (just 1 per player), then the dealer deals themself 1 face-up card
// dealer goes around again and deals everyone 1 more face-up card, but the dealer keeps this second card face-down
// then the dealer draws as many cards as is needed to get to 17 or more
// dealer goes clockwise and each player can hit or stand
// players dealt doubles can opt to split and take 2 simultaneous bets against the house. This is called "splitting" and maybe I'll get to it in the future
