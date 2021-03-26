import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniNav from '../../components/MiniNav/MiniNav';
import ItemCard from '../../components/ItemCard/ItemCard';
import { testPlaceNew } from '../../testData/places';
import Map from '../../components/Map/Map';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';

import { useCurrentUserContext } from '../../contexts/CurrentUserContext';

import { compareByDate } from '../../helpers/helper';

//temporary photo data
import photo from '../../testData/photos/gallery.jpg';
const initialPlaces = [...testPlaceNew];

const PlaceDashboard = () => {
  //current_user state
  const { user, setUser, places, setPlaces } = useCurrentUserContext();

  //const [places, setPlaces] = useState(initialPlaces);
  const [isExpanded, setIsExpanded] = useState(true);
  const [placeSelected, setPlaceSelected] = useState(places[0]);
  const [isShowModal, setIsShowModal] = useState(false);

  //only when the component is rendered for the first time
  useEffect(() => {
    setUser({ ...user, plans: initSortPlans(user.plans) });
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

  const initSortPlans = arr => {
    const result = [...arr];
    return result.sort(compareByDate);
  };

  //when the favorite icon is clicked, add the event to the users favorite list(by adding its place_id)
  //toggles it
  const onClickFavoriteHandler = () => {
    //check if the id already exists in the user's favorite list
    if (user.favorite_places.includes(placeSelected.place_id)) {
      const removed = user.favorite_places.filter(
        p => p != placeSelected.place_id
      );
      setUser({
        ...user,
        favorite_places: removed,
      });

      return;
    }
    let updatedArr = [...user.favorite_places];
    updatedArr.push(placeSelected.place_id);
    setUser({
      ...user,
      favorite_places: updatedArr,
    });
  };

  const onClickToShowModalHandler = () => {
    const toggle = !isShowModal;
    setIsShowModal(toggle);
  };

  //Should I change the backend api so that the item track isFavoriteed?

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
          <div
            className='btn-floating btn-medium waves-effect waves-light cyan darken-1'
            onClick={onClickToShowModalHandler}
          >
            <i className='material-icons'>location_on</i>
          </div>
          <div
            className='btn-floating btn-medium waves-effect waves-light cyan darken-1'
            style={{ margin: '0 15px' }}
            onClick={onClickFavoriteHandler}
          >
            <i className='material-icons'>
              {user.favorite_places.includes(placeSelected.place_id)
                ? 'favorite'
                : 'favorite_border'}
            </i>
          </div>
          <div className='btn-floating btn-medium waves-effect waves-light cyan darken-1'>
            <i className='material-icons'>info_outline</i>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  const onSubmitNewPlanHandler = event => {
    event.preventDefault();

    const planName = event.target[0].value;
    const date = event.target[1].value;
    if (!planName) {
      window.alert('You need to enter Plan Name');
      return;
    }
    //prepare data object to send to the api
    const newPlan = {
      user_id: user.id,
      name: planName,
      date: date,
      list: [placeSelected.id],
      isPlace: true,
    };

    //send data to the api and save it to db
    // axios
    //   .post('/api/v1/eventlist', newPlan)
    //   .then(response => {
    //     //response should have the data saved, store that data
    //     const eventList = response.data.list;
    //     //user.plans only stores refrences(ids)
    //     const updatedLists = [...user.plans, eventList];
    //     setUser({
    //       ...user,
    //       plans: updatedLists,
    //     });
    //   })
    //   .catch(err => console.log('failed to post new eventlist'));

    const updatedArr = [...user.plans, { ...newPlan }];
    updatedArr.sort(compareByDate);

    //Temp for local test
    setUser({
      ...user,
      plans: updatedArr,
    });
  };

  const onAddToExisitingPlanHandler = plan => {
    //chech if the place is already added to the plan
    if (plan.list.filter(evt => evt === placeSelected.id).length > 0)
      return console.log('this place is already added to the plan');

    //if not, add it to the plan and update the context

    const updateEvents = [...plan.list, placeSelected.id];
    const updatePlan = { ...plan, list: updateEvents, isPlace: true };
    const filtered = user.plans.filter(plan => plan.name !== updatePlan.name);
    const update = [...filtered, updatePlan];
    update.sort(compareByDate);
    setUser({
      ...user,
      plans: update,
    });
  };

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

  const renderPlans = user.plans.map(plan => (
    <li
      key={plan.id}
      onClick={() => {
        onAddToExisitingPlanHandler(plan);
      }}
      className='plan-item valign-wrapper'
    >
      <span className='plan-item__name'>{plan.name}</span>
      <span className='plan-item__date'>{plan.date}</span>
      <span className='badge plan-item__count'>{plan.list.length}</span>
    </li>
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
      <Backdrop isVisible={isShowModal} click={onClickToShowModalHandler} />
      <div className='SideControl container col l3 indigo darken-2'>
        <MiniNav />
        <div className='event-detail col l10 indigo lighten-4'>
          {renderPlaceDetail}
        </div>
      </div>
      <div className='col l9 content-frame'>
        {isShowModal ? (
          <Modal submit={onSubmitNewPlanHandler} plans={renderPlans} />
        ) : null}
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
