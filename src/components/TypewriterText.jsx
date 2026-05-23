import { useEffect, useState } from 'react';

export default function TypewriterText({
  text = '',
  speed = 30,
  onComplete,
  className = '',
}) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    if (!text) return undefined;

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <p className={className}>{displayed}</p>;
}
