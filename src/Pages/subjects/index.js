import { useState, useEffect } from 'react';
import axios from 'axios';
import UssdNavbar from '../ussd/UssdNavBar';


const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [subjectSuccess, setSubjectSuccess] = useState('');
  const [classError, setClassError] = useState('');
  const [classSuccess, setClassSuccess] = useState('');
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch forms from the database
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    setSubjectError('');
    setSubjectSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/courses', { name: subjectName });

      setSubjectSuccess(`Subject '${response.data.name}' created successfully!`);
      setSubjectName('');
    } catch (error) {
      setSubjectError(error.response?.data?.error || 'Failed to create subject');
    }
  };

  const handleClassSubmit = async (e) => {
    e.preventDefault();
    setClassError('');
    setClassSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/forms', { name: selectedForm });

      setClassSuccess(`Class '${response.data.name}' created successfully!`);
      setSelectedForm('');
    } catch (error) {
      setClassError(error.response?.data?.error || 'Failed to create class');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 10px', // Add margin between forms
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  const disabledOptionStyle = {
    color: '#ccc',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  };

  const messageStyle = {
    marginTop: '10px',
    textAlign: 'center',
  };

  return (
   <>
      <UssdNavbar />
      <div style={containerStyle}>
        {/* Subject Form */}
        <div style={{ ...formStyle, marginRight: '20px' }}>
          <h1 style={headingStyle}>Create a New Course</h1>
          <form onSubmit={handleSubjectSubmit}>
            <div>
              <label htmlFor="subjectName">Course Name:</label>
              <input
                type="text"
                id="subjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle}>Create Course</button>
          </form>
          {subjectError && <p style={{ ...messageStyle, color: 'red' }}>{subjectError}</p>}
          {subjectSuccess && <p style={{ ...messageStyle, color: 'green' }}>{subjectSuccess}</p>}
        </div>

        {/* Class Form */}
        <div style={formStyle}>
          <h1 style={headingStyle}>Create a New Class</h1>
          <form onSubmit={handleClassSubmit}>
            <div>
              <label htmlFor="selectedForm">Select Form:</label>
              <select
                id="selectedForm"
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="" disabled={forms.length >= 4} style={forms.length >= 4 ? disabledOptionStyle : null}>Select a Form</option>
                <option value="Form 1" disabled={forms.length >= 4} style={forms.length >= 4 ? disabledOptionStyle : null}>Form 1</option>
                <option value="Form 2" disabled={forms.length >= 4} style={forms.length >= 4 ? disabledOptionStyle : null}>Form 2</option>
                <option value="Form 3" disabled={forms.length >= 4} style={forms.length >= 4 ? disabledOptionStyle : null}>Form 3</option>
                <option value="Form 4" disabled={forms.length >= 4} style={forms.length >= 4 ? disabledOptionStyle : null}>Form 4</option>
              </select>
            </div>
            <button type="submit" style={forms.length >= 4 ? disabledButtonStyle : buttonStyle} disabled={forms.length >= 4}>
              Create Class
            </button>
          </form>
          {forms.length >= 4 && (
            <p style={{ ...messageStyle, color: 'red' }}>You cannot create more than 4 classes. Maximum reached.</p>
          )}
          {classError && <p style={{ ...messageStyle, color: 'red' }}>{classError}</p>}
          {classSuccess && <p style={{ ...messageStyle, color: 'green' }}>{classSuccess}</p>}
        </div>
      </div>
   </>
  );
};

export default CreateSubject;