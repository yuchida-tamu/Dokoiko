import React, { useState, createContext, useContext } from 'react';

const CurrentUserContext = createContext({
  user: {},
  setUser: () => {},
});

export const CurrentUserContextProvider = ({ children }) => {
  //set up user state to store current user info
  const [user, setUser] = useState({
    id: undefined,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
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
