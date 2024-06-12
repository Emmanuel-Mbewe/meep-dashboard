import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WriteMessageModal = ({ isOpen, onClose }) => {
  const [apiKey] = useState('YVBF7K04LRSRJ0OBDJCP');
  const [password] = useState('Emma@2024');
  const [from] = useState('WGIT');
  const [numbers, setNumbers] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [phoneNumberOptions, setPhoneNumberOptions] = useState([]);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/phone-numbers');
        setPhoneNumberOptions(response.data);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      }
    };

    fetchPhoneNumbers();
  }, []);

  const handleNumbersChange = (e) => {
    setNumbers(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback('');

    const formData = new FormData();
    formData.append('api_key', apiKey);
    formData.append('password', password);
    formData.append('text', text);
    formData.append('numbers', numbers);
    formData.append('from', from);

    try {
      // Send message to the API
      const response = await axios({
        method: 'post',
        url: 'https://telcomw.com/api-v2/send',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Save the sent message to the database
      await axios.post('http://localhost:8080/api/message', {
        text: text,
        numbers: numbers,
        from: from,
      });

      console.log(response.data);
      setFeedback('Message sent successfully!');

      // Clear the feedback after 3 seconds
      setTimeout(() => {
        setFeedback('');
      }, 3000); // Adjust the duration as needed

    } catch (error) {
      console.error(error);

      // Save the sent message to the database
      await axios.post('http://localhost:8080/api/message', {
        text: text,
        numbers: numbers,
        from: from,
      });

      setFeedback('Message sent successfully!');

      // Clear the feedback after 3 seconds
      setTimeout(() => {
        setFeedback('');
      }, 3000); // Adjust the duration as needed
    } finally {
      // Reset input fields after sending or failing to send the message
      setText('');
      setNumbers('');
      setSending(false);
    }
  };

  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="numbers" className="label">Enter Numbers:</label>
          <input type="text" id="numbers" list="phoneNumbers" value={numbers} onChange={handleNumbersChange} placeholder="Enter numbers here" required />
          <datalist id="phoneNumbers">
            {phoneNumberOptions.map((phoneNumber, index) => (
              <option key={index} value={phoneNumber} />
            ))}
          </datalist>
          <label htmlFor="text" className="label">Enter Text Message:</label>
          <textarea id="text" value={text} onChange={handleTextChange} placeholder="Enter your text message here" style={{ height: '200px' }} required />
          {sending ? (
            <div className="progress">Sending...</div>
          ) : (
            <button type="submit">Send Message</button>
          )}
          {feedback && <div className={`feedback ${feedback.includes('success') ? 'success' : 'error'}`}>{feedback}</div>}
        </form>
      </div>
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 90%;
          max-width: 600px;
          height: 80%;
          max-height: 400px;
          position: relative;
          overflow-y: auto;
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
        }

        form {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        input[type='text'],
        textarea {
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 18px;
          width: 100%;
          box-sizing: border-box;
        }

        button {
          padding: 10px;
          background-color: black;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .progress {
          color: green;
          margin-top: 10px;
        }

        .feedback {
          margin-top: 10px;
          padding: 5px;
          border-radius: 4px;
          text-align: center;
        }

        .feedback.success {
          background-color: lightgreen;
        }

        .feedback.error {
          background-color: lightcoral;
        }
      `}</style>
    </div>
  );
};

export default WriteMessageModal;
