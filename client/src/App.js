import "./App.css";

import EventDashboard from "./containers/EventDashboard";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className="nav-wrapper indigo darken-4">
            <a href="#" className="brand-logo">
              DOKOIKO
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a>Users</a>
              </li>
              <li>
                <a>Events</a>
              </li>
              <li>
                <a>Login</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="Main row">
        <EventDashboard />
      </main>
    </div>
  );
}

export default App;
