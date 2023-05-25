import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = () => {
  const [inputCity, setInputCity] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});

  const handleSearch = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=79cf6ee59eebc0d0fbea5f2549b78d11&units=metric`;

      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity } = data.main;
      const { main } = data.weather[0];
      const { name } = data;
      const myNewWeatherInfo = {
        temp,
        humidity,
        main,
        name,
      };
      setTempInfo(myNewWeatherInfo);
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1>Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            onChange={(e) => setInputCity(e.target.value)}
            type="text"
            value={inputCity}
            autoFocus
            className="form-control"
          />
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded wetherResultBox">
          <img
            className="weatherIcon"
            src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
            alt="weatherIcon"
          />
          <h5 className="weatherCity">{tempInfo.name}</h5>

          <h6 className="weatherTem">{tempInfo.temp}°C</h6>
          <h6>Humidity:{tempInfo.humidity}</h6>
          <h6>Weathermood:{tempInfo.main}</h6>
        </div>
      </div>
    </div>
  );
};

export default Weather;
