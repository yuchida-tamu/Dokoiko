import React from "react";

const ItemCard = (props) => (
  <li
    key={props.item.id}
    className="col s12 m7 l2 item-card"
    onClick={() => {
      props.click(props.item);
    }}
  >
    <div className="card indigo darken-1 hoverable">
      <div className="card-image">
        <img src={props.photo} />
      </div>
      <h5 className="card-title">{props.item.name}</h5>
      <div className="card-content white-text">
        <p className="truncate">{props.item.description}</p>
      </div>
      <div className="card-action"></div>
    </div>
  </li>
);

export default ItemCard;
