// pages/index.js
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SubjectList from './SubjectList';
import Head from 'next/head';

const navigationContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

const arrowStyle = {
  cursor: 'pointer',
  fontSize: '24px',
  margin: '0 20px',
};

const ManageContent = () => {
  const handleBack = () => {
    alert('Navigate Back');
    // Add your back navigation logic here
  };

  const handleForward = () => {
    alert('Navigate Forward');
    // Add your forward navigation logic here
  };

  return (
    <>

      <Head>
        <title>Meep Dashboard</title>
        <link style={{ radius: '100%' }} rel="icon" href="/MeeP.png" />
      </Head>

      <div>
      <h1 style={{ marginLeft: '30px' }}>Subjects</h1>
      <SubjectList />
      <div style={navigationContainerStyle}>
        <FaArrowLeft style={arrowStyle} onClick={handleBack} />
        <FaArrowRight style={arrowStyle} onClick={handleForward} />
      </div>
    </div>
    </>
  );
};

export default ManageContent;
