import { useState, useEffect, useRef } from 'react';
import { TypewriterCursor } from './TypewriterCursor.jsx';

/**
 * Reveals text character by character with a blinking cursor.
 * Props:
 *   text       — full string to animate
 *   speed      — milliseconds per character (default: 30)
 *   onComplete — callback fired once the full text is displayed
 *   onProgress — callback fired as characters are revealed
 *   className  — extra classes for the wrapping element
 */
export default function TypewriterText({
  text = '',
  speed = 30,
  onComplete,
  onProgress,
  cursorClassName,
  className = '',
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const progressRef = useRef(onProgress);

  progressRef.current = onProgress;

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    if (!text) return undefined;

    const interval = window.setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current % 8 === 0 || indexRef.current >= text.length) {
        progressRef.current?.();
      }

      if (indexRef.current >= text.length) {
        window.clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && <TypewriterCursor className={cursorClassName ?? 'bg-accent-lime'} />}
    </span>
  );
}
