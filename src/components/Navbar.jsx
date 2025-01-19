import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Thoughts', href: '/thoughts' },
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
        // Wait for navigation to complete before scrolling
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

  return (
    <nav className="fixed w-full bg-primary/90 backdrop-blur-sm z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-secondary font-mono text-xl cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.8 }
            }}
          >
            OA
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                  className={`text-textSecondary hover:text-secondary px-3 py-2 font-mono text-sm relative group cursor-pointer ${
                    (location.pathname === item.href || 
                     (location.pathname === '/' && item.href.includes(location.hash)))
                      ? 'text-secondary'
                      : ''
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-secondary">{`0${i + 1}.`}</span>
                  <span className="ml-2">{item.name}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-secondary/80"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-textSecondary hover:text-secondary block px-3 py-2 font-mono text-base"
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 