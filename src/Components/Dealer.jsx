import { useState } from "react";

// Components
// import Card from "./Card.jsx";
import Hand from "./Hand.jsx";

function Dealer(props) {
  return (
    <div className="dealer">
      {console.log("dealer props!", props)}
      <h2>Dealer</h2>
      <h3>Score:</h3> <h1>{props.score}</h1>
      <Hand props={props} />
    </div>
  );
}

export default Dealer;
