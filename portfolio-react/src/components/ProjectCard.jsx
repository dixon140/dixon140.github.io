import React, { useState } from 'react';

const badgeStyle = {
  display: 'inline-block',
  background: 'var(--accent)',
  color: '#fff',
  borderRadius: '12px',
  padding: '0.22rem 0.7rem',
  fontSize: '0.95rem',
  fontWeight: 600,
  marginRight: '0.4rem',
  marginBottom: '0.4rem',
  letterSpacing: '0.5px',
};

const imgStyle = {
  maxWidth: 300,
  maxHeight: 300,
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '5px',
  background: '#eee',
  flexShrink: 0,
  marginRight: '1.5rem',
};

const cardBaseStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  border: '2px solid var(--card-border)',
  borderColor: 'var(--card-border)',
  borderRadius: '18px',
  padding: '1.25rem',
  marginBottom: '1.5rem',
  maxWidth: 650,
  background: 'rgba(255,255,255,0.18)',
  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
  cursor: 'pointer',
};

const cardHoverStyle = {
  boxShadow: '0 12px 32px 0 rgba(255,93,115,0.18)',
  transform: 'scale(1.025)',
  borderColor: 'var(--accent)',
};

const linkBaseStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'var(--accent)',
  transition: 'color 0.2s',
};

const linkHoverStyle = {
  color: 'var(--bright-pink-crayola)',
};

const ProjectCard = ({ title, description, link, tech, image }) => {
  const [hovered, setHovered] = useState(false);

  const handleCardClick = () => {
    if (link.startsWith('http')) {
      // External link - open in new tab
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      // Local link - navigate in same window
      window.location.href = link;
    }
  };

  return (
    <div
      className="project-card"
      style={{ ...cardBaseStyle, ...(hovered ? cardHoverStyle : {}) }}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={handleCardClick}
    >
      <img
        src={image || 'https://via.placeholder.com/120x90?text=Preview'}
        alt={title + ' preview'}
        style={imgStyle}
      />
      <div style={{ flex: 1 }}>
        <div 
          style={{ ...linkBaseStyle, ...(hovered ? linkHoverStyle : {}) }}
          className="project-title"
        >
          {title}
        </div>
        <p style={{ marginTop: '0.5rem', color: 'var(--text)' }}>{description}</p>
        <div style={{ marginTop: '0.75rem' }}>
          {tech && tech.map((t) => (
            <span key={t} style={badgeStyle}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 
