import React from 'react';

const skills = {
  'Programming Languages': ['C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
  'Web Development': ['React', 'Flask', 'SQLAlchemy', 'HTML/CSS', 'RESTful APIs'],
  'Systems & Tools': ['Linux', 'Git', 'QT Framework', 'SQLite', 'Database Design'],
  'Computer Science': ['Data Structures', 'Algorithms', 'Operating Systems', 'Systems Programming']
};

const Skills = () => (
  <section className="my-14">
    <h2 className="gradient text-2xl text-center mb-8">Skills & Tech Stack</h2>
    <p className="text-center max-w-[600px] mx-auto mb-10 text-[var(--text)]">
      Strong foundation in computer science fundamentals with hands-on experience in systems programming, web development, and software engineering. Proficient across the full technology stack from low-level C programming to modern web frameworks.
    </p>
    <div className="flex flex-wrap justify-center gap-10 max-w-[900px] mx-auto">
      {Object.entries(skills).map(([category, items]) => (
        <div
          key={category}
          className="min-w-[180px] max-w-[220px] mb-8 flex-1 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] backdrop-blur-[12px] border border-white/10 p-5"
          style={{ background: 'var(--card-bg)' }}
        >
          <h3 className="mb-2 text-[var(--accent)] text-[1.1rem] tracking-wider text-center">{category}</h3>
          <div className="flex flex-wrap justify-center">
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