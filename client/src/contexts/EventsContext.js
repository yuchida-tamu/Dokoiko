import React, { useState, createContext, useContext } from 'react';
import { testEvent } from '../testData/events';

//the app context in which it holds all events data fetched from db

const EventsContext = createContext({
  events: [],
  setEvents: () => {},
});

export const EventsContextProvider = () => {
  const [events, setEvents] = useState([...testEvent]);

  return (
    <EventsContext.Provider value={(events, setEvents)}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => useContext(EventsContext);
