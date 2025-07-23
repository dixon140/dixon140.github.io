import React from 'react';

const skills = {
  'Programming Languages': [
    'C',
    'C++',
    'Java',
    'Python',
    'JavaScript',
    'SQL'
  ],
  'Web Development': [
    'React',
    'Flask',
    'SQLAlchemy',
    'HTML/CSS',
    'RESTful APIs'
  ],
  'Systems & Tools': [
    'Linux',
    'Git',
    'QT Framework',
    'SQLite',
    'Database Design'
  ],
  'Computer Science': [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Systems Programming'
  ]
};

const categoryStyle = {
  minWidth: 180,
  maxWidth: 220,
  marginBottom: '2rem',
  flex: '1 1 220px',
  background: 'rgba(36,36,40,0.7)',
  borderRadius: '18px',
  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '1.2rem 1rem 1rem 1rem',
};

const Skills = () => (
  <section style={{ margin: '3.5rem 0 3.5rem 0' }}>
    <h2 className="gradient text-2xl" style={{ textAlign: 'center', marginBottom: '2rem' }}>Skills & Tech Stack</h2>
    <p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 2.5rem auto', color: 'var(--text)' }}>
      Strong foundation in computer science fundamentals with hands-on experience in systems programming, web development, and software engineering. Proficient across the full technology stack from low-level C programming to modern web frameworks.
    </p>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2.5rem 2.5rem',
      maxWidth: 900,
      margin: '0 auto',
    }}>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} style={categoryStyle}>
          <h3 style={{ marginBottom: '0.7rem', color: 'var(--accent)', fontSize: '1.1rem', letterSpacing: '1px', textAlign: 'center' }}>{category}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {items.map((item) => (
              <span key={item} className="badge">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills; 