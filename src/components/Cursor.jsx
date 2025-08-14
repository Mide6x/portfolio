import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (e && typeof e.clientX === 'number' && typeof e.clientY === 'number') {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        setMousePosition({ 
          x: e.clientX,
          y: e.clientY + scrollY
        });
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('scroll', updateMousePosition, true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('scroll', updateMousePosition, true);
    };
  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 9999
    }}>
      <motion.div
        style={{
          position: 'absolute',
          left: (mousePosition.x || 0) - 8,
          top: (mousePosition.y || 0) - 8,
          width: '16px',
          height: '16px',
          backgroundColor: '#64FFDA',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          pointerEvents: 'none'
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 100,
          damping: 10,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          left: (mousePosition.x || 0) - 16,
          top: (mousePosition.y || 0) - 16,
          width: '32px',
          height: '32px',
          border: '2px solid #64FFDA',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.7,
          stiffness: 50,
          damping: 10,
        }}
      />
    </div>
  );
};

export default Cursor;