import React from 'react';
import styles from './Button.module.css';
import Btn from '@mui/material/Button';

const Button = ({ click, children }) => {
  return (
    <Btn
      varian='contained'
      type='button'
      onClick={click}
      className={styles.btn}
    >
      {children}
    </Btn>
  );
};

export default Button;
