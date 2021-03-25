import React, { useState, createContext, useContext } from 'react';
import { visitingEvents } from '../testData/eventLists';
import { testPlace } from '../testData/places';
import { testEvent } from '../testData/events';

const CurrentUserContext = createContext({
  user: {},
  setUser: () => {},
  events: [],
  setEvents: () => {},
  places: [],
  setPlaces: () => {},
});

export const CurrentUserContextProvider = ({ children }) => {
  //set up user state to store current user info
  const [user, setUser] = useState({
    id: 'defaultId',
    username: 'testUsername',
    firstName: 'test',
    lastName: 'user',
    email: 'test@example.com',
    password: 'testPassword',
    plans: [...visitingEvents],
    favorite_places: [],
    favorite_events: [],
  });
  const [events, setEvents] = useState([...testEvent]);
  const [places, setPlaces] = useState([...testPlace]);
  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, events, setEvents, places, setPlaces }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
