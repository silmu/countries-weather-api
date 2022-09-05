import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CountrySingle.module.css';
import Button from './UI elements/Button';

const CountrySingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [degrees, setDegrees] = useState('');
  const [weatherState, setWeatherState] = useState('');
  const [imgLink, setImgLink] = useState('');

  const country = location.state.country;
  const countries = location.state.countries;
  const API_key = process.env.REACT_APP_API_KEY;

  let countryName = country.name.common;

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
  }, [country]);

  const findCountryByCode = code => {
    const result = countries.filter(c => c.cca3 === code);
    // Unwrap result object from array
    return result[0];
  };

  return (
    <div className={styles.container_countrySingle}>
      <h2>{countryName}</h2>
      <div>
        Right now it is {degrees} °C in {countryName} and {weatherState}
      </div>
      <div>
        <img src={imgLink} alt={countryName} />
      </div>
      <h3>Bordering countries:</h3>
      {country.borders === undefined ? (
        <p>Bordering countries are not found.</p>
      ) : (
        ''
      )}
      {Object.values(country.borders || {}).map(border => {
        const borderObject = findCountryByCode(border);
        const borderName = borderObject.name.common;
        return (
          <span key={borderName}>
            {/* 
            *
            Alternative solution with Link
            *
            <Button>
              <Link
                to={`/countries/${border}`}
                state={{
                  countries: countries,
                  country: findCountryByCode(border),
                }}
              >
                {findCountryByCode(border).name.common}
              </Link>
            </Button> 
            */}

            <Button
              click={() =>
                navigate(`/countries/${borderName}`, {
                  state: {
                    countries: countries,
                    country: borderObject,
                  },
                })
              }
            >
              {borderName}
            </Button>
          </span>
        );
      })}
    </div>
  );
};
export default CountrySingle;
