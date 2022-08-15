import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
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
