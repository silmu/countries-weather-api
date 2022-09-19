import React from 'react';
import Button from '@mui/material/Button';

const Btn = ({ click, children, variant }) => {
  return (
    <Button variant={variant ?? 'text'} type='button' onClick={click}>
      {children}
    </Button>
  );
};

export default Btn;
