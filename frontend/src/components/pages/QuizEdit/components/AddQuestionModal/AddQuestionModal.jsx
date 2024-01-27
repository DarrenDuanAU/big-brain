import React from 'react';
import Modal from '../../../../Modal'
import { useForm } from 'react-hook-form'
import styles from './AddQuestionModal.module.css'
import APICall from '../../../../apis/APICall';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
const AddQuestionModal = ({
  setVisible,
  fetchedQuestions,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const choices = ['A', 'B', 'C', 'D']

  const onSubmit = async (data) => {
    console.log(data);
    const randomId = v4();
    const questions = [
      ...fetchedQuestions,
      { ...data, id: randomId }
    ];
    const res = await APICall('/admin/quiz/' + params.quizId, 'PUT', {
      questions
    });
    if (res) {
      setVisible(false);
    }
  };
  return (
    <Modal setVisible={setVisible}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='question'>Question:</label><br/>
        <input id='question' defaultValue='' {...register('str')} /><br/>
        <label htmlFor='time'>time limit:</label><br/>
        <input id='time' defaultValue='' {...register('time')} /><br/>
        <label htmlFor='points'>points:</label><br/>
        <input id='points' defaultValue='' {...register('points')} /><br/>
        <section>
          <p>options</p>
          {choices.map((choice, index) =>
            <div key={choice} className={styles.choiceWrapper}>
              <label htmlFor={choice}>{choice}:</label>
              <input id={choice} defaultValue='' {...register(`choices[${index}]`)} />
              <input type="checkbox" {...register(`answers[${index}]`)}/>
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
