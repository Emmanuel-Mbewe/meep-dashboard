// pages/content.js
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Content = () => {
  const [contentList, setContentList] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/content');
        const data = await response.json();
        setContentList(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchData();
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const deleteContent = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/content/${id}`, {
        method: 'DELETE',
      });
      setContentList(contentList.filter(content => content._id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const styles = {
    contentContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: '20px',
    },
    contentCard: {
      width: '48%',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginBottom: '20px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    contentIcons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '10px',
    },
    editIcon: {
      color: 'green',
      cursor: 'pointer',
    },
    deleteIcon: {
      color: 'red',
      cursor: 'pointer',
    },
    contentImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      marginBottom: '10px',
    },
    contentDetails: {
      flexGrow: 1,
    },
    contentText: {
      whiteSpace: 'pre-wrap',
    },
    readMore: {
      color: 'blue',
      cursor: 'pointer',
    },
    videoLink: {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.contentContainer}>
      {contentList.map((content) => (
        <div key={content._id} style={styles.contentCard}>
          {content.imagePath && (
            <img src={`http://localhost:8000/${content.imagePath}`} alt={content.subject} style={styles.contentImage} />
          )}
          <div style={styles.contentDetails}>
            <h3>{content.subject}</h3>
            <p>{content.topic}</p>
            <p>{content.sub_topic}</p>
            <div style={styles.contentText}>
              <div dangerouslySetInnerHTML={{ __html: expanded[content._id] ? content.text : content.text.slice(0, 100) }} />
              {content.text.length > 100 && (
                <span style={styles.readMore} onClick={() => toggleReadMore(content._id)}>
                  {expanded[content._id] ? 'Read less' : 'Read more'}
                </span>
              )}
            </div>
          </div>
          {content.videoPath && (
            <div>
              <a href={`http://localhost:8000/${content.videoPath}`} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
                View Video
              </a>
            </div>
          )}
          <div style={styles.contentIcons}>
            <FaEdit style={styles.editIcon} />
            <FaTrashAlt style={styles.deleteIcon} onClick={() => deleteContent(content._id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
