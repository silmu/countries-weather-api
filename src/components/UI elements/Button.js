import React from 'react';
import styles from './Button.module.css';

const Button = ({ btnType, name, click }) => {
  return (
    <button type={btnType | 'button'} onClick={click} className={styles.btn}>
      {name}
    </button>
  );
};

export default Button;
