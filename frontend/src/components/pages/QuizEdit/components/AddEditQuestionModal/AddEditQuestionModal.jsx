import React from 'react';
import Modal from '../../../../Modal'
import { useForm } from 'react-hook-form'
import styles from './AddEditQuestionModal.module.css'
import { v4 } from 'uuid';
import { numberToChar } from '../../../../service';
const AddQuestionModal = ({
  setVisible,
  targetQuestion,
  setQuestions
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const optionsNum = 4;
  const options = [...Array(optionsNum).keys()];

  const onSubmit = async (data) => {
    console.log(data);
    setQuestions(prevQuestions => {
      const randomId = v4();
      const newQuestions = [
        ...prevQuestions,
        { ...data, id: randomId }
      ];
      return newQuestions
    })
    setVisible(false);
  };
  return (
    <Modal setVisible={setVisible}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='question'>Question:</label><br/>
        <input id='question' defaultValue={targetQuestion?.str} {...register('str')} /><br/>
        <label htmlFor='time'>time limit:</label><br/>
        <input id='time' defaultValue={targetQuestion?.time} {...register('time')} /><br/>
        <label htmlFor='points'>points:</label><br/>
        <input id='points' defaultValue={targetQuestion?.points} {...register('points')} /><br/>
        <section>
          <p>options</p>
          {options.map((choice, index) =>
            <div key={choice} className={styles.choiceWrapper}>
              <label htmlFor={choice}>{numberToChar(choice)}:</label>
              <input id={choice} defaultValue={targetQuestion?.choices[index]} {...register(`choices[${index}]`)} />
              <input type="checkbox" defaultChecked={targetQuestion?.booleanAnswers[index]} {...register(`booleanAnswers[${index}]`)}/>
            </div>
          )}
        </section>
        {errors.exampleRequired && <span>This field is required</span>}
        <input type='submit' />
      </form>
    </Modal>
  )
}
export default AddQuestionModal;
