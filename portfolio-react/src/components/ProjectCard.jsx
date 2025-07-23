import React, { useState } from 'react';

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
      className={`
        project-card flex flex-col md:flex-row items-start border-2 rounded-[18px] p-4 md:p-5 mb-6 max-w-[750px] w-full
        bg-white/18 shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] backdrop-blur-[12px]
        transition-all duration-200 cursor-pointer border-[var(--card-border)]
        ${hovered ? 'shadow-[0_12px_32px_0_rgba(255,93,115,0.18)] md:scale-[1.025] border-[var(--accent)]' : ''}
      `}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={handleCardClick}
    >
      <img
        src={image || 'https://via.placeholder.com/300x300?text=Preview'}
        alt={title + ' preview'}
        className="max-w-[300px] max-h-[300px] w-auto h-auto rounded-md bg-gray-200 flex-shrink-0 mr-0 md:mr-6 mb-4 md:mb-0 mx-auto md:mx-0"
      />
      <div className="flex-1 text-center md:text-left">
        <div 
          className={`
            project-title text-2xl font-bold no-underline transition-colors duration-200
            ${hovered ? 'text-[var(--bright-pink-crayola)]' : 'text-[var(--accent)]'}
          `}
        >
          {title}
        </div>
        <p className="mt-2 text-[var(--text)]">{description}</p>
        <div className="mt-3 flex flex-wrap justify-center md:justify-start">
          {tech && tech.map((t) => (
            <span 
              key={t} 
              className="inline-block bg-[var(--accent)] text-white rounded-xl px-3 py-1 text-[0.95rem] font-semibold mr-2 mb-2 tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 
