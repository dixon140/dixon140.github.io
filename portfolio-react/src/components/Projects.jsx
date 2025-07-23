import React from 'react';
import ProjectCard from './ProjectCard';
import linuxTaskManagerImg from '../assets/linux-task-manager.png';
import fPickerImg from '../assets/f1-picker.png';
import nflPickerImg from '../assets/nfl-picker.png';

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
    link: '/projects/f1-picker/f1-picker.html',
    tech: ['React', 'Flask', 'SQLAlchemy', 'SQLite', 'Authentication', 'RESTful APIs'],
    image: fPickerImg,
  },
  {
    title: 'NFL Game Picker',
    description: 'Interactive web application for weekly NFL predictions with dynamic form handling and user interface logic. Implements data persistence and user session management for tracking picks throughout the season.',
    link: '/projects/nfl-picker/standings.html',
    tech: ['JavaScript', 'HTML/CSS', 'Forms', 'Session Management'],
    image: nflPickerImg,
  },
];

const Projects = () => (
  <section className="my-14">
    <h2 className="gradient mt-0 mb-9 text-center text-2xl">Projects</h2>
    <div className="flex flex-col items-center gap-6 w-full">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

export default Projects; 
