import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectCard from './SubjectCard';

const subjectListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '16px',
};

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div style={subjectListStyle}>
      {subjects.map((subject, index) => (
        <SubjectCard
          key={index}
          title={subject.subject} // Use 'subject' instead of 'title'
          imagePath={subject.imagePath} // Make sure your API response includes 'imageUrl'
        />
      ))}
    </div>
  );
};

export default SubjectList;
