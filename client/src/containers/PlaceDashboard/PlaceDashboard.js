import React, { useState } from "react";
import MiniNav from "../../components/MiniNav/MiniNav";
import ItemCard from "../../components/ItemCard/ItemCard";
import { testPlaceNew } from "../../testData/places";

const initialPlaces = [...testPlaceNew];

const PlaceDashboard = () => {
  const [places, setPlaces] = useState(initialPlaces);
  const [isExpanded, setIsExpanded] = useState(true);

  const expandHandler = () => {
    const bool = !isExpanded;
    setIsExpanded(bool);
  };
  const clickHnadler = () => {
    console.log("click places");
  };
  const renderPlaces = places.map((place) => (
    <ItemCard item={place} click={clickHnadler} />
  ));

  const dashboardStyle = isExpanded
    ? "dashboard-framework dashboard-framework-expanded "
    : "dashboard-framework dashboard-framework-shrinked ";

  const dashboardIcon = isExpanded ? "expand_more" : "expand_less";

  return (
    <div className="row Main-container" style={{ height: "90vh" }}>
      <div className="SideControl container col l3 indigo darken-2">
        <MiniNav />
        <div className="event-detail col l10 indigo lighten-4"></div>
      </div>
      <div className="col l9 content-frame">
        <div className={dashboardStyle}>
          <div
            className="indigo darken-3 dashboard-control-bar valign-wrapper"
            onClick={expandHandler}
          >
            <i className="small material-icons ">{dashboardIcon}</i>
          </div>
          <div className="col l12 dashboard">
            <ul className="row" style={{ height: "100%" }}>
              {renderPlaces}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDashboard;
