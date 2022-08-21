import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CountrySingle.module.css';

const CountrySingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [degrees, setDegrees] = useState('');
  const [weatherState, setWeatherState] = useState('');
  const [imgLink, setImgLink] = useState('');

  const country = location.state.country;
  const countries = location.state.countries;
  const API_key = process.env.REACT_APP_API_KEY;

  const getWeather = country => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
      )
      .then(res => {
        setDegrees(res.data.list[0].main.temp);
        setWeatherState(res.data.list[0].weather[0].description);
        setImgLink(
          `http://openweathermap.org/img/wn/${res.data.list[0].weather[0]?.icon}@2x.png`
        );
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getWeather(country);
  }, []);

  const findCountryByCode = code => {
    console.log(country.borders);
    const result = countries.filter(c => c.cca3 === code);
    // Unwrap result object from array
    return result[0];
  };

  return (
    <div className={styles.container_countrySingle}>
      <h2>{country.name.common}</h2>
      <div>
        Right now it is {degrees} °C in {country.name.common} and {weatherState}
      </div>
      <div>
        <img src={imgLink} alt={country.name.common} />
      </div>
      <h3>Bordering countries:</h3>
      {Object.values(country.borders).map(border => {
        return (
          <button
            key={border}
            onClick={() =>
              navigate(`/countries/${border}`, {
                state: {
                  countries: countries,
                  country: findCountryByCode(border),
                },
              })
            }
          >
            {findCountryByCode(border).name.common}
          </button>
        );
      })}
    </div>
  );
};
export default CountrySingle;
