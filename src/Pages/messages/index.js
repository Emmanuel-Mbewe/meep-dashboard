// pages/index.js
import React from 'react';
import Navbar from './Navbar';
import RecentMessages from './RecentMessages';

const messages = [
  'Message 1',
  'Message 2',
  'Message 3',
  // Add more messages as needed
];

const IndexPage = () => {
  return (
    <div className="container">
      <Navbar />
      <RecentMessages messages={messages} />
    </div>
  );
};

export default IndexPage;
