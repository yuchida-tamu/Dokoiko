import React from 'react';

const Backdrop = ({ isVisible, click }) => (
  <div
    className={isVisible ? 'backdrop_dark' : 'backdrop_dark hidden'}
    onClick={click}
  ></div>
);

export default Backdrop;
