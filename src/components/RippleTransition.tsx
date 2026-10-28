import React from 'react';
import { useApp } from '../context/AppContext';

export const RippleTransition: React.FC = () => {
  const { rippleActive, rippleCoords } = useApp();

  if (!rippleActive) return null;

  const x = rippleCoords?.x ?? window.innerWidth / 2;
  const y = rippleCoords?.y ?? window.innerHeight / 2;

  return (
    <div className="ripple-transition-overlay overflow-hidden">
      <div
        className="absolute rounded-full bg-gradient-to-r from-[#D9383A]/90 to-[#10B981]/80 backdrop-blur-md transition-all duration-700 ease-out animate-ping"
        style={{
          left: x - 100,
          top: y - 100,
          width: 200,
          height: 200,
          transform: 'scale(15)',
        }}
      />
    </div>
  );
};
