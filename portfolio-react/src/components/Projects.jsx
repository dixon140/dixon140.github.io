import React from 'react';
import ProjectCard from './ProjectCard';
import linuxTaskManagerImg from '../assets/linux-task-manager.png';

const sampleImg = 'https://via.placeholder.com/120x90?text=Preview';

const projects = [
  {
    title: 'Linux Task Manager',
    description: 'Systems programming project using C and QT to build a task manager that reads from the /proc filesystem. Features real-time process monitoring, memory mapping visualization, and process control (kill, stop, continue). Team collaboration with 3 developers.',
    link: 'https://github.com/dixon140/linux-task-manager', // Update with real GitHub link
    tech: ['C', 'QT', 'Linux', 'Systems Programming', '/proc filesystem'],
    image: linuxTaskManagerImg,
  },
  {
    title: 'F1 Race Tracker',
    description: 'Full-stack web application with React frontend and Flask/SQLAlchemy backend. Features secure user authentication, admin privileges, and relational database design with multiple tables (Drivers, Teams, Races, Results). Comprehensive racing management platform.',
    link: '../f1-picker.html', // Navigate up one level to parent directory
    tech: ['React', 'Flask', 'SQLAlchemy', 'SQLite', 'Authentication', 'RESTful APIs'],
    image: sampleImg,
  },
  {
    title: 'NFL Game Picker',
    description: 'Interactive web application for weekly NFL predictions with dynamic form handling and user interface logic. Implements data persistence and user session management for tracking picks throughout the season.',
    link: '../standings.html', // Navigate up one level to parent directory
    tech: ['JavaScript', 'HTML/CSS', 'Forms', 'Session Management'],
    image: sampleImg,
  },
];

const Projects = () => (
  <section style={{ margin: '3.5rem 0' }}>
    <h2 className="gradient" style={{ marginTop: 0, marginBottom: '2.2rem', textAlign: 'center' }}>Projects</h2>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      width: '100%',
    }}>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

export default Projects; 
