import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Thoughts', href: '/thoughts' },
    { name: 'CV', href: '/cv' },
    { name: 'Contact', href: '/#contact' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const sectionId = href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminAuthenticated = localStorage.getItem('adminToken') !== null;

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  // ----------------------------------------------------
  // ADMIN NAVBAR
  // ----------------------------------------------------
  if (isAdminRoute) {
    return (
      <nav className="fixed w-full bg-wixWhite/80 dark:bg-wixDark/80 backdrop-blur-md z-[100] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-wixText dark:text-wixWhite font-bold text-2xl tracking-tighter cursor-pointer"
              onClick={() => navigate('/')}
            >
              Dashboard
            </motion.div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={toggleTheme}
                className="text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixText dark:hover:text-wixWhite focus:outline-none transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>

              {isAdminAuthenticated ? (
                <button 
                  onClick={handleAdminLogout}
                  className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/')}
                  className="text-sm font-bold text-wixTextSecondary hover:text-wixText dark:text-wixDarkTextSecondary dark:hover:text-wixWhite transition-colors"
                >
                  Return to Site
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ----------------------------------------------------
  // NORMAL NAVBAR
  // ----------------------------------------------------
  return (
    <div className="fixed top-0 sm:top-6 left-0 right-0 z-[100] flex justify-center sm:px-4 pointer-events-none">
      <nav className="pointer-events-auto relative w-full sm:max-w-3xl bg-wixWhite/60 dark:bg-wixDark/60 backdrop-blur-xl border-b sm:border border-gray-200/50 dark:border-gray-800/50 sm:rounded-full px-6 py-3 transition-all duration-300 shadow-sm dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
        <div className="flex items-center justify-between">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-wixText dark:text-wixWhite font-medium text-xl tracking-wide cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          >
            Olumide.
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduceMotion ? undefined : { delay: i * 0.05 + 0.2 }}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    (location.pathname === item.href || 
                     (location.pathname === '/' && item.href.includes(location.hash)))
                      ? 'text-wixText dark:text-wixWhite'
                      : 'text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixText dark:hover:text-wixWhite'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700"></div>

            {/* Dark Mode Toggle */}
            <motion.button
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduceMotion ? undefined : { delay: 0.5 }}
              onClick={toggleTheme}
              className="text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixText dark:hover:text-wixWhite transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </motion.button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className="text-wixTextSecondary dark:text-wixDarkTextSecondary focus:outline-none"
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-wixText dark:text-wixWhite hover:opacity-80 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-2 right-2 sm:left-0 sm:right-0 mt-2 bg-wixWhite/90 dark:bg-wixDark/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl md:hidden overflow-hidden shadow-lg p-2"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                    (location.pathname === item.href || 
                     (location.pathname === '/' && item.href.includes(location.hash)))
                      ? 'text-wixText dark:text-wixWhite bg-gray-100 dark:bg-gray-800/50'
                      : 'text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixText dark:hover:text-wixWhite hover:bg-gray-50 dark:hover:bg-gray-800/30'
                  }`}
                  onClick={(e) => handleClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;