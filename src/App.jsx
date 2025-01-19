import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import Thoughts from './components/Thoughts';
import ThoughtPost from './components/ThoughtPost';
import NotFound from './components/NotFound';

// Create a ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <GradientOrbs />
        <Cursor />
        <Navbar />
        <div className="bg-primary/90 backdrop-blur-sm min-h-screen text-textPrimary relative">
          <Doodles />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Hero />
                <Experience />
                <Projects />
                <About />
                <Skills />
                <Contact />
              </main>
            } />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/thoughts/:id" element={<ThoughtPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
