import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  direction = 'right',
  speed = 0.5,
  borderColor = '#271e37',
  squareSize = 40,
  hoverFillColor = '#222222',
}) => {
  const [squares, setSquares] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  useEffect(() => {
    // Calculate number of squares based on window size and square size
    const calculateSquares = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const cols = Math.ceil(width / squareSize) + 1;
      const rows = Math.ceil(height / squareSize) + 1;
      
      const newSquares = [];
      let id = 0;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          newSquares.push({
            id: id++,
            x: x * squareSize,
            y: y * squareSize,
          });
        }
      }
      
      setSquares(newSquares);
    };

    calculateSquares();
    window.addEventListener('resize', calculateSquares);
    
    return () => {
      window.addEventListener('resize', calculateSquares);
    };
  }, [squareSize]);

  const getAnimationVariants = () => {
    const baseTransition = {
      duration: 20 / speed,
      repeat: Infinity,
      ease: "linear"
    };
    
    switch (direction) {
      case 'diagonal':
        return {
          animate: {
            x: [0, squareSize, 0],
            y: [0, squareSize, 0],
            transition: baseTransition
          }
        };
      case 'up':
        return {
          animate: {
            y: [0, -squareSize, 0],
            transition: baseTransition
          }
        };
      case 'right':
        return {
          animate: {
            x: [0, squareSize, 0],
            transition: baseTransition
          }
        };
      case 'down':
        return {
          animate: {
            y: [0, squareSize, 0],
            transition: baseTransition
          }
        };
      case 'left':
        return {
          animate: {
            x: [0, -squareSize, 0],
            transition: baseTransition
          }
        };
      default:
        return {
          animate: {
            x: [0, squareSize, 0],
            transition: baseTransition
          }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0a1a] to-black opacity-90"></div>
      {squares.map((square) => (
        <motion.div
          key={square.id}
          className="absolute border border-opacity-20 pointer-events-auto"
          style={{
            width: squareSize,
            height: squareSize,
            left: square.x,
            top: square.y,
            borderColor: borderColor,
            backgroundColor: hoveredSquare === square.id ? hoverFillColor : 'transparent',
          }}
          variants={variants}
          animate="animate"
          onMouseEnter={() => setHoveredSquare(square.id)}
          onMouseLeave={() => setHoveredSquare(null)}
          // Stagger the animations
          transition={{
            ...variants.animate.transition,
            delay: (square.id % 10) * 0.1
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;