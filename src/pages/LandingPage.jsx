import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import BotonPrimario from '../components/BotonPrimario.jsx';

export default function LandingPage() {
  const { setMascota } = useApp();
  const navigate = useNavigate();

  // Trigger mascot entrance animation on mount
  useEffect(() => {
    setMascota({ modo: 'entrada-derecha', mensaje: '' });
  }, [setMascota]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="landing-gradient absolute inset-0 -z-10" />

      {/* Floating geometric shapes */}
      <div className="landing-shapes absolute inset-0 -z-10" />

      {/* Logo / project name */}
      <p className="font-display text-on-dark-muted text-sm uppercase tracking-widest mb-xl">
        TutorIA — IPN
      </p>

      {/* Main headline */}
      <h1 className="font-display text-on-primary text-center leading-tight mb-lg"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '720px' }}>
        Detecta el riesgo{' '}
        <span className="bg-accent-lime text-ink-deep px-xs rounded-sm">
          antes
        </span>{' '}
        de que sea tarde
      </h1>

      {/* Subtitle */}
      <p className="font-ui text-on-dark-muted text-center mb-xxl"
         style={{ fontSize: '1.125rem', maxWidth: '480px' }}>
        Intervención temprana basada en IA para apoyar a los estudiantes del IPN
        antes de que termine el parcial.
      </p>

      {/* CTA buttons */}
      <div className="flex gap-lg flex-wrap justify-center">
        <BotonPrimario
          variant="inverted"
          className="px-xxl py-lg text-base"
          onClick={() => navigate('/login/profesor')}
        >
          Soy Profesor
        </BotonPrimario>

        <BotonPrimario
          variant="ghost"
          className="px-xxl py-lg text-base"
          onClick={() => navigate('/login/alumno')}
        >
          Soy Alumno
        </BotonPrimario>
      </div>

      {/* Hackathon badge */}
      <p className="font-ui text-on-dark-faint text-xs mt-section text-center">
        Hackathon Universitario de Impacto Social con AI · Microsoft México
      </p>
    </div>
  );
}
