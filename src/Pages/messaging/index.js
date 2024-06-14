import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai'; // Import the delete icon
import Navbar from './Navbar';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Add loading state

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://meep-back.onrender.com/api/message'); // Corrected endpoint
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://meep-back.onrender.com/api/message');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const deleteMessage = async () => {
    setIsDeleting(true); // Set loading state to true
    try {
      await axios.delete(`https://meep-back.onrender.com/api/message/${selectedMessageId}`); // Corrected endpoint
      // After deletion, fetch updated messages
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setIsDeleting(false); // Set loading state to false
      setShowModal(false);  // Dismiss the modal
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedMessageId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '100%', margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <div>
        {messages.map(message => (
          <div key={message.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '5px', margin: '10px 0', padding: '10px' }}>
            <div>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{message.text}</p>
              <p style={{ fontSize: '1rem', marginBottom: '5px' }}>{message.numbers}</p>
              <p style={{ fontSize: '0.9rem', color: '#616', marginTop: '20px' }}>From: {message.from}</p>
            </div>
            <button onClick={() => handleDeleteClick(message._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: '1.2rem' }}>
              <AiOutlineDelete />
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            <p>Are you sure you want to delete this message?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={deleteMessage} style={{ padding: '10px 20px', background: 'red', color: '#fff', borderRadius: '5px', cursor: 'pointer' }} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Yes'}
              </button>
              <button onClick={handleCloseModal} style={{ padding: '10px 20px', background: '#ccc', color: '#000', borderRadius: '5px', cursor: 'pointer' }} disabled={isDeleting}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 998 }}></div>}
    </div>
  );
};

export default Messages;
