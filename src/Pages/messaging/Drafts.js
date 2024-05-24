import React, { useState } from 'react';

const Drafts = ({ loadDraft }) => {
  const [drafts, setDrafts] = useState([]);

  // Load drafts from local storage when the component mounts
  useState(() => {
    const savedDrafts = localStorage.getItem('drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // Handle clicking on a draft to load it into the message form
  const handleLoadDraft = (draft) => {
    loadDraft(draft);
  };

  return (
    <div className="drafts-container">
      <h2>Drafts</h2>
      <ul>
        {drafts.map((draft, index) => (
          <li key={index} onClick={() => handleLoadDraft(draft)}>
            <div>To: {draft.to}</div>
            <div>Subject: {draft.subject}</div>
            <div>Message: {draft.message}</div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        /* Styles */
        .drafts-container {
          margin-top: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Drafts;
