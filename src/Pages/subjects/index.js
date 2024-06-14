import { useState, useEffect } from 'react';
import axios from 'axios';
import UssdNavbar from '../ussd/UssdNavBar';

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(''); // Use class ID instead of name
  const [selectedForm, setSelectedForm] = useState(''); // Used for disabling class creation after reaching the limit
  const [subjectError, setSubjectError] = useState('');
  const [subjectSuccess, setSubjectSuccess] = useState('');
  const [classError, setClassError] = useState('');
  const [classSuccess, setClassSuccess] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes from the database
    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://meep-back.onrender.com/api/v1/class');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    setSubjectError('');
    setSubjectSuccess('');

    if (!selectedClassId) {
      setSubjectError('Please select a class for the subject');
      return;
    }

    try {
      const response = await axios.post('https://meep-back.onrender.com/api/v1/subject', {
        name: subjectName,
        classId: selectedClassId, // Use captured ID here
      });

      setSubjectSuccess(`Subject '${response.data.name}' created successfully!`);
      setSubjectName('');
      setSelectedClassId('');
    } catch (error) {
      setSubjectError(error.response?.data?.error || 'Failed to create subject');
    }
  };

  const handleClassSubmit = async (e) => {
    e.preventDefault();
    setClassError('');
    setClassSuccess('');

    const selectedClassId = e.target.selectedForm.value; // Access the selected option's value

    try {
      const response = await axios.post('https://meep-back.onrender.com/api/v1/class', { name: selectedForm });

      setClassSuccess(`Class '${response.data.name}' created successfully!`);
      setSelectedForm('');
      setClasses([...classes, response.data]); // Update classes state after successful creation
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
                <option value="" disabled={classes.length >= 4} style={classes.length >= 4 ? disabledOptionStyle : null}>Select a Form</option>
                <option value="Form 1" disabled={classes.length >= 4} style={classes.length >= 4 ? disabledOptionStyle : null}>Form 1</option>
                <option value="Form 2" disabled={classes.length >= 4} style={classes.length >= 4 ? disabledOptionStyle : null}>Form 2</option>
                <option value="Form 3" disabled={classes.length >= 4} style={classes.length >= 4 ? disabledOptionStyle : null}>Form 3</option>
                <option value="Form 4" disabled={classes.length >= 4} style={classes.length >= 4 ? disabledOptionStyle : null}>Form 4</option>
              </select>
            </div>
            <button type="submit" style={classes.length >= 4 ? disabledButtonStyle : buttonStyle} disabled={classes.length >= 4}>
              Create Class
            </button>
          </form>
          {classes.length >= 4 && (
            <p style={{ ...messageStyle, color: 'red' }}>You cannot create more than 4 classes. Maximum reached.</p>
          )}
          {classError && <p style={{ ...messageStyle, color: 'red' }}>{classError}</p>}
          {classSuccess && <p style={{ ...messageStyle, color: 'green' }}>{classSuccess}</p>}
        </div>

        {/* Subject Form */}
        <div style={{ ...formStyle, marginRight: '20px' }}>
          <h1 style={headingStyle}>Create a New Subject</h1>
          <form onSubmit={handleSubjectSubmit}>
            <div>
              <label htmlFor="subjectName">Subject Name:</label>
              <input
                type="text"
                id="subjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="selectedClass">Assign to Class:</label>
              <select
                id="selectedClass"
                value={selectedClassId} // Use captured ID here
                onChange={(e) => setSelectedClassId(e.target.value)}
                disabled={!classes.length}
                style={inputStyle}
              >
                <option value="">Select a Class (Optional)</option>
                {classes.map((classe) => (
                  <option key={classe._id} value={classe._id}>
                    {classe.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" style={buttonStyle} disabled={!selectedClassId}>
              Create Subject
            </button>
          </form>
          {subjectError && <p style={{ ...messageStyle, color: 'red' }}>{subjectError}</p>}
          {subjectSuccess && <p style={{ ...messageStyle, color: 'green' }}>{subjectSuccess}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateSubject;
