import React, { useState, createContext, useContext } from 'react';
import { testPlace } from '../testData/places';

//the app context in which it holds all place data fetched from db

const PlacesContext = createContext({
  places: [],
  setplaces: () => {},
});

export const placesContextProvider = () => {
  const [places, setplaces] = useState([...testPlace]);

  return (
    <PlacesContext.Provider value={(places, setplaces)}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlacesContext = () => useContext(PlacesContext);
