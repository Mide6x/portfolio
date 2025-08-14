import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cursor from "./components/Cursor";
import Doodles from "./components/Doodles";
import GradientOrbs from "./components/GradientOrbs";
import Navbar from "./components/nav/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Thoughts from "./components/Thoughts";
import ThoughtPost from "./components/ThoughtPost";
import CV from "./components/CV";
import NotFound from "./components/NotFound";
import Footer from "./components/nav/Footer"; 

// Create a ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component to conditionally render Doodles
const ConditionalDoodles = () => {
  const { pathname } = useLocation();
  const hideDoodlesRoutes = ['/thoughts/', '/cv'];
  
  const shouldHideDoodles = hideDoodlesRoutes.some(route => 
    pathname.startsWith(route) || pathname === '/thoughts'
  );
  
  return shouldHideDoodles ? null : <Doodles />;
};

function App() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <GradientOrbs />
        <Cursor />
        <Navbar />
        <div className="bg-primary/90 backdrop-blur-sm min-h-screen text-textPrimary relative">
          <ConditionalDoodles />
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Hero />
                    <Experience />
                    <Projects />
                    <About />
                    <Skills />
                    <Contact />
                  </main>
                  <Footer variants={footerVariants} />
                </>
              }
            />
            <Route path="/thoughts" element={<><Thoughts /><Footer variants={footerVariants} /></>} />
            <Route path="/thoughts/:id" element={<><ThoughtPost /><Footer variants={footerVariants} /></>} />
            <Route path="/cv" element={<><CV /><Footer variants={footerVariants} /></>} />
            <Route path="*" element={<><NotFound /><Footer variants={footerVariants} /></>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
