import React from 'react';
import CountryCard from './CountryCard.js';
import LoadingSpinner from './UI elements/LoadingSpinner';
import Grid from '@mui/material/Grid';

const Countries = ({ countries, loading, filtered }) => {
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
    >
      {filtered.map(country => (
        <Grid item xs={2} sm={4} md={4} key={country.name.common}>
          <CountryCard country={country} countries={countries} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Countries;
