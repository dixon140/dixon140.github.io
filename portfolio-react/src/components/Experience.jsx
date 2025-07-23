import React from 'react';

const Experience = () => (
  <section style={{ margin: '3.5rem 0' }} id="experience">
    <h2 className="gradient" style={{ marginTop: 0, marginBottom: '2.2rem', textAlign: 'center' }}>Professional Experience</h2>
    <div style={{
      maxWidth: 650,
      margin: '0 auto'
    }}>
      <div style={{
        background: 'rgba(36,36,40,0.7)',
        borderRadius: '18px',
        padding: '1.8rem',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <h3 style={{ color: 'var(--accent)', margin: '0 0 1.2rem 0', fontSize: '1.3rem' }}>Full-Stack Software Engineer Intern</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <strong style={{ color: 'var(--text)', fontSize: '1.1rem' }}>Elanco Animal Health</strong>
            <span style={{ color: 'var(--gray)', fontSize: '1rem' }}>May 2023 - Aug 2023</span>
          </div>
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text)', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.8rem' }}>
            <strong>Designed and implemented</strong> structured digital workflows using BIOVIA OneLab, integrating data capture, 
            user interface logic, and backend configuration for regulatory-compliant laboratory operations
          </li>
          <li style={{ marginBottom: '0.8rem' }}>
            <strong>Collaborated with cross-functional teams</strong> including local technicians and global development teams 
            to implement workflow improvements and optimize existing systems
          </li>
          <li>
            <strong>Authored 500+ code changes and fixes</strong> to existing workflows while developing 10+ new methods 
            from scratch using a proprietary Python-like programming language
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default Experience;
