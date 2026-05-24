import { useEffect, useRef, useState } from 'react';
import { TypewriterCursor } from './TypewriterCursor.jsx';
import { cn } from '@/lib/utils';

/**
 * Reveals text progressively toward a growing target string.
 * Ideal for voice agent streaming where deltas arrive in chunks.
 */
export default function StreamingTypewriter({
  text = '',
  speed = 18,
  className,
  onProgress,
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const prevTextRef = useRef(text);
  const progressRef = useRef(onProgress);

  progressRef.current = onProgress;

  useEffect(() => {
    if (text.length < prevTextRef.current.length) {
      setDisplayedLength(0);
    }
    prevTextRef.current = text;
  }, [text]);

  useEffect(() => {
    if (displayedLength >= text.length) return undefined;

    const timer = window.setTimeout(() => {
      setDisplayedLength((prev) => {
        const next = Math.min(prev + 1, text.length);
        if (next % 8 === 0 || next === text.length) {
          progressRef.current?.();
        }
        return next;
      });
    }, speed);

    return () => window.clearTimeout(timer);
  }, [displayedLength, text.length, speed]);

  const done = displayedLength >= text.length;
  const displayed = text.slice(0, displayedLength);

  return (
    <span className={cn('inline', className)}>
      {displayed}
      {!done && <TypewriterCursor />}
    </span>
  );
}
