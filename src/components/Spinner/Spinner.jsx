import React from 'react';
import './Spinner.css';

export const Spinner = ({ size = 40 }) => {
  const spinnerStyle = {
    width: size,
    height: size,
  };

  return <div className="spinner" style={spinnerStyle}></div>;
};

export default Spinner;
