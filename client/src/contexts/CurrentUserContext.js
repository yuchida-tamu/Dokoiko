import React, { useState, createContext, useContext } from 'react';

const CurrentUserContext = createContext({
  user: {},
  setUser: () => {},
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
    plans: [],
    favorite_places: [],
    favorite_events: [],
  });
  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
