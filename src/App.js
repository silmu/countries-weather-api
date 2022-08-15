import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './components/Home';
import Countries from './components/Countries';
import CountrySingle from './components/CountrySingle';

const RouterWrapper = props => {
  const params = useParams();
  return <CountrySingle params={params} {...props} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<Countries />} />
          <Route path="countries/:country" element={<RouterWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
