import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import EventDashboard from "./containers/EventDashboard/EventDashboard";
import PlaceDashboard from "./containers/PlaceDashboard/PlaceDashboard";
import UserDashboard from "./containers/UserDashboard/UserDashboard";

function App() {
  return (
    <div className="App">
      <header className="Header">
        <nav style={{ height: "100%" }}>
          <div className="nav-wrapper indigo darken-4">
            <a href="#" className="brand-logo">
              DOKOIKO
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/places">Places</Link>
              </li>
              <li>
                <Link to="/">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="Main row indigo lighten-4">
        <Switch>
          <Route extact path="/user" component={UserDashboard} />
          <Route extact path="/events" component={EventDashboard} />
          <Route extact path="/places" component={PlaceDashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
