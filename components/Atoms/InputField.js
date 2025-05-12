import React from 'react';
import styles from '../../styles/InputField.module.css';

const InputField = ({ title, label, value, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'left', marginRight: '8px' }}>{title}:</div>
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={onChange}
        className={styles.placeholderLeft}
        style={{ width: '60%', textAlign: 'left' }}
      />
    </div>
  );
};

export default InputField;
