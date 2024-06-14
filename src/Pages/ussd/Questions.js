import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UssdNavbar from './UssdNavBar';
import Modal from '@/components/Modal';
import Link from 'next/link';

const UssdQuiz = () => {
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [forms, setForms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch forms from the backend
    const fetchForms = async () => {
      try {
        const formsResponse = await axios.get('https://meep-back.onrender.com/api/v1/class');
        setForms(formsResponse.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
  
    // Fetch subjects from the backend
    const fetchSubjects = async () => {
      try {
        const subjectsResponse = await axios.get('https://meep-back.onrender.com/api/v1/subject');
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
  
    fetchForms();
    fetchSubjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://meep-back.onrender.com/api/quiz', {
        text: questionText,
        answers,
        formId: selectedForm,
        courseId: selectedSubject,
      });
      setMessage('Question created successfully!');
      setShowModal(true);
      resetForm();
    } catch (error) {
      setMessage('Error creating question.');
      setShowModal(true);
      console.error('Error creating question:', error.response?.data || error.message);
    }
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const resetForm = () => {
    setQuestionText('');
    setAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
    setSelectedForm('');
    setSelectedSubject('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <UssdNavbar />
      {forms.length === 0 || subjects.length === 0 ? (
        <div style={styles.messageContainer}>
          <p style={styles.message}>No forms or courses found. Please <Link href="/create-subjects" style={styles.link}>create them</Link> first.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '18px', color: 'green' }}>Form</label>
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              required
              style={styles.input}
            >
              <option value="" disabled>Select Form</option>
              {forms.map(form => (
                <option key={form._id} value={form._id}>{form.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '18px', color: 'green' }}>Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
              style={styles.input}
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map(course => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '16px', marginTop: '20px' }}>Question</label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {answers.map((answer, index) => (
            <div key={index} style={styles.answerGroup}>
              <label style={styles.label}>Answer {index + 1}</label>
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                required
                style={styles.input}
              />
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={answer.isCorrect}
                  onChange={() => handleAnswerChange(index, 'isCorrect', true)}
                  required
                  style={styles.radioInput}
                />
                Correct
              </label>
            </div>
          ))}
          <button type="submit" style={styles.button}>Create Question</button>
        </form>
      )}
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
  messageContainer: {
    textAlign: 'center',
    margin: '50px auto',
  },
  message: {
    fontSize: '18px',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default UssdQuiz;
