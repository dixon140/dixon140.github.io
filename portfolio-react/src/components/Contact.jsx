import React from 'react';

const Contact = () => (
  <section style={{ margin: '3.5rem 0' }} id="contact">
    <h2 className="gradient" style={{ marginTop: 0, marginBottom: '2.2rem', textAlign: 'center' }}>Get In Touch</h2>
    <div style={{
      background: 'rgba(36,36,40,0.7)',
      borderRadius: '18px',
      padding: '2rem',
      boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      maxWidth: 500,
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <p style={{ marginBottom: '1.5rem', color: 'var(--text)', fontSize: '1.1rem' }}>
        I'm always open to discussing new opportunities, collaborations, or just connecting with fellow developers!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <a 
          href="mailto:dixonethan03@gmail.com" 
          style={{ 
            color: 'var(--accent)', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--bright-pink-crayola)'}
          onMouseOut={(e) => e.target.style.color = 'var(--accent)'}
        >
          📧 dixonethan03@gmail.com
        </a>
        <a 
          href="tel:+17657618383" 
          style={{ 
            color: 'var(--accent)', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--bright-pink-crayola)'}
          onMouseOut={(e) => e.target.style.color = 'var(--accent)'}
        >
          📱 (765) 761-8383
        </a>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
          <a 
            href="https://linkedin.com/in/ethan-dixon" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--accent)', 
              textDecoration: 'none', 
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--bright-pink-crayola)'}
            onMouseOut={(e) => e.target.style.color = 'var(--accent)'}
          >
            🔗 LinkedIn
          </a>
          <a 
            href="https://github.com/dixon140" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--accent)', 
              textDecoration: 'none', 
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--bright-pink-crayola)'}
            onMouseOut={(e) => e.target.style.color = 'var(--accent)'}
          >
            💻 GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
