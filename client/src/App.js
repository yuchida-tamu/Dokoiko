import "./App.css";
import photo from "./test.jpg";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div class="nav-wrapper indigo darken-4">
            <a href="#" class="brand-logo">
              DOKOIKO
            </a>
            <ul class="right hide-on-med-and-down">
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
        <div className="SideControl container col l3 indigo darken-2">
          <div className="col l2 left MiniNav indigo darken-3">
            <div>
              <a className="btn-floating btn-medium  waves-effect waves-light indigo darken-4">
                <i className="material-icons">person</i>
              </a>
              <a className="btn-floating btn-medium  waves-effect waves-light indigo darken-4">
                <i className="material-icons">bookmark</i>
              </a>
              <a className="btn-floating btn-medium waves-effect waves-light indigo darken-4">
                <i className="material-icons">event</i>
              </a>
              <a className="btn-floating btn-medium  waves-effect waves-light indigo darken-4">
                <i className="material-icons">location_city</i>
              </a>
            </div>
          </div>
        </div>
        <div className="col l9 indigo MapContainer">
          <div className="Map indigo"></div>
          <div className="col l2 indigo darken-4 InfoPanel z-depth-3">
            <div className="ImageBox">
              <img className="ImageBox-Img responsive-img" src={photo} />
            </div>
            <div>
              <div className="InfoPanel-Detail"></div>
              <div className="InfoPanel-Detail"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
