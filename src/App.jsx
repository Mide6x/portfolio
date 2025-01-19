import { BrowserRouter } from 'react-router-dom';
import Cursor from './components/Cursor';
import Doodles from './components/Doodles';
import GradientOrbs from './components/GradientOrbs';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <GradientOrbs />
        <Cursor />
        <Navbar />
        <div className="bg-primary/90 backdrop-blur-sm min-h-screen text-textPrimary relative">
          <Doodles />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />
            <Experience />
            <Projects />
            <About />
            <Skills />
            <Contact />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
