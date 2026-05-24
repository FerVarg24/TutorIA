import { useCallback, useEffect, useRef, useState } from 'react';
import { getTextoCompleto } from '../data/resumenesAudio.js';

/**
 * @param {{ secciones: Array<{ titulo: string, texto: string }> } | null} resumen
 */
export function useResumenAudio(resumen) {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [seccionActual, setSeccionActual] = useState(0);

  const utteranceRef = useRef(null);
  const seccionIndexRef = useRef(0);
  const charOffsetRef = useRef(0);
  const totalCharsRef = useRef(0);
  const sectionOffsetsRef = useRef([]);

  const calcularOffsets = useCallback((script) => {
    if (!script?.secciones?.length) {
      sectionOffsetsRef.current = [];
      totalCharsRef.current = 0;
      return;
    }

    let offset = 0;
    const offsets = script.secciones.map((seccion) => {
      const start = offset;
      offset += seccion.texto.length + 1;
      return start;
    });
    sectionOffsetsRef.current = offsets;
    totalCharsRef.current = getTextoCompleto(script).length;
  }, []);

  useEffect(() => {
    calcularOffsets(resumen);
    setProgreso(0);
    setSeccionActual(0);
    setReproduciendo(false);
    setPausado(false);
    seccionIndexRef.current = 0;
    charOffsetRef.current = 0;
  }, [resumen, calcularOffsets]);

  const detener = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setReproduciendo(false);
    setPausado(false);
    setProgreso(0);
    setSeccionActual(0);
    seccionIndexRef.current = 0;
    charOffsetRef.current = 0;
  }, []);

  const hablarSeccion = useCallback(
    (index) => {
      if (!resumen?.secciones?.[index]) return;

      window.speechSynthesis.cancel();

      const seccion = resumen.secciones[index];
      const utterance = new SpeechSynthesisUtterance(seccion.texto);
      utterance.lang = 'es-MX';
      utterance.rate = 0.95;

      utterance.onstart = () => {
        setReproduciendo(true);
        setPausado(false);
        setSeccionActual(index);
        seccionIndexRef.current = index;
      };

      utterance.onboundary = (event) => {
        if (event.name === 'word' || event.name === 'sentence') {
          charOffsetRef.current = (sectionOffsetsRef.current[index] ?? 0) + event.charIndex;
          const pct = totalCharsRef.current
            ? Math.min(100, (charOffsetRef.current / totalCharsRef.current) * 100)
            : 0;
          setProgreso(pct);
        }
      };

      utterance.onend = () => {
        const next = index + 1;
        if (next < resumen.secciones.length) {
          hablarSeccion(next);
        } else {
          setReproduciendo(false);
          setPausado(false);
          setProgreso(100);
        }
      };

      utterance.onerror = () => {
        setReproduciendo(false);
        setPausado(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [resumen],
  );

  const play = useCallback(() => {
    if (!resumen?.secciones?.length) return;

    if (pausado && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setReproduciendo(true);
      setPausado(false);
      return;
    }

    detener();
    hablarSeccion(0);
  }, [resumen, pausado, detener, hablarSeccion]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setReproduciendo(false);
      setPausado(true);
    }
  }, []);

  const toggle = useCallback(() => {
    if (reproduciendo) {
      pause();
    } else {
      play();
    }
  }, [reproduciendo, pause, play]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    reproduciendo,
    pausado,
    progreso,
    seccionActual,
    play,
    pause,
    stop: detener,
    toggle,
  };
}
