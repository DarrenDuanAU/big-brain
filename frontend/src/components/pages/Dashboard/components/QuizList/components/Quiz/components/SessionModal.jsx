import React, { useState } from 'react';
// import styles from './SessionModal.module.css';
// import Icon from '@mui/material/Icon';
import Modal from '../../../../../../../Modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './SessionModal.module.css';
import { RiFileCopy2Fill, RiFileCopy2Line } from 'react-icons/ri';

const SessionModal = ({
  advanceSession,
  endSession,
  setVisible,
  currentSession,
}) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = () => {
    setLinkCopied(true);
  };

  const handleAdvance = () => {
    advanceSession();
  }

  return (
    <Modal setVisible={setVisible}>
      <div className={styles.sessionIdWrapper}>
        currentSession.stage: <br />
        {currentSession.stage} <br />
        currentSession.questions.length: <br />
        {currentSession.questions.length} <br />
        Session Id: {currentSession.id}
        <button className={styles.copyButton}>
          <CopyToClipboard text={String(currentSession.id)} onCopy={handleCopy}>
            {linkCopied
              ? <div>
                <RiFileCopy2Fill />
                <span>&nbsp; Copied</span>
              </div>
              : <div>
                <RiFileCopy2Line />
                <span>&nbsp; Copy</span>
              </div>
            }
          </CopyToClipboard>
        </button>
        {/* {currentSession.questions.map((question) => (
          question.str
        ))} */}
      </div>
      <div className={styles.questionWrapper}>
        {currentSession.questions.map((question, index) => {
          if (currentSession.stage !== -1 && index === currentSession.stage) {
            return (
              <div key={index}>
                <div>
                  {question.str}
                  {question.choices.map((choice, index) => (
                    <div key={index}>
                      {index}
                      {choice}
                    </div>
                  ))}
                </div>
              </div>
            )
          }
          return null;
        })}
        <button onClick={handleAdvance}>
          next
        </button>
        <button onClick={endSession}>
          end
        </button>
      </div>
      <button onClick={endSession}>end</button>
    </Modal>
  );
};

export default SessionModal;
