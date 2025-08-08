import Projects from './components/Projects';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Nav from './components/Nav';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="container mx-auto max-w-[800px] px-8 py-8">
      <Nav />
      <div id="home">
        <Hero />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
