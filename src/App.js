import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Education from './components/Sections/Education';
import Blog from './components/Sections/Blog';
import Contact from './components/Sections/Contact';
import { portfolioConfig } from './config/portfolio';
import './App.css';
import './index.css'; // Ensure index.css is imported for global styles

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        {portfolioConfig.showExperience && <Experience />}
        {portfolioConfig.showEducation && <Education />}
        <Projects />
        {portfolioConfig.showBlog && <Blog />}
        <Contact />
      </main>
    </div>
  );
}

export default App;
