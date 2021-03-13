import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniNav from '../../components/MiniNav/MiniNav';
import ItemCard from '../../components/ItemCard/ItemCard';
import { testPlaceNew } from '../../testData/places';
import Map from '../../components/Map/Map';

import { useCurrentUserContext } from '../../contexts/CurrentUserContext';

//temporary photo data
import photo from '../../testData/photos/gallery.jpg';
const initialPlaces = [...testPlaceNew];

const PlaceDashboard = () => {
  //current_user state
  const { user, setUser } = useCurrentUserContext();

  const [places, setPlaces] = useState(initialPlaces);
  const [isExpanded, setIsExpanded] = useState(true);
  const [placeSelected, setPlaceSelected] = useState(places[0]);

  //only when the component is rendered for the first time
  useEffect(() => {
    fetchPlaces();
  }, []);
  //fetch places data and set it to the state
  const fetchPlaces = () => {
    axios
      .get('/api/v1/place')
      .then(response => {
        setPlaces(response.data.places);
      })
      .catch(err => console.log('error: ', err));
  };

  //when the bookmark icon is clicked, add the event to the users favorite list(by adding its place_id)
  const onClickBookmarkHandler = () => {
    //check if the id already exists in the user's favorite list
    if (user.favorite_places.includes(placeSelected.place_id))
      return console.log('its alreadt added', user.favorite_places);
    let updatedArr = [...user.favorite_places];
    updatedArr.push(placeSelected.place_id);
    setUser({
      ...user,
      favorite_places: updatedArr,
    });
  };

  //Should I change the backend api so that the item track isBookmarked?

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
            onClick={onClickBookmarkHandler}
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
      key={place.id || place.place_id}
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
            <div className='l1'></div>
            {renderPlaces}
            <div className='l1'></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceDashboard;
