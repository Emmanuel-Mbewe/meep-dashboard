import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCloudDownloadAlt, FaRegFilePdf, FaLongArrowAltDown } from 'react-icons/fa';
import ActionButton from '@/ui-components/ActionButton';
import Table from '@/ui-components/Table';

const table_column_heading = [
  {
    key: 'quiz',
    heading: 'Quiz',
  },
  {
    key: 'quiz-date',
    heading: 'Quiz date',
    icon: FaLongArrowAltDown,
  },
  {
    key: 'action-btn',
    heading: '',
  },
];

const QuizzesAndResults = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/documents');
        setPdfs(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching PDFs:', err);
        setError('Failed to fetch PDFs');
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const handleDownload = async (pdfId, pdfFileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/documents/${pdfId}/download`, {
        responseType: 'blob', // Specify response type as blob
      });
      
      // Create a blob URL for the downloaded file
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element and simulate click to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFileName;
      document.body.appendChild(link);
      link.click();

      // Clean up resources
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const table_data = pdfs.map(pdf => ({
    id: pdf.id,
    quiz: {
      value: pdf.fileName,
      link: pdf.url, 
      icon: FaRegFilePdf,
    },
    'quiz-date': {
      value: new Date().toLocaleDateString(),
    },
    'action-btn': {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
          onClick={() => handleDownload(pdf.id, pdf.fileName)}
        />
      ),
    },
  }));

  return (
    <Table
      mainHeading={'Download your previous quiz qustions and answers'}
      headingRightItem={() => <div></div>}
      heading={table_column_heading}
      data={table_data}
    />
  );
};

export default QuizzesAndResults;