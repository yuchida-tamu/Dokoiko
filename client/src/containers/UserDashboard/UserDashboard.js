import React, { useState } from "react";
import UserEditForm from "../../components/UserEditForm/UserEditForm";
import { visitingEvents } from "../../testData/eventLists";
import { panelTypes } from "./panelTypes";
import { Link, Route, Switch } from "react-router-dom";

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
  const onOpenPlansHandler = () => {
    //in production, this uses the actual data fetched from api
    //using ids provided by the user(current_user)
    //const visitingEvents = fetchEventLists(id)
    setVisitPlans(visitingEvents);
  };
  //TODO: IMPLEMENT fetchEventLists()
  const fetchEventLists = () => {};

  const panelSwitchHandler = (TYPE) => {};

  const renderEventLists = visitPlans.map((list) => (
    <li key={list._id}>
      <h5>{list.name}</h5>
    </li>
  ));

  const tempComponent = (
    <div>
      <h4>
        <span>
          <i className="material-icons small">book</i>
        </span>
        Plans
      </h4>
      <ul>{renderEventLists}</ul>
    </div>
  );

  return (
    <div className="user-dashboard__frame indigo lighten-4 container">
      <ul className="collection user-dashboard__collection">
        <li className="collection-item indigo lighten-4 center-align">
          <div className="user-dashboard user-dashboard__avator indigo lighten-5"></div>
        </li>
        <li className="collection-item indigo lighten-4 left-align">
          {user.username}
        </li>
        <li className="collection-item indigo lighten-4 left-align">
          {user.first_name} {user.last_name}
        </li>
        <li className="collection-item indigo lighten-4 left-align">
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
        <li className="collection-item indigo lighten-4 left-align">
          Favorites
          <span className="badge">
            {user.favorite_events.length + user.favorite_places.length}
          </span>
        </li>
      </ul>
      <div className="user-dashboard__detail indigo lighten-5">
        {/* TEMPORARILY DISABLED FOR DEV PURPOSES
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
        /> */}
        <Switch>
          <Route
            exact
            to="user/edit"
            component={UserEditForm}
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
          <Route exact to="user/plans" component={tempComponent} />
        </Switch>
      </div>
    </div>
  );
};

export default UserDashboard;
