import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/countries">COUNTRIES</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
