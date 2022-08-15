import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard.js';

const Countries = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .catch(err => console.log(err))
      .then(res => {
        setData(res.data);
        // console.log(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {data.map(country => (
        <CountryCard key={country.name.common} {...country} />
      ))}
    </div>
  );
};
export default Countries;
