import { useState } from "react";
import "./App.css";

// Components
import Table from "./Components/Table.jsx";

function App() {
  function createDeck() {
    // setInitialized to true to prevent re-rendering
    // when deck is created
    setInitialized(true);
    // create deck
    const suits = ["♠", "♥", "♦", "♣"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const tempDeck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        tempDeck.push(values[j] + suits[i]);
      }
    }
    setDeck(tempDeck);
  }

  //
  //
  //
  // handleDealClick
  //
  function handleDealClick() {
    resetHands();
    setDealMeIn(true);
    setStartGame(true);

    // kick off deal
    dealCards();
  }

  //
  //
  //
  //
  //
  // reset hands
  function resetHands() {
    setPlayerHand([]);
    setDealerHand([]);
  }

  const [deck, setDeck] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [startGame, setStartGame] = useState(false);
  if (!initialized) {
    createDeck();
  }
  const [dealMeIn, setDealMeIn] = useState(false);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [wins, setWins] = useState([{ player: 0 }, { dealer: 0 }]);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [finalTally, setFinalTally] = useState(null);

  //
  //
  //
  //
  //
  // deal cards
  function dealCards() {
    // shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);

    let tempPlayerHandToSendAsProps = [];
    let tempDealerHandToSendAsProps = [];
    // deal 1 card to player THEN 1 TO DEALER, then repeat until all players and dealer have 2 cards each

    for (let i = 0; i < 2; i++) {
      // deal 1 card to player
      let playerCard = deck.pop();
      tempPlayerHandToSendAsProps.push(playerCard);
      setPlayerHand((playerHand) => [...playerHand, playerCard]);
      // deal 1 card to dealer
      let dealerCard = deck.pop();
      tempDealerHandToSendAsProps.push(dealerCard);
      setDealerHand((dealerHand) => [...dealerHand, dealerCard]);
    }

    // set player and dealer scores by passing their hands to a function that will calculate their scores
    calculateScores(tempPlayerHandToSendAsProps, tempDealerHandToSendAsProps);
  }

  //
  //
  //
  //
  //
  //
  function calculateScores(playerHand, dealerHand, gameOver) {
    // calculate player score
    let playerScore = 0;
    for (let i = 0; i < playerHand.length; i++) {
      if (playerHand[i][0] === "A") {
        playerScore += 11;
      } else if (
        playerHand[i][0] === "K" ||
        playerHand[i][0] === "Q" ||
        playerHand[i][0] === "J"
      ) {
        playerScore += 10;
      } else {
        playerScore += parseInt(playerHand[i][0]);
      }
    }
    setPlayerScore(playerScore);
    // calculate dealer score
    let dealerScore = 0;
    for (let i = 0; i < dealerHand.length; i++) {
      if (dealerHand[i][0] === "A") {
        dealerScore += 11;
      } else if (
        dealerHand[i][0] === "K" ||
        dealerHand[i][0] === "Q" ||
        dealerHand[i][0] === "J"
      ) {
        dealerScore += 10;
      } else {
        dealerScore += parseInt(dealerHand[i][0]);
      }
    }
    setDealerScore(dealerScore);

    let allWins = wins;

    if (gameOver == true) {
      // if player score is higher, setWinner to player
      // if dealer score is higher, setWinner to dealer
      if (playerScore == 21) {
        alert("Blackjack!");
        setWinner("player");
        // setWins({ player: wins[0].player + 1 });
        updateWins("player");
      } else if (dealerScore == 21) {
        alert("Blackjack!");
        // setWins({ dealer: wins[0].dealer + 1 });
        updateWins("dealer");

        setWinner("dealer");
      } else if (playerScore > 21) {
        setWinner("dealer");
        updateWins("dealer");
        // get player wins
        // setWins({ dealer: wins[0].dealer + 1 });
      } else if (dealerScore > 21) {
        setWinner("player");
        updateWins("player");
        // setWins({ player: wins[0].player + 1 });
      } else if (playerScore > dealerScore) {
        setWinner("player");
        updateWins("player");
      } else if (playerScore < dealerScore) {
        // setWins({ dealer: wins[0] + 1 });
        updateWins("dealer");
        setWinner("dealer");
      } else {
        setWinner("tie");
      }
    }
  }

  //
  //
  //
  //
  //
  //
  //
  function updateWins(winner) {
    let totalPlayerWins = wins[0].player;
    let totalDealerWins = wins[1].dealer;
    if (winner == "player") {
      setWins([{ player: totalPlayerWins + 1 }, { dealer: totalDealerWins }]);
    } else if (winner == "dealer") {
      setWins([{ player: totalPlayerWins }, { dealer: totalDealerWins + 1 }]);
    }
  }

  //   function calculateScore(hand) {
  function calculateScore(hand) {
    // calculate score
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
      if (hand[i][0] === "A") {
        score += 11;
      } else if (
        hand[i][0] === "K" ||
        hand[i][0] === "Q" ||
        hand[i][0] === "J"
      ) {
        score += 10;
      } else {
        score += parseInt(hand[i][0]);
      }
    }
    setPlayerScore(score);
  }
  //
  //
  //
  //
  //
  //
  function dealSingleCard() {
    // take a single random card from the deck

    // add that random card to the player's hand
    let randomIndex = Math.floor(Math.random() * deck.length);
    let playerCard = deck.splice(randomIndex, 1)[0];
    setPlayerHand((playerHand) => [...playerHand, playerCard]);

    // call function calculate player score and pass it the player's hand
    calculateScore([...playerHand, playerCard], false);
  }

  function endPlayerTurn() {
    setFinalTally(true);
    // end player's turn, set props.startGame to false
    setStartGame(false);
    // player stood, so calculate dealer's score and players score and determine winner
    calculateScores([...playerHand], [...dealerHand], true);
  }

  return (
    <Table
      winner={winner}
      dealerScore={dealerScore}
      playerScore={playerScore}
      wins={wins}
      onHitClick={() => dealSingleCard()}
      onStandClick={() => endPlayerTurn()}
      dealMeIn={dealMeIn}
      playerHand={playerHand}
      dealerHand={dealerHand}
      startGame={startGame}
      initialized={initialized}
      onDealClick={() => handleDealClick()}
      cards={deck}
    />
  );
}

export default App;
