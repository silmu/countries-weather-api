import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard.js';
import LoadingSpinner from './UI elements/LoadingSpinner';
import styles from './Countries.module.css';

const Countries = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .catch(err => console.log(err))
      .then(res => {
        const sortedCountries = res.data.sort((a, b) =>
          a.name.common < b.name.common ? -1 : 0
        );
        setCountries(sortedCountries);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchCountries();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className={styles.country_list}>
      {countries.map(country => (
        <CountryCard
          key={country.name.common}
          country={country}
          countries={countries}
        />
      ))}
    </div>
  );
};
export default Countries;
