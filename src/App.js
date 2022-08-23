import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Countries from './components/Countries';
import CountrySingle from './components/CountrySingle';
import ErrorPage from './pages/ErrorPage';

const RouterWrapper = props => {
  const params = useParams();
  return <CountrySingle params={params} {...props} />;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleSearch = searched => {
    setFiltered(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(searched.toLowerCase())
      )
    );
  };

  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .catch(err => console.log(err))
      .then(res => {
        const sortedCountries = res.data.sort((a, b) =>
          a.name.common < b.name.common ? -1 : 0
        );
        setCountries(sortedCountries);
        setFiltered(sortedCountries);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchCountries();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout search={handleSearch} />}>
          <Route index element={<Home />} />
          <Route
            path='countries'
            element={
              <Countries
                countries={countries}
                filtered={filtered}
                loading={loading}
              />
            }
          />
          <Route path='countries/:country' element={<RouterWrapper />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
