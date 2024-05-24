import { useEffect, useState } from 'react';
import axios from 'axios';
import UssdNavbar from 'src/Pages/ussd/UssdNavBar';
import { FaEdit, FaArchive, FaTrash, FaEye } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Ensure this matches the root element of your Next.js app

const ManageQuiz = () => {
  const [questions, setQuestions] = useState([]); // Ensure questions state is initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/quiz');
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to fetch questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSeeAnswers = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestionToDelete(questionId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteQuestion = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/quiz/${questionToDelete}`);
      setQuestions(questions.filter(q => q.id !== questionToDelete));
      setIsDeleteModalOpen(false);
      setQuestionToDelete(null);
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Failed to delete question');
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDeleteQuestion = () => {
    setIsDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading questions...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>{error}</p>;
  }

  return (
      <>
        <UssdNavbar />
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Manage Questions and Answers</h1>
        {questions.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>No questions found</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #ccc', padding: '10px 5px' }}>#</th>
                <th style={{ borderBottom: '2px solid #ccc', padding: '10px 5px' }}>Question</th>
                <th style={{ borderBottom: '2px solid #ccc', padding: '10px 5px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.id}>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px 5px', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px 5px' }}>{question.text}</td>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px 5px', textAlign: 'center' }}>
                    <button 
                      style={{ margin: '0 5px', padding: '5px', cursor: 'pointer', background: 'none', border: 'none', color: '#007bff' }}
                      onClick={() => handleSeeAnswers(question)}
                    >
                      <FaEye />
                    </button>
                    <button 
                      style={{ margin: '0 5px', padding: '5px', cursor: 'pointer', background: 'none', border: 'none', color: '#dc3545' }}
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedQuestion && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Question Answers"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                maxWidth: '600px',
                width: '90%',
                boxSizing: 'border-box',
                overflow: 'auto'
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
              }
            }}
          >
            <h2>Answers for: {selectedQuestion.text}</h2>
            <ul>
              {selectedQuestion.answers.map((answer, index) => (
                <li key={answer.id}>
                  {String.fromCharCode(65 + index)}: {answer.text} {answer.isCorrect && <strong>(Correct)</strong>}
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#000000', color: 'white' }}>
              Close
            </button>
          </Modal>
        )}
        {isDeleteModalOpen && (
          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={cancelDeleteQuestion}
            contentLabel="Confirm Delete"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '35px',
                maxWidth: '400px',
                width: '90%',
                boxSizing: 'border-box',
                overflow: 'auto'
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
              }
            }}
          >
            <h2 style={{marginBottom: '10px'}}>Confirm Delete</h2>
            <p style={{color: 'red'}}>Are you sure you want to delete this question and all its answers?</p>
            <button onClick={confirmDeleteQuestion} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', marginTop: '20px' }}>
              Confirm
            </button>
            <button onClick={cancelDeleteQuestion} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#000000', color: 'white', marginTop: '20px' }}>
              Cancel
            </button>
          </Modal>
        )}
      </div>
      </>
  );
};

export default ManageQuiz;