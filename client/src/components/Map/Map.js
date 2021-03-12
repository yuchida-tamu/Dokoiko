import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { keys } from '../../keys/keys';
const Map = ({ location }) => {
  const { lat, lng } = location;
  const [zoom, setZoom] = useState(15);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAP_KEY || keys.GOOGLE_MAP_KEY,
        }}
        defaultCenter={
          { lat, lng } || {
            lat: 59.95,
            lng: 30.33,
          }
        }
        defaultZoom={zoom}
        center={{ lat, lng }}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
