import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Contacts from "./components/Contacts";
import ChartsMaps from "./components/ChartsMaps";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div className="content-wrap">
            <nav className="sidebar">
              <ul>
                <li>
                  <Link to="/">Contacts</Link>
                </li>
                <li>
                  <Link to="/charts-maps">Charts and Maps</Link>
                </li>
              </ul>
            </nav>
            <div className="main-content">
              <Routes>
                <Route exact path="/" element={<Contacts />} />
                <Route path="/charts-maps" element={<ChartsMaps />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
