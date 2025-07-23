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
    <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
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
      <Experience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
