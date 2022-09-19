import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CountrySingle.module.css';
import Btn from './UI elements/Button';

import Typography from '@mui/material/Typography';

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
      <Typography gutterBottom variant='h2' fontSize='3rem'>
        {countryName}
      </Typography>
      <div>
        {country.coatOfArms.svg ? (
          <img
            src={country.coatOfArms.svg}
            alt='Coat of arms'
            style={{ padding: '1rem', width: '150px', float: 'right' }}
          />
        ) : (
          ''
        )}
      </div>
      <Typography>Capital: {country.capital?.[0]}</Typography>
      <Typography>Area: {country.area.toLocaleString()} sqare km</Typography>
      <Typography gutterBottom>
        Continents: {country.continents.map(c => c)}
      </Typography>
      <Typography variant='h3' fontSize='1.5rem'>
        Weather
      </Typography>
      <Typography>
        Right now it is {degrees} °C in {country.capital?.[0] ?? countryName}{' '}
        and {weatherState}
      </Typography>
      <div>
        <img src={imgLink} alt={countryName} float='right' />
      </div>
      <Typography gutterBottom variant='h4' fontSize='1.1rem'>
        Bordering countries:
      </Typography>
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

            <Btn
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
            </Btn>
          </span>
        );
      })}
      <div>
        <Btn variant='contained' click={() => navigate('/countries')}>
          Back to countries
        </Btn>
      </div>
    </div>
  );
};
export default CountrySingle;
