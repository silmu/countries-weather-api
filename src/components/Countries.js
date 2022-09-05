import React, { useEffect } from 'react';
import CountryCard from './CountryCard.js';
import LoadingSpinner from './UI elements/LoadingSpinner';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeCountries,
  search,
} from '../features/countries/countriesSlice';

const Countries = (/*{ countries, loading, filtered }*/) => {
  const dispatch = useDispatch();

  const countriesList = useSelector(state => state.countries.countriesList);
  const loading = useSelector(state => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
    >
      {/*countries.filter(c =>
        c.name.common.toLowerCase().includes(searched.toLowerCase())*/}
      {/* filtered */}
      {countriesList
        .filter(c =>
          c.name.common.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(country => (
          <Grid item xs={2} sm={4} md={4} key={country.name.common}>
            <CountryCard country={country} countries={countriesList} />
          </Grid>
        ))}
    </Grid>
  );
};
export default Countries;
