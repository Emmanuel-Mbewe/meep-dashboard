import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <p style={modalStyles.message}>{message}</p>
        <button onClick={onClose} style={modalStyles.button}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize:'16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  message: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Modal;
