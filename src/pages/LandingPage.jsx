import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonPrimario from '../components/BotonPrimario.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setMascota } = useApp();

  useEffect(() => {
    setMascota({ modo: 'entrada-derecha', mensaje: '' });
  }, [setMascota]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-canvas-dark px-xl">
      <div className="landing-gradient absolute inset-0 -z-10" aria-hidden="true" />
      <div className="landing-shapes absolute inset-0 -z-10" aria-hidden="true" />

      <h1 className="mb-xxl max-w-3xl text-center font-display text-5xl font-bold text-on-primary md:text-6xl">
        Detecta el riesgo <span className="rounded-xs bg-accent-lime px-md text-ink-deep">antes</span> del parcial
      </h1>

      <p className="mb-section max-w-xl text-center text-lg text-on-dark-muted">
        TutorIA acompaña a profesores y alumnos del IPN con intervención temprana dentro de Microsoft Teams.
      </p>

      <div className="flex flex-wrap justify-center gap-xl">
        <BotonPrimario variant="inverted" onClick={() => navigate('/login/profesor')}>
          Soy Profesor
        </BotonPrimario>
        <BotonPrimario variant="ghost" onClick={() => navigate('/login/alumno')}>
          Soy Alumno
        </BotonPrimario>
      </div>
    </main>
  );
}
