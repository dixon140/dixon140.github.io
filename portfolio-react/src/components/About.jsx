import React from 'react';

const About = () => (
  <section style={{ margin: '3.5rem 0' }} id="about">
    <h2 className="gradient text-2xl" style={{ marginTop: 0, marginBottom: '2.2rem', textAlign: 'center' }}>Education</h2>
    <div style={{
      maxWidth: 600,
      margin: '0 auto'
    }}>
      <div style={{
        background: 'rgba(36,36,40,0.7)',
        borderRadius: '18px',
        padding: '1.5rem',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--boilermaker-gold)', fontSize: '1.2rem' }}>Purdue University</strong>
          <span style={{ color: 'var(--gray)', marginLeft: '1rem', fontSize: '1rem' }}>Aug 2022 - May 2026</span>
        </div>
        <p style={{ margin: '0.5rem 0', color: 'var(--accent)', fontSize: '1.1rem', fontWeight: '600' }}>
          Bachelor of Science, Computer Science
        </p>
        <p style={{ margin: '0.5rem 0', color: 'var(--gray)', fontSize: '0.9rem' }}>
          West Lafayette, Indiana
        </p>
        <div style={{ marginTop: '1.2rem' }}>
          <h4 style={{ color: 'var(--white)', marginBottom: '0.8rem', fontSize: '1rem', textAlign: 'center' }}>Relevant Coursework</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {[
              'Data Structures & Algorithms',
              'Systems Programming', 
              'Operating Systems',
              'Programming in C',
              'Linear Algebra',
              'Information Systems'
            ].map((course) => (
              <span key={course} style={{
                background: 'var(--badge-bg)',
                color: 'var(--text)',
                borderRadius: '8px',
                padding: '0.3rem 0.7rem',
                fontSize: '0.85rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
