import { useState, useEffect } from 'react';

/**
 * Returns true when animations should be skipped:
 * - OS-level "prefers-reduced-motion: reduce" is active
 * - Network is slow (2g / slow-2g) or Save-Data is on
 * - Device is touch-only (no mouse cursor to follow)
 */
const usePrefersReducedMotion = () => {
  const [shouldReduce, setShouldReduce] = useState(() => {
    // Check OS preference
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (motionQuery?.matches) return true;

    // Check Network Information API
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
    }

    return false;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const checkConditions = () => {
      const prefersReduced = motionQuery?.matches ?? false;
      const isSlowConnection = conn 
        ? (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')
        : false;
      
      setShouldReduce(prefersReduced || isSlowConnection);
    };

    motionQuery?.addEventListener?.('change', checkConditions);
    conn?.addEventListener?.('change', checkConditions);

    return () => {
      motionQuery?.removeEventListener?.('change', checkConditions);
      conn?.removeEventListener?.('change', checkConditions);
    };
  }, []);

  return shouldReduce;
};

/**
 * Returns true when the device is touch-only (no mouse pointer).
 * Used to skip cursor-follower effects.
 */
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(() => {
    return window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  });

  useEffect(() => {
    const query = window.matchMedia?.('(pointer: coarse)');
    const handler = (e) => setIsTouch(e.matches);
    query?.addEventListener?.('change', handler);
    return () => query?.removeEventListener?.('change', handler);
  }, []);

  return isTouch;
};

export default usePrefersReducedMotion;
