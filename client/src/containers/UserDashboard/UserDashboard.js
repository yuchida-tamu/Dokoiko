import React, { useState, useEffect, Fragment } from "react";
import UserEditForm from "../../components/UserEditForm/UserEditForm";
import { visitingEvents } from "../../testData/eventLists";
import {testEvent} from "../../testData/events";
import {testPlaceNew} from "../../testData/places";
import { panelTypes } from "./panelTypes";


//visiting events hold id of eventlist
//favorite events hold id of event

const currentUser = {
  username: "yutaside",
  first_name: "Yuta",
  last_name: "Uchida",
  email: "yuta@example.com",
  password: "*********",
  visiting_events: ["dyusayu", "jisoaijafij", "jjo2jojojao", "jiooso12121"],
  visiting_places: ["dyusa232yu", "jis33jafij", "jjo2jo1jojao", "jioocso12121"],
  favorite_events: ["dyusayadd4u", , "jjo2jojo9ijo", "jill;12121"],
  favorite_places: [
    "dyusayu4433",
    "jisoaijaasdfij",
    "jjo2joj-00o",
    "jiohgjo12121",
  ],
};

const UserDashboard = () => {
  /*Data*/
  const [user, setUser] = useState(currentUser);
  const [username, setUsername] = useState(currentUser.username);
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [visitPlans, setVisitPlans] = useState([]);
  const [currentPanelShown, setCurrentPanelShown] = useState(panelTypes.USER_FORM);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([])

  /*
    Fetch data onload 
  */
  useEffect(() => {
    fetchEventLists();
    fetchFavoriteEvents();
    fetchFavoritePlaces()
  }, [])


  const onUsernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const onFisrtNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const onLastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };
  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
const onOpenUserFormHandler = () => {
  setCurrentPanelShown(panelTypes.USER_FORM);
}

  const onOpenPlansHandler = () => {
    //in production, this uses the actual data fetched from api
    //using ids provided by the user(current_user)
    //const visitingEvents = fetchEventLists(id)
    setVisitPlans(visitingEvents);//TODO: use useEffect to preload lists instead of fetching data here
    setCurrentPanelShown(panelTypes.PLANS)
    
  };
  const onOpenFavoritesHandler = ()=> {
    setCurrentPanelShown(panelTypes.FAVORITES)
    
  }

  //TODO: IMPLEMENT fetchEventLists()
  const fetchEventLists = () => { };

  const fetchFavoritePlaces = () => {
    //Temporary logic for dev purposes
    //in production, it fetches data from api
    let tempArr = []
    for(let i = 0; i < user.favorite_places.length.length; i++){
      tempArr.push(testPlaceNew[i])
    }
    setFavoritePlaces(tempArr)
  }

  const fetchFavoriteEvents = () => {
    //Temporary logic for dev purposes
    //in profuction, it fetches data from api
        let tempArr = []
    for(let i = 0; i < user.favorite_events.length.length; i++){
      tempArr.push(testEvent[i])
    }
    setFavoriteEvents(tempArr)
  }

  const renderEventLists = visitPlans.map((list) => (
    <li key={list._id}>
      <h5>{list.name}</h5>
    </li>
  ));

  // const renderFavoriteEvents = favoriteEvents.map(event => {
  //   return <li>event.name</li>
  // })

  
  // const renderFavoritePlaces = favoritePlaces.map(place => {
  //   return <li>place.name</li>
  // })

  const panelSwitchHandler = (TYPE) => { };
  
  
  const renderUserForm = currentPanelShown === panelTypes.USER_FORM?<UserEditForm
    firstName={firstName}
    lastName={lastName}
    username={username}
    email={email}
    onFirstNameChange={onFisrtNameChangeHandler}
    onLastNameChange={onLastNameChangeHandler}
    onUsernameChange={onUsernameChangeHandler}
    onEmailChange={onEmailChangeHandler}
    onSubmit={onSubmitHandler}
  /> : null; 
  
  const renderPlans = currentPanelShown === panelTypes.PLANS?<ul>{renderEventLists}</ul>:null;

  const renderFavorites = currentPanelShown === panelTypes.FAVORITES?(
    <Fragment>
      <ul className="favorite-list">
        <li className="favorite-list__item favorite-list__item__places">
          <span>Favorite Places
          <span className="badge">
            {user.favorite_places.length}
          </span>
          </span>
          <div >
           {/* {renderFavoritePlaces} */}
          </div>
        </li>
        <li className="favorite-list__item favorite-list__item__events">
          Favorite Events
          <span className="badge">
            {user.favorite_events.length}
          </span>
          <div >
           {/* {renderFavoriteEvents} */}
          </div>
        </li>
      </ul>
    </Fragment>):null;

  
  return (
    <div className="user-dashboard__frame indigo lighten-4 container">
      <ul className="collection user-dashboard__collection">
        <li className="collection-item indigo lighten-4 center-align" onClick={onOpenUserFormHandler}>
          <div className="user-dashboard user-dashboard__avator indigo lighten-5"></div>
        </li>
        <li className="collection-item indigo lighten-4 left-align" onClick={onOpenUserFormHandler}>
          {user.username}
        </li>
        <li className="collection-item indigo lighten-4 left-align" onClick={onOpenUserFormHandler}>
          {user.first_name} {user.last_name}
        </li>
        <li className="collection-item indigo lighten-4 left-align" onClick={onOpenUserFormHandler}>
          {user.email}
        </li>
        <li
          className="collection-item indigo lighten-4 left-align"
          onClick={onOpenPlansHandler}
        >
          Plans
          <span className="badge">
            {user.visiting_events.length + user.visiting_places.length}
          </span>
        </li>
        <li className="collection-item indigo lighten-4 left-align"
          onClick = {onOpenFavoritesHandler}
          >
          Favorites
          <span className="badge">
            {user.favorite_events.length + user.favorite_places.length}
          </span>
        </li>
      </ul>
      <div className="user-dashboard__detail indigo lighten-5">
        {renderUserForm}
        {renderPlans}
        {renderFavorites}
      </div>
    </div>
  );
};

export default UserDashboard;
