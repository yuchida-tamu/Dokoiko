import React, { useState } from 'react';
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
  const [placeSelected, setPlaceSelected] = useState();

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
  const renderPlaces = places.map(place => (
    <ItemCard
      item={place}
      click={() => {
        clickHnadler(place);
      }}
    />
  ));

  const dashboardStyle = isExpanded
    ? 'dashboard-framework dashboard-framework-expanded '
    : 'dashboard-framework dashboard-framework-shrinked ';

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
          <div className='col l12 dashboard'>
            <ul className='row' style={{ height: '100%' }}>
              {renderPlaces}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDashboard;
