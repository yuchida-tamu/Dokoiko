import React, { useState, useEffect, Fragment } from 'react';
import UserEditForm from '../../components/UserEditForm/UserEditForm';
import { visitingEvents } from '../../testData/eventLists';
import { testEvent } from '../../testData/events';
import { testPlaceNew } from '../../testData/places';
import { panelTypes } from './panelTypes';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import ListModal from '../../components/Modal/ListModal';
import Backdrop from '../../components/Backdrop/Backdrop';
import axios from 'axios';
//visiting events hold id of eventlist
//favorite events hold id of event

const currentUser = {
  username: 'yutaside',
  first_name: 'Yuta',
  last_name: 'Uchida',
  email: 'yuta@example.com',
  password: '*********',
  visiting_events: ['dyusayu', 'jisoaijafij', 'jjo2jojojao', 'jiooso12121'],
  visiting_places: ['dyusa232yu', 'jis33jafij', 'jjo2jo1jojao', 'jioocso12121'],
  favorite_events: ['dyusayadd4u', , 'jjo2jojo9ijo', 'jill;12121'],
  favorite_places: [
    'dyusayu4433',
    'jisoaijaasdfij',
    'jjo2joj-00o',
    'jiohgjo12121',
  ],
};

const UserDashboard = () => {
  /*Data*/
  const { user, setUser } = useCurrentUserContext();
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  //const [visitPlans, setVisitPlans] = useState(user.plans);
  const [currentPanelShown, setCurrentPanelShown] = useState(
    panelTypes.USER_FORM
  );
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [isVisibleFavPl, setIsVisibleFavPl] = useState(false);
  const [isVisibleFavEvt, setisVisibleFavEvt] = useState(false);
  const [eventListSelected, setEventListSelected] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  /*
    Fetch data onload 
  */
  useEffect(() => {
    fetchEventList();
    fetchFavoriteEvents();
    fetchFavoritePlaces();
  }, []);

  const onUsernameChangeHandler = event => {
    setUsername(event.target.value);
  };
  const onFisrtNameChangeHandler = event => {
    setFirstName(event.target.value);
  };
  const onLastNameChangeHandler = event => {
    setLastName(event.target.value);
  };

  const onEmailChangeHandler = event => {
    setEmail(event.target.value);
  };
  const onSubmitHandler = event => {
    event.preventDefault();

    //implememt updateUserInfo() to send data to backend
    const fName = event.target[0].value;
    const lName = event.target[1].value;
    const uName = event.target[2].value;
    const eM = event.target[3].value;
    const update = {
      ...user,
      firstName: fName,
      lastName: lName,
      username: uName,
      email: eM,
    };

    // axios
    //   .put(`/api/v1/user/${user.id}`, update)
    //   .then(response => {
    //     //retrieve the updated userInfo and set it to the context
    //     const updatedUser = response.data.user;
    //     setUser(updatedUser);
    //   })
    //   .catch(err => {
    //     console.error('error: ', err);
    //   });

    //temporary logic for local dev
    setUser(update);
  };
  const onOpenUserFormHandler = () => {
    setCurrentPanelShown(panelTypes.USER_FORM);
  };

  const onOpenPlansHandler = () => {
    //in production, this uses the actual data fetched from api
    //using ids provided by the user(current_user)
    //const visitingEvents = fetchEventList(id)
    const plans = user.plans.map(plan => ({ ...plan, isOpen: false }));
    const updateUser = {
      ...user,
      plans: plans,
    };
    setUser(updateUser);
    //setVisitPlans(visitingEvents); //TODO: use useEffect to preload lists instead of fetching data here

    setCurrentPanelShown(panelTypes.PLANS);
  };
  const onOpenFavoritesHandler = () => {
    setCurrentPanelShown(panelTypes.FAVORITES);
  };

  const onOpenFavoritePlacesHandler = () => {
    const toggle = !isVisibleFavPl;
    setIsVisibleFavPl(toggle);
  };

  const onOpenFavoriteEventsHandler = () => {
    const toggle = !isVisibleFavEvt;
    setisVisibleFavEvt(toggle);
  };

  const onClickPlanHandler = id => {
    fetchEventList(id);
    toggleIsOpen(id);
    setEventListSelected(id);
    //TODO: setEventListSelected(fetchEventList(id)); set an object that is fetched from db as the selectedEventlist
    setIsModalVisible(!isModalVisible);
  };

  const onClickBackgroundHandler = () => {
    setIsModalVisible(!isModalVisible);
  };

  //NOTE: Probably you can refactor this to use it for Favorites List
  const toggleIsOpen = id => {
    const target = user.plans.filter(plan => plan._id === id);
    const update = { ...target[0], isOpen: !target[0].isOpen };
    const mapped = user.plans.map(plan => {
      if (plan._id === id) {
        return update;
      }
      return plan;
    });
    const updatedPlans = [...mapped];

    const updatedUser = {
      ...user,
      plans: updatedPlans,
    };

    setUser(updatedUser);
  };

  //TODO: IMPLEMENT fetchEventList()
  const fetchEventList = id => {};

  const fetchFavoritePlaces = () => {
    //Temporary logic for dev purposes
    //in production, it fetches data from api
    let tempArr = [];
    for (let i = 0; i < user.favorite_places.length; i++) {
      tempArr.push(testPlaceNew[i]);
    }
    setFavoritePlaces(tempArr);
  };

  const fetchFavoriteEvents = () => {
    //Temporary logic for dev purposes
    //in profuction, it fetches data from api
    let tempArr = [];
    for (let i = 0; i < user.favorite_events.length; i++) {
      tempArr.push(testEvent[i]);
    }
    setFavoriteEvents(tempArr);
  };

  const renderEventLists = user.plans.map(list => (
    <li
      style={{ cursor: 'pointer' }}
      key={list._id}
      onClick={() => {
        onClickPlanHandler(list._id);
      }}
    >
      <h5>{list.name}</h5>
    </li>
  ));

  const renderFavoriteEvents = isVisibleFavEvt
    ? favoriteEvents.map(event => {
        return <li>{event.name}</li>;
      })
    : null;

  const renderFavoritePlaces = isVisibleFavPl
    ? favoritePlaces.map(place => {
        return <li>{place.name}</li>;
      })
    : null;

  const panelSwitchHandler = TYPE => {};

  const renderUserForm =
    currentPanelShown === panelTypes.USER_FORM ? (
      <UserEditForm
        firstName={firstName}
        lastName={lastName}
        username={username}
        email={email}
        onFirstNameChange={onFisrtNameChangeHandler}
        onLastNameChange={onLastNameChangeHandler}
        onUsernameChange={onUsernameChangeHandler}
        onEmailChange={onEmailChangeHandler}
        onSubmit={onSubmitHandler}
      />
    ) : null;

  const renderPlans =
    currentPanelShown === panelTypes.PLANS ? <ul>{renderEventLists}</ul> : null;

  const renderFavorites =
    currentPanelShown === panelTypes.FAVORITES ? (
      <Fragment>
        <ul className='favorite-list'>
          <li
            className='favorite-list__item favorite-list__item__places'
            onClick={onOpenFavoritePlacesHandler}
          >
            <span>
              Favorite Places
              <span className='badge'>{user.favorite_places.length}</span>
            </span>
            <div>{renderFavoritePlaces}</div>
          </li>
          <li
            className='favorite-list__item favorite-list__item__events'
            onClick={onOpenFavoriteEventsHandler}
          >
            Favorite Events
            <span className='badge'>{user.favorite_events.length}</span>
            <div>{renderFavoriteEvents}</div>
          </li>
        </ul>
      </Fragment>
    ) : null;

  return (
    <div className='user-dashboard__frame indigo lighten-4 container'>
      <Backdrop isVisible={isModalVisible} click={onClickBackgroundHandler} />
      {isModalVisible ? <ListModal /> : null}
      <ul className='collection user-dashboard__collection'>
        <li
          className='collection-item indigo lighten-4 center-align'
          onClick={onOpenUserFormHandler}
        >
          <div className='user-dashboard user-dashboard__avator indigo lighten-5'></div>
        </li>
        <li
          className='collection-item indigo lighten-4 left-align'
          onClick={onOpenUserFormHandler}
        >
          {user.username}
        </li>
        <li
          className='collection-item indigo lighten-4 left-align'
          onClick={onOpenUserFormHandler}
        >
          {user.firstName} {user.lastName}
        </li>
        <li
          className='collection-item indigo lighten-4 left-align'
          onClick={onOpenUserFormHandler}
        >
          {user.email}
        </li>
        <li
          className='collection-item indigo lighten-4 left-align'
          onClick={onOpenPlansHandler}
        >
          Plans
          <span className='badge'>{user.plans.length}</span>
        </li>
        <li
          className='collection-item indigo lighten-4 left-align'
          onClick={onOpenFavoritesHandler}
        >
          Favorites
          <span className='badge'>
            {user.favorite_events.length + user.favorite_places.length}
          </span>
        </li>
      </ul>
      <div className='user-dashboard__detail indigo lighten-5'>
        {renderUserForm}
        {renderPlans}
        {renderFavorites}
      </div>
    </div>
  );
};

export default UserDashboard;
