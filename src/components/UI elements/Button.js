import React from 'react';
import styles from './Button.module.css';

const Button = ({ btnType, name, click, children }) => {
  return (
    <button type={btnType | 'button'} onClick={click} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
