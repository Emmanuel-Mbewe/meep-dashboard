// components/TopicCard.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  flex: '0 1 calc(33.333% - 32px)', // Adjusted for better margins
  boxSizing: 'border-box',
  overflow: 'hidden', // Ensure content doesn't overflow
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer', // Indicate that the card is clickable
};

const cardHoverStyle = {
  transform: 'scale(1.05)',
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0 0 0',
};

const iconStyle = {
  cursor: 'pointer',
};

const editIconStyle = {
  ...iconStyle,
  color: 'green',
};

const deleteIconStyle = {
  ...iconStyle,
  color: 'red',
};

const TopicCard = ({ subject, title, description, imageUrl, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/subjects/${subject}/${title}`);
  };

  return (
    <div
      style={isHovered ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <img src={imageUrl} alt={title} style={imageStyle} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div style={iconContainerStyle}>
        <FaEdit style={editIconStyle} onClick={(e) => { e.stopPropagation(); onEdit(); }} />
        <FaTrash style={deleteIconStyle} onClick={(e) => { e.stopPropagation(); onDelete(); }} />
      </div>
    </div>
  );
};

export default TopicCard;
