import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/nav/Navbar";
import Home from "./components/Home";
import Work from "./components/Work";
import Thoughts from "./components/Thoughts";
import ThoughtPost from "./components/ThoughtPost";
import CV from "./components/CV";
import NotFound from "./components/NotFound";
import Footer from "./components/nav/Footer";
import AdminPanel from "./components/AdminPanel";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AppRoutes() {
  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>Mides corner On the internet.</title>
        <meta name="description" content="click this link if youre cool." />
      </Helmet>
      <Navbar />
      <div className="relative z-10 w-full min-h-screen">
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <><Home /><Footer /></>
            }
          />
          <Route path="/thoughts" element={<><Thoughts /><Footer /></>} />
          <Route path="/thoughts/:slug" element={<><ThoughtPost /><Footer /></>} />
          <Route path="/work" element={<><Work /><Footer /></>} />
          <Route path="/cv" element={<><CV /><Footer /></>} />
          <Route path="/admin" element={<><AdminPanel /></>} />
          <Route path="*" element={<><NotFound /><Footer /></>} />
        </Routes>
      </div>
    </div>
  );
}

export default AppRoutes;
