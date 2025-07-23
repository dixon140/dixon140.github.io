import React from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Nav = () => (
  <nav className="glassy-nav">
    {navLinks.map(link => (
      <a key={link.label} href={link.href}>
        {link.label}
      </a>
    ))}
  </nav>
);

export default Nav; 