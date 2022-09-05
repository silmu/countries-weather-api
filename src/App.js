import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='countries' element={<Countries />} />
          <Route path='countries/:country' element={<RouterWrapper />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
