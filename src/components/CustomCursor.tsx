import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface RippleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const CustomCursor: React.FC = () => {
  const { cursorState, cursorLabel } = useApp();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [ripples, setRipples] = useState<RippleParticle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  const requestRef = useRef<number>();
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check coarse pointer / touch screens or reduced motion
    const touchMedia = window.matchMedia('(pointer: coarse)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (touchMedia.matches || motionMedia.matches) {
      setIsEnabled(false);
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Magnetic attraction check on elements with data-magnetic
      const target = e.target as HTMLElement | null;
      const magneticElem = target?.closest('[data-magnetic="true"]');
      if (magneticElem) {
        const rect = magneticElem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        // Subtle magnetic pull towards center
        targetX = e.clientX - distanceX * 0.35;
        targetY = e.clientY - distanceY * 0.35;
      }

      mousePosRef.current = { x: targetX, y: targetY };
      setPosition({ x: targetX, y: targetY });

      // Check context attributes if available
      const cursorTarget = target?.closest('[data-cursor]');
      if (cursorTarget) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      // Spawn click ripple particle
      const newRipple: RippleParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: 0,
      };
      setRipples(prev => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Physics interpolation loop for smooth trailing circle
    const animate = () => {
      setTrailingPos(prev => {
        const dx = mousePosRef.current.x - prev.x;
        const dy = mousePosRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  // Remove old click ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isEnabled) return null;

  // Determine active display label and state styling
  let displayLabel = cursorLabel;
  let activeState = cursorState;

  if (activeState === 'DEFAULT') {
    if (isHovered) activeState = 'VIEW';
  }

  if (activeState === 'EXPLORE') displayLabel = displayLabel || 'EXPLORE';
  else if (activeState === 'IMPACT') displayLabel = displayLabel || 'IMPACT';
  else if (activeState === 'TRACE') displayLabel = displayLabel || 'TRACE';
  else if (activeState === 'OPEN') displayLabel = displayLabel || 'OPEN';
  else if (activeState === 'VIEW') displayLabel = displayLabel || 'VIEW';
  else if (activeState === 'DRAG') displayLabel = displayLabel || 'DRAG';

  const isExpanded = activeState !== 'DEFAULT' || isHovered;

  return (
    <>
      {/* Click ripple rings */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="fixed rounded-full border border-[#D9383A] pointer-events-none z-[9998] animate-ping"
          style={{
            left: r.x - 25,
            top: r.y - 25,
            width: 50,
            height: 50,
            animationDuration: '600ms',
          }}
        />
      ))}

      {/* Trailing Outer Ring */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          isExpanded
            ? 'w-20 h-20 bg-[#D9383A]/15 border border-[#D9383A] backdrop-blur-[2px]'
            : 'w-10 h-10 border border-white/40'
        } ${isMouseDown ? 'scale-75' : ''}`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {isExpanded && displayLabel && (
          <span className="text-[10px] font-bold tracking-widest text-white uppercase font-mono animate-pulse">
            {displayLabel}
          </span>
        )}
      </div>

      {/* Central Cursor Dot */}
      <div
        className={`fixed pointer-events-none z-[10000] rounded-full transition-transform duration-100 ${
          isMouseDown ? 'scale-150 bg-[#D9383A]' : 'w-2.5 h-2.5 bg-white'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};
