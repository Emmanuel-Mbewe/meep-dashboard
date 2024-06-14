import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'src/components/Modal';
import UssdNavbar from 'src/Pages/ussd/UssdNavBar';

const EditUssdQuiz = ({ questionId }) => {
  const [questionData, setQuestionData] = useState({
    text: '',
    answers: [
      { id: 1, text: '', isCorrect: false },
      { id: 2, text: '', isCorrect: false },
      { id: 3, text: '', isCorrect: false },
      { id: 4, text: '', isCorrect: false },
    ],
  });
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`https://meep-back.onrender.com/api/quiz/${questionId}`);
        setQuestionData(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://meep-back.onrender.com/api/quiz/${questionId}`, {
        text: questionData.text,
        answers: questionData.answers,
      });
      setMessage('Question updated successfully!');
      setShowModal(true);
    } catch (error) {
      setMessage('Error updating question.');
      setShowModal(true);
      console.error('Error updating question:', error.response?.data || error.message);
    }
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...questionData.answers];
    newAnswers[index][field] = value;
    setQuestionData({
      ...questionData,
      answers: newAnswers,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <UssdNavbar />
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '16px' }}>Question</label>
          <input
            type="text"
            value={questionData.text}
            onChange={(e) => setQuestionData({ ...questionData, text: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        {questionData.answers.map((answer, index) => (
          <div key={answer.id} style={styles.answerGroup}>
            <label style={styles.label}>Answer {index + 1}</label>
            <input
              type="text"
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
              style={styles.input}
            />
            <label style={styles.radioLabel}>
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleAnswerChange(index, 'isCorrect', !answer.isCorrect)}
                style={styles.radioInput}
              />
              Correct
            </label>
          </div>
        ))}
        <button type="submit" style={styles.button}>Update Question</button>
      </form>
      {showModal && <Modal message={message} onClose={handleCloseModal} />}
    </>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    margin: '10px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  answerGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  radioLabel: {
    display: 'inline-block',
    marginLeft: '10px',
  },
  radioInput: {
    marginRight: '5px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#000000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default EditUssdQuiz;
