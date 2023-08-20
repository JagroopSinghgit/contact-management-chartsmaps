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
          <div className="bg-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <nav className="bg-blue-600 w-full md:w-1/4 p-4 flex md:flex-col">
                <ul className="space-y-4 w-full">
                  <li className="w-full">
                    <Link
                      to="/"
                      className="text-white text-lg font-semibold hover:text-blue-300 block p-2 text-center bg-blue-500 rounded-lg"
                    >
                      Contacts
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      to="/charts-maps"
                      className="text-white text-lg font-semibold hover:text-blue-300 block p-2 text-center bg-blue-500 rounded-lg"
                    >
                      Charts and Maps
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Main Content */}
              <div className="w-full md:w-3/4 p-4">
                <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                  <Routes>
                    <Route exact path="/" element={<Contacts />} />
                    <Route path="/charts-maps" element={<ChartsMaps />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
