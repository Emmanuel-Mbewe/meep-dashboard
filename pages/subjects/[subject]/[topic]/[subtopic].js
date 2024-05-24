import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/ui-components/layout';

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  fontSize: '16px',
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const upperSectionStyle = {
  display: 'flex',
  marginBottom: '16px',
};

const imageStyle = {
  width: '50%',
  height: 'auto',
  borderRadius: '8px 0 0 8px',
};

const contentRightStyle = {
  width: '50%',
  padding: '16px',
};

const contentBottomStyle = {
  width: '100%',
  paddingTop: '16px',
};

const videoStyle = {
  width: '100%',
  height: 'auto',
};

const SubtopicContent = () => {
  const router = useRouter();
  const { subject, topic, subtopic } = router.query;
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/subjects/${subject}/topics/${topic}/subtopics/${subtopic}/content`);
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    if (subject && topic && subtopic) {
      fetchContent();
    }
  }, [subject, topic, subtopic]);

  if (!subject || !topic || !subtopic || !content) {
    return <p>Loading...</p>;
    
  }
  console.log(content);

  return (
    <Layout>
      <div style={containerStyle}>
        <h1>{content.title}</h1>
        <div style={upperSectionStyle}>
          <img src={content.imagePath} alt={content.title} style={imageStyle} />
          <div style={contentRightStyle}>
            <p>{content.description}</p>
          </div>
        </div>
        <div style={contentBottomStyle}>
          <p>{content.text}</p>
          <video controls style={videoStyle}>
            <source src={content.videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default SubtopicContent;
