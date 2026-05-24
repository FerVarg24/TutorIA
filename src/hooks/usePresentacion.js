import { useCallback, useEffect, useState } from 'react';

/**
 * @param {number} totalSlides
 */
export function usePresentacion(totalSlides) {
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    setSlideActual(0);
  }, [totalSlides]);

  const irA = useCallback(
    (index) => {
      if (index >= 0 && index < totalSlides) {
        setSlideActual(index);
      }
    },
    [totalSlides],
  );

  const siguiente = useCallback(() => {
    irA(slideActual + 1);
  }, [slideActual, irA]);

  const anterior = useCallback(() => {
    irA(slideActual - 1);
  }, [slideActual, irA]);

  const progreso = totalSlides > 0 ? ((slideActual + 1) / totalSlides) * 100 : 0;

  return {
    slideActual,
    totalSlides,
    progreso,
    irA,
    siguiente,
    anterior,
    esPrimero: slideActual === 0,
    esUltimo: slideActual === totalSlides - 1,
  };
}
