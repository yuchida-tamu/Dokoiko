import React, { useState } from "react";
import MiniNav from "../../components/MiniNav/MiniNav";
import ItemCard from "../../components/ItemCard/ItemCard";
import { testPlaceNew } from "../../testData/places";

const initialPlaces = [...testPlaceNew];

const PlaceDashboard = () => {
  const [places, setPlaces] = useState(initialPlaces);

  const clickHnadler = () => {
    console.log("click places");
  };
  const renderPlaces = places.map((place) => (
    <ItemCard item={place} click={clickHnadler} />
  ));

  return (
    <div>
      <div className="SideControl container col l3 indigo darken-2">
        <MiniNav />
        <div className="event-detail col l10 indigo lighten-4"></div>
      </div>
      <div className="indigo darken-2 dashboard-control-bar valign-wrapper">
        <i className="small material-icons">expand_more</i>
      </div>
      <div className="col l9 dashboard">
        <ul className="row">{renderPlaces}</ul>
      </div>
    </div>
  );
};

export default PlaceDashboard;
