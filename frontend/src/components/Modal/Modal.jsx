import React from 'react';
import styles from './Modal.module.css';
import Icon from '@mui/material/Icon';

const Modal = ({
  children,
  setVisible
}) => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.background} onClick={() => setVisible(false)}>
      </div>

      <div className={styles.modalWrapper}>
        <div className={styles.topbar}>
          <div className={styles.crossIcon} onClick={() => setVisible(false)}>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
