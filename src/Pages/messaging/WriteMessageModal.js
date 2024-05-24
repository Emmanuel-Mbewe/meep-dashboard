import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const WriteMessageModal = ({ isOpen, onClose, to: initialTo, subject: initialSubject, message: initialMessage }) => {
  const [to, setTo] = useState(initialTo || '');
  const [subject, setSubject] = useState(initialSubject || '');
  const [message, setMessage] = useState(initialMessage || '');
  const [showMobileNumbers, setShowMobileNumbers] = useState(false); // State to control the visibility of mobile numbers dropdown
  const [selectedContacts, setSelectedContacts] = useState([]); // State to store selected contacts
  const [phoneNumbers, setPhoneNumbers] = useState([]); // State to store fetched phone numbers
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [noNumbers, setNoNumbers] = useState(false); // State to manage no numbers condition
  const [feedbackMessage, setFeedbackMessage] = useState(''); // State to manage feedback message

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/phone-numbers');
        const numbers = response.data;
        setPhoneNumbers(numbers);
        setNoNumbers(numbers.length === 0);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneNumbers();
  }, []);

  // Function to generate the recipient label when more than three contacts are selected
  const generateRecipientLabel = (selectedContacts) => {
    const firstThreeContacts = selectedContacts.slice(0, 3);
    const remainingCount = selectedContacts.length - 3;
    return `${firstThreeContacts.join(', ')}${remainingCount > 0 ? ` and ${remainingCount} more` : ''}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedContacts.length === 0 && to.trim() !== '') {
        // If no contacts are selected but a number is entered in the input field, use that number
        setFeedbackMessage('Sending the message, please wait...'); // Update feedback message
        const response = await axios.post('http://localhost:8080/api/send-message', {
          to: to.trim(),
          body: message
        });
        console.log('SMS sent successfully:', response.data);
        setFeedbackMessage('SMS sent successfully!');
      } else if (selectedContacts.length > 0) {
        // Send the message to the selected contacts
        setFeedbackMessage('Sending the message, please wait...'); // Update feedback message
        const response = await axios.post('http://localhost:8080/api/send-message', {
          to: selectedContacts[0], // Only the first number in the selectedContacts array
          body: message // Message body
        });
        console.log('SMS sent successfully:', response.data);
        setFeedbackMessage('SMS sent successfully!');
      } else {
        // If no number is entered and no contacts are selected, show an error
        setFeedbackMessage('Please select a contact or enter a phone number.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      setFeedbackMessage('Error sending SMS.');
    }
  };

  const handleCancel = () => {
    setMessage(''); // Reset message input
    onClose(); // Close the modal
  };

  const toggleMobileNumbers = () => {
    setShowMobileNumbers(!showMobileNumbers);
  };

  const handleContactCheckboxChange = (event, number) => {
    if (event.target.checked) {
      const updatedContacts = [...selectedContacts, number];
      setSelectedContacts(updatedContacts);
      setTo(updatedContacts.join(', '));
    } else {
      const updatedContacts = selectedContacts.filter((contact) => contact !== number);
      setSelectedContacts(updatedContacts);
      setTo(updatedContacts.join(', '));
    }
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === phoneNumbers.length) {
      setSelectedContacts([]);
      setTo('');
    } else {
      setSelectedContacts(phoneNumbers);
      setTo(phoneNumbers.join(', '));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>×</span>
        <h2>Write a Message</h2>
        {loading ? (
          <p>Loading...</p>
        ) : noNumbers ? (
          <p>No numbers for now</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                id="to"
                value={selectedContacts.length > 3 ? generateRecipientLabel(selectedContacts) : to}
                onChange={(e) => setTo(e.target.value)}
                style={{ color: 'blue' }}
                placeholder="Recipient"
                required
                className="input-field"
                onFocus={toggleMobileNumbers} // Show mobile numbers dropdown when focused
              />
              {showMobileNumbers && (
                <div className="mobile-numbers-dropdown">
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        checked={selectedContacts.length === phoneNumbers.length}
                        onChange={selectAllContacts}
                      />
                      <label style={{ color: 'green', fontSize: '18px' }}>Select All</label>
                    </li>
                    {phoneNumbers.map((contact) => (
                      <li key={contact}>
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact)}
                          onChange={(e) => handleContactCheckboxChange(e, contact)}
                        />
                        <label style={{ color: 'blue' }}>{contact}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
                className="input-field"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              required
              className="textarea-field"
            ></textarea>
            <div className="button-group">
              <button type="submit">Send</button>
              <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}
        {feedbackMessage && <p>{feedbackMessage}</p>}
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          width: 80%;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        .input-field,
        .textarea-field {
          width: calc(100% - 20px);
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 16px;
          padding: 8px;
        }

        .textarea-field {
          resize: vertical;
          height: 200px;
        }

        .button-group {
          text-align: right;
        }

        button {
          background-color: #010100;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }

        .cancel-button {
          background-color: red;
        }

        button:last-child {
          margin-right: 0;
        }

        @media (max-width: 768px) {
          .modal {
            width: 90%;
          }
        }

        @media (max-width: 480px) {
          .modal {
            width: 95%;
          }
        }
      `}</style>
    </div>
  );
};

export default WriteMessageModal;