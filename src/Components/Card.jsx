function Card(props) {
  return (
    <div className="card">
      <h3>Card</h3>
      {/* render card */}
      <p>{props.card}</p>
    </div>
  );
}

export default Card;
