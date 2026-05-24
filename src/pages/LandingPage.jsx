import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import BotonPrimario from '../components/BotonPrimario.jsx';
import LandingSphere from '../components/LandingSphere.jsx';

export default function LandingPage() {
  const { setMascota } = useApp();
  const navigate = useNavigate();

  // Trigger mascot entrance animation on mount
  useEffect(() => {
    setMascota({ modo: 'entrada-derecha', mensaje: '' });
  }, [setMascota]);

  return (
    <div className="landing-page relative min-h-screen overflow-hidden bg-white text-ink-deep">
      <div className="landing-page__noise absolute inset-0 -z-10" />
      <div className="landing-page__glow landing-page__glow--left absolute -z-10" />
      <div className="landing-page__glow landing-page__glow--right absolute -z-10" />

      <div className="landing-page__sphere-wrap absolute inset-0 -z-20 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <LandingSphere />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-lg py-section text-center">
        <h1 className="mt-xl font-display font-extrabold leading-[1.04] tracking-[-0.04em] text-ink-deep" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', maxWidth: '760px', textShadow: '0 2px 14px rgba(255, 255, 255, 0.95), 0 0 28px rgba(255, 255, 255, 0.8)' }}>
          Detecta el riesgo antes de que sea tarde.
        </h1>

        <p className="mt-lg max-w-2xl font-ui font-medium text-on-dark-muted" style={{ fontSize: 'clamp(0.95rem, 1.45vw, 1.05rem)', lineHeight: 1.55, textShadow: '0 1px 10px rgba(255, 255, 255, 0.9)' }}>
          Intervención temprana basada en IA para apoyar a los estudiantes del IPN con una lectura visual clara, moderna y centrada en la esfera animada.
        </p>

        <div className="mt-xxl flex flex-wrap justify-center gap-md md:gap-lg">
        <BotonPrimario
          variant="primary"
          className="px-xxl py-lg text-sm shadow-[0_18px_40px_rgba(79,70,229,0.18)] md:text-base"
          onClick={() => navigate('/login/profesor')}
        >
          Soy Profesor
        </BotonPrimario>

        <BotonPrimario
          variant="inverted"
          className="px-xxl py-lg text-sm shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:text-base"
          onClick={() => navigate('/login/alumno')}
        >
          Soy Alumno
        </BotonPrimario>

        </div>

      </main>
    </div>
  );
}
