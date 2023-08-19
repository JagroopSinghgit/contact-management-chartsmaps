import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Correct import for Chart.js
import moment from "moment"; // Correct import for Moment.js

const ChartsMaps = () => {
  const [worldData, setWorldData] = useState({});
  const [countriesData, setCountriesData] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    // Fetch world data
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setWorldData(data))
      .catch((error) => console.error(error));

    // Fetch country data
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => setCountriesData(data))
      .catch((error) => console.error(error));

    // Fetch graph data
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => response.json())
      .then((data) => {
        const casesData = data.cases;
        const deathsData = data.deaths;
        const recoveredData = data.recovered;

        const dates = Object.keys(casesData);
        const cases = Object.values(casesData);
        const deaths = Object.values(deathsData);
        const recovered = Object.values(recoveredData);

        setGraphData({
          labels: dates,
          datasets: [
            {
              label: "Cases",
              data: cases,
              borderColor: "#ff8c00",
              fill: false,
            },
            {
              label: "Deaths",
              data: deaths,
              borderColor: "#ff0000",
              fill: false,
            },
            {
              label: "Recovered",
              data: recovered,
              borderColor: "#00ff00",
              fill: false,
            },
          ],
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <div className="charts-section">
        <h2 className="section-heading">Worldwide COVID-19 Data</h2>
        <div className="line-chart">
          <Line data={graphData} />
        </div>
      </div>
      <div className="map-section">
        <h2 className="section-heading">COVID-19 Map</h2>
        <div className="map-container">
          <MapContainer center={mapCenter} zoom={mapZoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render markers for countries using countriesData here */}
            {countriesData.map((country) => (
              <Marker
                key={country.countryInfo.iso2}
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <div className="popup-content">
                    <h3 className="popup-country">{country.country}</h3>
                    <p className="popup-data">Total Cases: {country.cases}</p>
                    <p className="popup-data">Recovered: {country.recovered}</p>
                    <p className="popup-data">Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsMaps;
