import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import EventDashboard from "./containers/EventDashboard/EventDashboard";
import PlaceDashboard from "./containers/PlaceDashboard/PlaceDashboard";

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
                <Link to="/">Users</Link>
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
      <div className="Main row">
        <Switch>
          <Route path="/events" component={EventDashboard} />
          <Route path="/places" component={PlaceDashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
