import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '@/ui-components/layout';
import TopicCard from '@/Pages/manage/TopicCard';

const subjectTopicsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '16px',
};

const SubjectTopics = () => {
  const router = useRouter();
  const { subject } = router.query;
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/subjects/${subject}/topics`);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    if (subject) {
      fetchTopics();
    }
  }, [subject]);

  const handleEdit = (title) => {
    alert(`Edit ${title}`);
  };

  const handleDelete = (title) => {
    alert(`Delete ${title}`);
  };

  if (!subject) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Layout>
        <h1>Topics for {subject}</h1>
        <div style={subjectTopicsStyle}>
          {topics.map((topic, index) => (
            <TopicCard
              key={index}
              subject={subject}
              title={topic.topic}
              description={topic.description}
              imagePath={topic.imagePath}
              onEdit={() => handleEdit(topic.topic)}
              onDelete={() => handleDelete(topic.topic)}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default SubjectTopics;
