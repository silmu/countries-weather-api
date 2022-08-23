import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';

const Layout = ({ countries, search, setFiltered }) => {
  return (
    <div>
      <Header search={search} />
      <Main />
    </div>
  );
};

export default Layout;
