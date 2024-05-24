import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '@/ui-components/layout';
import SubtopicCard from '@/Pages/manage/SubtopicCard';

const subtopicsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '16px',
};

const Subtopics = () => {
  const router = useRouter();
  const { subject, topic } = router.query;
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/subjects/${subject}/topics/${topic}/subtopics`);
        setSubtopics(response.data);
      } catch (error) {
        console.error('Error fetching subtopics:', error);
      }
    };

    if (subject && topic) {
      fetchSubtopics();
    }
  }, [subject, topic]);

  const handleEdit = (sub_topic) => {
    alert(`Edit ${sub_topic}`);
  };

  const handleDelete = (sub_topic) => {
    alert(`Delete ${sub_topic}`);
  };

  if (!subject || !topic) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Layout>
        <h1>Subtopics for {topic} under {subject}</h1>
        <div style={subtopicsStyle}>
          {subtopics.map((subtopic, index) => (
            <SubtopicCard
              key={index}
              subject={subject}
              topic={topic}
              subtopic={subtopic.sub_topic}
              description={subtopic.description}
              imagePath={subtopic.imagePath}
              onEdit={() => handleEdit(subtopic.sub_topic)}
              onDelete={() => handleDelete(subtopic.sub_topic)}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Subtopics;
