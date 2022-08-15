import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CountrySingle = () => {
  const location = useLocation();
  const [countryToShow, setCountryToShow] = useState('');
  const [degrees, setDegrees] = useState('');
  const [weatherState, setWeatherState] = useState('');

  const countryObject = location.state.data;
  const API_key = process.env.REACT_APP_API_KEY;
  //   console.log(countryObject);
  //   console.log(API_key);

  const getWeather = country => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=148ca8be204798aa685efe2fe8a9cbfd&units=metric`
      )
      .then(res => {
        setCountryToShow(res.data);
        console.log(res.data);
        setDegrees(res.data.list[0].main.temp);
        setWeatherState(res.data.list[0].weather[0].description);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getWeather(countryObject);
  }, []);

  return (
    <div>
      <h2>{countryObject.name.common}</h2>
      <div>
        Right now it is {degrees} °C in {countryObject.name.common} and{' '}
        {weatherState}
      </div>
      {/* <img
        src={`http://openweathermap.org/img/wn/${countryObject.weather[0]?.icon}@2x.png`}
      /> */}
    </div>
  );
};
export default CountrySingle;