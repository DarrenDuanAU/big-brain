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
      <div>
        Session Id: {currentSession.id}
        {currentSession.questions.map((question) => (
          question.str
        ))}
      </div>
      <div>
        {currentSession.questions.map((question, index) => {
          if (currentSession.stage !== -1 && index === currentSession.stage) {
            return (
              <div key={index}>
                {question.str}
              </div>
            )
          }
          return null;
        })}
      </div>
      <button onClick={advanceSession}>
        {currentSession?.stage >= 0 ? 'next' : 'start'}
      </button>
      <button onClick={endSession}>end</button>
    </Modal>
  );
};

export default SessionModal;
