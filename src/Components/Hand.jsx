import { useState } from "react";

// Components
import Card from "./Card.jsx";

function Hand(props) {
  return (
    <div className="hand">
      {props.props.hand.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}

export default Hand;
