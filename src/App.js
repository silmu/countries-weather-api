import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Countries from './components/Countries';
import CountrySingle from './components/CountrySingle';
import Favorites from './components/Favorites';
import ErrorPage from './pages/ErrorPage';

import { initializeFavorites } from './features/countries/favsSlice';
import { useDispatch } from 'react-redux';

const RouterWrapper = props => {
  const params = useParams();
  return <CountrySingle params={params} {...props} />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='countries' element={<Countries />} />
          <Route path='countries/:country' element={<RouterWrapper />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
