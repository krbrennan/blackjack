import { useState } from "react";

function Wins(props) {
  return (
    <>
      {console.log("le winner props!!", props)}
      {/* {console.log("dealer:  ", props[1]["dealer"])}
      {console.log("player:  ", props[0]["pleayer"])} */}
      {console.log("BING BONG", props.props[1].dealer)}
      <div className="player-wins">
        <h3>Player Wins</h3>
        <h4>{props.props[0].player}</h4>
      </div>

      <div className="dealer-wins">
        <h3>Dealer Wins</h3>
        <h4>{props.props[1].dealer}</h4>
      </div>
    </>
  );
}

export default Wins;
