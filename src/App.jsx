import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cursor from "./components/Cursor";
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
import AdminPanel from "./components/AdminPanel";

// Create a ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <Cursor />
        <Navbar />
        <div className="relative z-10 w-full min-h-screen">
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
            <Route path="/admin" element={<><AdminPanel /></>} />
            <Route path="*" element={<><NotFound /><Footer variants={footerVariants} /></>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
