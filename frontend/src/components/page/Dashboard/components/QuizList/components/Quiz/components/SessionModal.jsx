import React from 'react';
// import styles from './SessionModal.module.css';
// import Icon from '@mui/material/Icon';
import Modal from '../../../../../../../Modal';

const SessionModal = ({
  advanceSession,
  endSession,
  setVisible,
  currentSession,
}) => {
  return (
    <Modal setVisible={setVisible}>
      {currentSession.id}
      {currentSession.questions.map((question) => (
        question.str
      ))}
      {currentSession.questions.map((question, index) => {
        if (currentSession.stage !== -1 && index === currentSession.stage) {
          return question.str;
        }
        return null;
      })}
      <button onClick={advanceSession}>advance</button>
      <button onClick={endSession}>end</button>
    </Modal>
  );
};

export default SessionModal;
