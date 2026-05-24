import { useState, useEffect, useRef } from 'react';

/**
 * Reveals text character by character with a blinking cursor.
 * Props:
 *   text       — full string to animate
 *   speed      — milliseconds per character (default: 30)
 *   onComplete — callback fired once the full text is displayed
 *   className  — extra classes for the wrapping element
 */
export default function TypewriterText({
  text = '',
  speed = 30,
  onComplete,
  className = '',
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  // Reset and restart whenever the source text changes
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    if (!text) return;

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span
          className="inline-block w-px bg-accent-lime animate-pulse ml-px"
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
}
