import React, { useState } from 'react';
import WriteMessageModal from './WriteMessageModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to load a draft into the message form
  const loadDraft = (draft) => {
    setIsModalOpen(true);
    setTo(draft.to);
    setSubject(draft.subject);
    setMessage(draft.message);
  };

  return (
    <nav className="navbar">
      <ul>
        <li onClick={openModal}>Write a Message</li>
        <li>Drafts</li>
        <li>Sent</li>
        <li>Bin</li>
      </ul>
      <WriteMessageModal isOpen={isModalOpen} onClose={closeModal} to={to} subject={subject} message={message} />
      <style jsx>{`
        .navbar {
          background-color: #010100;
          padding: 20px;
          font-size: 18px;
          color: white;
        }

        ul {
          list-style-type: none;
          padding: 0;
          display: flex;
        }

        li {
          margin-right: 20px;
          cursor: pointer;
        }

        li:last-child {
          margin-right: 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
