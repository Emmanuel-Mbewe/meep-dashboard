import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const RecentMessages = ({ messages }) => {
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable to control confirmation window

  // Function to handle delete icon click
  const handleDeleteClick = () => {
    setShowConfirmation(true); // Show confirmation window
  };

  // Function to confirm delete action
  const confirmDelete = () => {
    // Implement your delete logic here
    setShowConfirmation(false); // Hide confirmation window
  };

  // Function to cancel delete action
  const cancelDelete = () => {
    setShowConfirmation(false); // Hide confirmation window
  };

  return (
    <div>
      {/* Confirmation window */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}>
            <p style={{ marginBottom: '20px', fontSize: '18px' }}>Are you sure you want to delete this message?</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={confirmDelete} style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '10px 20px',
                margin: '0 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
              }}>Yes</button>
              <button onClick={cancelDelete} style={{
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '10px 20px',
                margin: '0 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
              }}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages && messages.map((message, index) => (
        <div key={index} style={{
          backgroundColor: '#f0f0ff',
          padding: '10px',
          margin: '10px',
          fontSize: '16px',
          color: '#000023',
          borderRadius: '5px',
        }}>
          <p>{message}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{
              fontSize: '12px',
              color: 'gray',
              marginTop: '5px',
            }}>
              {/* Date: {getCurrentDate()} Time: {getCurrentTime()} */}
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaTrash style={{
                marginLeft: '10px',
                cursor: 'pointer',
                color: 'red', // Setting color to red
              }} onClick={handleDeleteClick} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentMessages;
