import React from 'react';

const Button = ({ text, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: '#c9fdd7',
        color: '#8c7676',
        outline: '#99f0ca',
      }}
    >
      {text}
    </button>
  );
};

export default Button;
