import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CountrySingle = () => {
  const location = useLocation();
  const [countryToShow, setCountryToShow] = useState('');

  const data = location.state.data;
  const API_key = process.env.REACT_APP_API_KEY;

  console.log(data);

  const getWeather = country => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
      )
      .catch(err => console.log(err))
      .then(res => {
        setCountryToShow(res.data);
      });
  };

  return <div>CountrySingle</div>;
};
export default CountrySingle;
