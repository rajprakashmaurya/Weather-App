import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Lucknow");

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: `${city}` },
    headers: {
      "X-RapidAPI-Key": "2cbdb9cc0fmsh4ad3a7c8cd936a2p1a61e4jsn36b3a5fd165a",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const fetchWeather = async () => {
    const { data } = await axios.request(options);
    console.log("log:", data);
    if (data) {
      setWeatherData(data);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <>
      {weatherData && (
        <div className="card">
          <div className="sub-card1">
            <div className="degree">
              <span>{weatherData.current.temp_c}°</span>
            </div>
            <div className="city-name">
              <div>
                <p id="city">{weatherData.location.name}</p>
                <p id="time">{weatherData.location.localtime}</p>
              </div>
              <div>
                <img
                  src={weatherData.current.condition.icon}
                  alt="weather-icon"
                />
                <p id="sesion">{weatherData.current.condition.text}</p>
              </div>
            </div>
          </div>
          <div className="sub-card2">
            <div>
              <div className="city">
                <input
                  type="text"
                  className="input"
                  value={search}
                  name="fname"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter city name"
                />

                <button
                  type="submit"
                  className="btn"
                  onClick={() => setCity(search)}
                >
                  Submit
                </button>
              </div>
              <div className="weather-header">
                <h3>Weather detail</h3>
                <div className="weather-detail">
                  <p>Cloudy</p>
                  <p>{weatherData.current.cloud}%</p>
                </div>
                <div className="weather-detail">
                  <p>Rain</p>
                  <p>{weatherData.current.precip_mm}mm</p>
                </div>
                <div className="weather-detail">
                  <p>Humidity</p>
                  <p>{weatherData.current.humidity}%</p>
                </div>
                <div className="weather-detail">
                  <p>Wind</p>
                  <p>{weatherData.current.wind_kph}km/h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
