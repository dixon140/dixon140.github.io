import React from 'react';
import ProjectCard from './ProjectCard';
import fPickerImg from '../assets/f1-picker.png';
import nflPickerImg from '../assets/nfl-picker.png';

const projects = [
  {
    title: 'F1 Podium Picker',
    description: 'F1 Podium Picker is a lightweight web app where you predict the top three finishers for each Grand Prix, track your score against actual results, and compete on a simple leaderboard.',
    link: '/projects/f1-picker/f1-picker.html',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
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
    <div className="flex flex-col items-center gap-6 w-full px-4">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

export default Projects; 
