import React from 'react';
import styles from './CustomizedButton.module.css';

const CustomizedButton = ({
  children,
  variant
}) => {
  return (
    <>
    {variant === 'outlined'
      ? <button className={styles.buttonOutlined}>
        {children.toUpperCase()}
      </button>
      : <button className={styles.buttonDefault}>
        {children.toUpperCase()}
      </button>
    }

    </>
  )
}

export default CustomizedButton;
