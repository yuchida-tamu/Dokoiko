import React, { useState, useEffect } from 'react';

import MiniNav from '../../components/MiniNav/MiniNav';
import photo from '../../testData/photos/test.jpg';
import { testEvent } from '../../testData/events';
import ItemCard from '../../components/ItemCard/ItemCard';

const initialEvents = [...testEvent];

const EventDashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [eventSelected, setEventSelected] = useState();

  const renderEventDetail = eventSelected ? (
    <div>
      <img src={photo} />
      <h4>{eventSelected.name}</h4>
      <div id='event-detail__content'>
        <div>
          <p>{eventSelected.description}</p>
          <span>Start: {eventSelected.startDate}</span>
          <br />
          <span>End: {eventSelected.endDate}</span>
          <br />
        </div>
        <div id='event-detail_content__actions' className='center-align'>
          <a className='btn-floating btn-medium waves-effect waves-light cyan darken-1'>
            <i className='material-icons'>location_on</i>
          </a>
          <a
            className='btn-floating btn-medium waves-effect waves-light cyan darken-1'
            style={{ margin: '0 15px' }}
          >
            <i className='material-icons'>bookmark_border</i>
          </a>
          <a className='btn-floating btn-medium waves-effect waves-light cyan darken-1'>
            <i className='material-icons'>info_outline</i>
          </a>
        </div>
      </div>
    </div>
  ) : null;

  const eventClickHandler = eventClicked => {
    setEventSelected(eventClicked);
  };

  const renderEvents = events.map(event => (
    <ItemCard item={event} click={eventClickHandler} photo={photo} />
  ));

  return (
    <div>
      <div className='SideControl container col l3 indigo darken-2'>
        <MiniNav />
        <div className='event-detail col l10 indigo lighten-4'>
          {renderEventDetail}
        </div>
      </div>
      <div id='event-dashboard' className='col l9 dashboard'>
        <ul className='row'>{renderEvents}</ul>
      </div>
    </div>
  );
};

export default EventDashboard;
