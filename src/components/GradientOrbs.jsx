import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GradientOrbs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]"
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
          scale: [1, 1.2, 1],
        }}
        transition={{
          scale: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { type: "spring", stiffness: 30, damping: 15 },
          y: { type: "spring", stiffness: 30, damping: 15 },
        }}
      />
      <motion.div
        className="absolute right-0 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[80px]"
        animate={{
          x: -mousePosition.x * 100,
          y: mousePosition.y * 100,
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          scale: {
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 },
        }}
      />
    </div>
  );
};

export default GradientOrbs; 