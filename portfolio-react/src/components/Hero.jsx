import React from 'react';

const Hero = () => (
  <section style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3.5rem 0 2.5rem 0',
    background: 'var(--hero-bg)',
    color: 'var(--hero-text)',
    borderRadius: '1.5rem',
    marginBottom: '2.5rem',
    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1.5px solid rgba(255,255,255,0.08)'
  }}>
    {/* Optional avatar: <img src="/avatar.png" alt="Ethan Dixon" style={{ width: 100, borderRadius: '50%', marginBottom: '1rem' }} /> */}
    <h1 className="gradient" style={{ fontSize: '2.8rem', margin: 0, fontFamily: 'Montserrat, Bebas Neue, sans-serif', letterSpacing: '2px', marginBottom: '1.1rem' }}>Ethan Dixon</h1>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 400, margin: '0 0 0.5rem 0', color: 'var(--hero-accent)' }}>Computer Science Student & Developer</h2>
    <p style={{ fontSize: '1.1rem', maxWidth: 500, textAlign: 'center', margin: 0 }}>
      Purdue CS student passionate about building robust applications - from systems programming in C/C++ to full-stack web development. Experience includes professional software engineering at Elanco Animal Health.
    </p>
  </section>
);

export default Hero; 