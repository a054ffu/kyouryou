import React, { useState } from 'react';
import styles from '../../styles/Pulldown.module.css';

const Pulldown = ({ text, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.pulldown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles.textContainer}>
        <div className={styles.text}>{text}</div>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => onItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pulldown;
