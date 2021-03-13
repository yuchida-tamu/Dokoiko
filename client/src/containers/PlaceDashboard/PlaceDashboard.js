import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniNav from '../../components/MiniNav/MiniNav';
import ItemCard from '../../components/ItemCard/ItemCard';
import { testPlaceNew } from '../../testData/places';
import Map from '../../components/Map/Map';
//temporary photo data
import photo from '../../testData/photos/gallery.jpg';
const initialPlaces = [...testPlaceNew];

const PlaceDashboard = () => {
  const [places, setPlaces] = useState(initialPlaces);
  const [isExpanded, setIsExpanded] = useState(true);
  const [placeSelected, setPlaceSelected] = useState(places[0]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  //fetch places data and set it to the state
  //only when the component is rendered for the first time
  const fetchPlaces = () => {
    axios
      .get('/api/v1/place')
      .then(response => {
        console.log('response: ', response);
        setPlaces(response.data.places);
      })
      .catch(err => console.log('error: ', err));
  };

  const renderPlaceDetail = placeSelected ? (
    <div>
      <img src={photo} />
      <h4>{placeSelected.name}</h4>
      <div id='event-detail__content'>
        <div>
          <p>{placeSelected.description}</p>
          <span>Address: {placeSelected.address}</span>
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

  const expandHandler = () => {
    const bool = !isExpanded;
    setIsExpanded(bool);
  };
  const clickHnadler = place => {
    //update selectedPlace
    setPlaceSelected(place);
  };

  //horizontally scroll the list only when the dashboard is shrinked
  const onWheelScrollHandler = event => {
    //Do something(horizontal scroll logic?)
  };

  const renderPlaces = places.map(place => (
    <ItemCard
      item={place}
      isExpanded={isExpanded}
      click={() => {
        clickHnadler(place);
      }}
    />
  ));

  const dashboardStyle = isExpanded
    ? 'dashboard-framework dashboard-framework-expanded l9'
    : 'dashboard-framework dashboard-framework-shrinked l9';

  const placeListStyle = isExpanded
    ? 'col l12 dashboard place-list-expanded'
    : ' dashboard place-list-shrinked';

  const map = isExpanded ? null : <Map location={placeSelected.location} />;

  const dashboardIcon = isExpanded ? 'expand_more' : 'expand_less';

  return (
    <div className='row Main-container' style={{ height: '90vh' }}>
      <div className='SideControl container col l3 indigo darken-2'>
        <MiniNav />
        <div className='event-detail col l10 indigo lighten-4'>
          {renderPlaceDetail}
        </div>
      </div>
      <div className='col l9 content-frame'>
        {map}
        <div className={dashboardStyle}>
          <div
            className='indigo darken-3 dashboard-control-bar valign-wrapper'
            onClick={expandHandler}
          >
            <i className='small material-icons '>{dashboardIcon}</i>
          </div>

          <ul
            className={placeListStyle}
            style={{ height: '100%' }}
            onWheel={onWheelScrollHandler}
          >
            <div class='l1'></div>
            {renderPlaces}
            <div class='l1'></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceDashboard;
