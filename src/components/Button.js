import React from 'react';

const Button = ({ btnType }) => {
  return <button type={btnType | 'button'}></button>;
};

export default Button;
