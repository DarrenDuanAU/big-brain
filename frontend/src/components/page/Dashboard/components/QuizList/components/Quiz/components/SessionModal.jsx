import React from 'react';
import styles from './SessionModal.module.css';
// import Button from '@mui/material/Button';
// import APICall from '../../../../apis/APICall';
import Icon from '@mui/material/Icon';
// import { v4 } from 'uuid';
// import {
//   IsValidQuestion
// } from '../../service';

const SessionModal = ({
  advanceSession,
  endSession,
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
        <button onClick={advanceSession}>advance</button>
        <button onClick={endSession}>end</button>
      </div>
    </div>
  );
};

export default SessionModal;
