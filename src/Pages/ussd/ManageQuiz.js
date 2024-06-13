import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaFilePdf, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import UssdNavbar from './UssdNavBar';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

Modal.setAppElement('#__next'); // Ensure this matches the root element of your Next.js app

const ManageQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/quiz');
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
      await axios.delete(`http://localhost:8000/api/quiz/${questionToDelete}`);
      setQuestions(questions.filter(q => q.id !== questionToDelete));
      setIsDeleteModalOpen(false);
      setQuestionToDelete(null);
      showFeedbackMessage('Question deleted successfully.');
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Failed to delete question');
      setIsDeleteModalOpen(false);
      showFeedbackMessage('Failed to delete question. Please try again.');
    }
  };

  const cancelDeleteQuestion = () => {
    setIsDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  const generatePDF = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; 
      const filename = `questions_and_answers_${currentDate}.pdf`;

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      var page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 12;
      const margin = 50;
      let yPosition = height - margin;

      // Load a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add title
      page.drawText("Questions and Answers", {
        x: margin,
        y: yPosition,
        size: fontSize + 8,
        font: font,
        color: rgb(0, 0, 0),
      });

      yPosition -= fontSize + 20;

      questions.forEach((question, index) => {
        if (yPosition < margin + fontSize) {
          page = pdfDoc.addPage();
          yPosition = height - margin;
        }

        const questionText = `${index + 1}. ${question.text}`;
        page.drawText(questionText, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });

        yPosition -= fontSize + 5;

        question.answers.forEach((answer) => {
          if (yPosition < margin + fontSize) {
            page = pdfDoc.addPage();
            yPosition = height - margin;
          }

          const answerText = `   - ${answer.text}`;
          page.drawText(answerText, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });

          yPosition -= fontSize + 5;
        });

        yPosition -= fontSize + 10;
      });

      // Save the PDF buffer
      const pdfBytes = await pdfDoc.save();

      // Upload the PDF buffer to the server
      const formData = new FormData();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      formData.append('pdf', blob, filename);

      const response = await axios.post('http://localhost:8000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('PDF uploaded successfully:', response.data);
      showFeedbackMessage('PDF generated and uploaded successfully.');
    } catch (error) {
      console.error('Error generating or uploading PDF:', error);
      showFeedbackMessage('Failed to generate or upload PDF. Please try again.');
    }
  };

  const showFeedbackMessage = (message) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 6000);
  };

  const hideFeedbackMessage = () => {
    setShowFeedback(false);
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
        <button
          onClick={generatePDF}
          style={{
            display: 'block',
            margin: '0 auto 20px',
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          <FaFilePdf style={{ marginRight: '5px' }} /> Generate PDF
        </button>
        <div id="pdf-content">
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
        </div>
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
                overflow: 'auto',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
            }}
          >
            <h2>Answers for: {selectedQuestion.text}</h2>
            <ul>
              {selectedQuestion.answers.map((answer, index) => (
                <li key={answer.id}>
                  {answer.text} {answer.isCorrect && <strong>(Correct)</strong>}
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
                overflow: 'auto',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Confirm Delete</h2>
            <p style={{ color: 'red' }}>Are you sure you want to delete this question and all its answers?</p>
            <button onClick={confirmDeleteQuestion} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', marginTop: '20px' }}>
              Confirm
            </button>
            <button onClick={cancelDeleteQuestion} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#000000', color: 'white', marginTop: '20px' }}>
              Cancel
            </button>
          </Modal>
        )}
        {showFeedback && (
          <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#000000', color: '#fff', padding: '10px 20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', zIndex: '9999' }}>
            {feedbackMessage}
            <button onClick={hideFeedbackMessage} style={{ marginLeft: '10px', backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>X</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageQuiz;

