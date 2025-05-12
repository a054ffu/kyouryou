import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
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
