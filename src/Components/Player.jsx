import { useState } from "react";
import "../App.css";

// Components
// import Card from "./Card.jsx";
import Hand from "./Hand.jsx";

function Player(props) {
  return (
    <>
      <div className="player">
        <h2>Player</h2>
        <h3>Score:</h3> <h1>{props.score}</h1>
        <Hand props={props} />
      </div>
    </>
  );
}

export default Player;
