import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Doodle = ({ path, initialX, initialY, scrollRange, mouseInfluence = 30, thickness = 2 }) => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * mouseInfluence,
        y: (e.clientY / window.innerHeight - 0.5) * mouseInfluence,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseInfluence]);

  const y = useTransform(scrollYProgress, [0, 1], [initialY, initialY + scrollRange]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <motion.path
      d={path}
      stroke="#64FFDA"
      strokeWidth={thickness}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      style={{ 
        pathLength,
        filter: 'drop-shadow(0 0 2px rgba(100, 255, 218, 0.5))'
      }}
      animate={{ 
        x: initialX + mousePosition.x,
        y: springY,
      }}
      transition={{ 
        x: { type: "spring", stiffness: 50, damping: 20 },
      }}
    />
  );
};

Doodle.propTypes = {
  path: PropTypes.string.isRequired,
  initialX: PropTypes.number.isRequired,
  initialY: PropTypes.number.isRequired,
  scrollRange: PropTypes.number.isRequired,
  mouseInfluence: PropTypes.number,
  thickness: PropTypes.number
};

const Doodles = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create multiple S-shaped ribbons throughout the page
  const createRibbonPath = (startY, controlPoints) => `
    M ${dimensions.width * controlPoints[0]},${startY + dimensions.height * controlPoints[1]}
    C ${dimensions.width * controlPoints[2]},${startY + dimensions.height * controlPoints[3]}
    ${dimensions.width * controlPoints[4]},${startY + dimensions.height * controlPoints[5]}
    ${dimensions.width * controlPoints[6]},${startY + dimensions.height * controlPoints[7]}
  `;

  // Create ribbons at different sections
  const ribbons = [
    // Hero section ribbon
    {
      path: createRibbonPath(0, [0.1, 0.2, 0.3, 0.1, 0.4, 0.3, 0.9, 0.2]),
      thickness: 12,
      scrollRange: dimensions.height * 0.5
    },
    // Experience section ribbon
    {
      path: createRibbonPath(dimensions.height, [0.9, 0.2, 0.7, 0.3, 0.5, 0.1, 0.1, 0.3]),
      thickness: 10,
      scrollRange: dimensions.height * 0.4
    },
    // Projects section ribbon
    {
      path: createRibbonPath(dimensions.height * 2, [0.1, 0.1, 0.3, 0.3, 0.6, 0.2, 0.8, 0.1]),
      thickness: 14,
      scrollRange: dimensions.height * 0.6
    },
    // About section ribbon
    {
      path: createRibbonPath(dimensions.height * 3, [0.8, 0.2, 0.6, 0.1, 0.3, 0.3, 0.1, 0.2]),
      thickness: 8,
      scrollRange: dimensions.height * 0.3
    }
  ];

  // Create graffiti elements for each section
  const createGraffitiElements = (startY) => [
    {
      path: `M${dimensions.width * 0.2},${startY + dimensions.height * 0.3} 
             Q${dimensions.width * 0.3},${startY + dimensions.height * 0.4} 
             ${dimensions.width * 0.4},${startY + dimensions.height * 0.3}`,
      thickness: 6,
      scrollRange: dimensions.height * 0.3
    },
    {
      path: `M${dimensions.width * 0.6},${startY + dimensions.height * 0.6} 
             C${dimensions.width * 0.7},${startY + dimensions.height * 0.5} 
             ${dimensions.width * 0.8},${startY + dimensions.height * 0.7} 
             ${dimensions.width * 0.7},${startY + dimensions.height * 0.8}`,
      thickness: 8,
      scrollRange: dimensions.height * 0.4
    },
    // Spray paint dots
    ...Array.from({ length: 6 }, (_, i) => ({
      path: `M${dimensions.width * (0.2 + i * 0.12)},${startY + dimensions.height * (0.4 + Math.sin(i) * 0.1)} 
             a2,2 0 1,0 4,0 
             a2,2 0 1,0 -4,0`,
      thickness: 3,
      scrollRange: dimensions.height * 0.2
    }))
  ];

  // Combine graffiti elements for all sections
  const allGraffitiElements = [
    ...createGraffitiElements(0), // Hero section
    ...createGraffitiElements(dimensions.height), // Experience section
    ...createGraffitiElements(dimensions.height * 2), // Projects section
    ...createGraffitiElements(dimensions.height * 3), // About section
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-difference">
      <svg className="w-full h-full">
        {/* Main ribbons */}
        {ribbons.map((ribbon, index) => (
          <Doodle
            key={`ribbon-${index}`}
            path={ribbon.path}
            initialX={0}
            initialY={0}
            scrollRange={ribbon.scrollRange}
            thickness={ribbon.thickness}
          />
        ))}

        {/* Graffiti elements */}
        {allGraffitiElements.map((element, index) => (
          <Doodle
            key={`graffiti-${index}`}
            path={element.path}
            initialX={0}
            initialY={0}
            scrollRange={element.scrollRange}
            thickness={element.thickness}
          />
        ))}
      </svg>
    </div>
  );
};

export default Doodles; 