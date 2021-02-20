import React, { useState, useEffect } from "react";
import "./EventDashboard.css";
import MiniNav from "../components/MiniNav/MiniNav";
import photo from "../test.jpg";
import { testEvent } from "../testData/events";

const initialEvents = [...testEvent];

const EventDashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [eventSelected, setEventSelected] = useState();

  const renderEvents = events.map((event) => {
    return (
      <li
        key={event.id}
        className="col s12 m7 l2 event-card"
        onClick={() => {
          eventClickHandler(event);
        }}
      >
        <div className="card indigo darken-1 hoverable">
          <div className="card-image">
            <img src={photo} />
          </div>
          <h5 className="card-title">{event.name}</h5>
          <div className="card-content white-text">
            <p className="truncate">{event.description}</p>
          </div>
          <div className="card-action"></div>
        </div>
      </li>
    );
  });

  const renderEventDetail = eventSelected ? (
    <div>
      <img src={photo} />
      <h4>{eventSelected.name}</h4>
      <div id="event-detail__content">
        <div>
          <p>{eventSelected.description}</p>
          <span>Start: {eventSelected.startDate}</span>
          <br />
          <span>End: {eventSelected.endDate}</span>
          <br />
        </div>

        <div id="event-detail_content__actions" className="center-align">
          <a className="btn-floating btn-medium waves-effect waves-light cyan darken-1">
            <i className="material-icons">location_on</i>
          </a>
          <a
            className="btn-floating btn-medium waves-effect waves-light cyan darken-1"
            style={{ margin: "0 15px" }}
          >
            <i className="material-icons">bookmark_border</i>
          </a>
          <a className="btn-floating btn-medium waves-effect waves-light cyan darken-1">
            <i className="material-icons">info_outline</i>
          </a>
        </div>
      </div>
    </div>
  ) : null;
  const eventClickHandler = (eventClicked) => {
    setEventSelected(eventClicked);
  };

  return (
    <div>
      <div className="SideControl container col l3 indigo darken-2">
        {/* <div className="col l2 left MiniNav indigo darken-3">
          <div>
            <a className="btn-floating btn-medium  waves-effect waves-light indigo darken-4">
              <i className="material-icons">person</i>
            </a>
            <a className="btn-floating btn-medium  waves-effect waves-light indigo darken-4">
              <i className="material-icons">bookmark</i>
            </a>
            <a className="btn-floating btn-medium waves-effect waves-light indigo darken-4">
              <i className="material-icons">event</i>
            </a>
            <a className="btn-floating btn-medium  waves-effect waves-light indigo darken-4">
              <i className="material-icons">location_city</i>
            </a>
          </div>
        </div> */}
        <MiniNav />
        <div id="event-detail" className="col l10 indigo lighten-4">
          {renderEventDetail}
        </div>
      </div>
      <div id="event-dashboard" className="col l9 ">
        <ul className="row">{renderEvents}</ul>
      </div>
    </div>
  );
};

export default EventDashboard;
