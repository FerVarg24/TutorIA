import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import BotonPrimario from '../components/BotonPrimario.jsx';
import { USUARIOS_ALUMNO } from '../services/mockData.js';

/** Generates a random integer in [min, max] inclusive. */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function LoginAlumno() {
  const { setMascota, login } = useApp();
  const navigate = useNavigate();

  const [boleta, setBoleta] = useState('');
  const [password, setPassword] = useState('');
  const [captchaRespuesta, setCaptchaRespuesta] = useState('');
  const [error, setError] = useState('');

  // Generate CAPTCHA once on mount; store operands in a ref to avoid regeneration on re-renders
  const captchaRef = useRef({
    a: randomInt(1, 9),
    b: randomInt(1, 9),
  });
  const { a, b } = captchaRef.current;
  const captchaEsperado = a + b;

  // Trigger mascot bounce on mount
  useEffect(() => {
    setMascota({ modo: 'bounce', mensaje: '' });
  }, [setMascota]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validate CAPTCHA first
    if (parseInt(captchaRespuesta, 10) !== captchaEsperado) {
      setError('Respuesta del captcha incorrecta');
      return;
    }

    // Validate credentials
    const user = USUARIOS_ALUMNO.find(
      (u) => u.boleta === boleta.trim() && u.password === password
    );

    if (user) {
      login({ ...user, rol: 'alumno' });
      navigate('/alumno/materias');
    } else {
      setError('Boleta o contraseña incorrecta');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-canvas-dark px-lg">
      <div className="w-full max-w-[24rem] bg-surface-night border border-hairline-violet rounded-xl p-xxl">
        {/* Header */}
        <p className="font-display text-on-dark-muted text-xs uppercase tracking-widest mb-md text-center">
          TutorIA
        </p>
        <h1 className="font-display text-ink-deep text-2xl text-center mb-xl">
          Acceso Alumno
        </h1>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg" noValidate>
          <div className="flex flex-col gap-sm">
            <label
              htmlFor="boleta"
              className="font-ui text-on-dark-muted text-sm"
            >
              Número de boleta
            </label>
            <input
              id="boleta"
              type="text"
              inputMode="numeric"
              autoComplete="username"
              required
              value={boleta}
              onChange={(e) => setBoleta(e.target.value)}
              placeholder="2021630001"
              className="bg-surface-canvas-dark border border-hairline-cool rounded-md px-lg py-md text-ink-deep font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-sm">
            <label
              htmlFor="password-alumno"
              className="font-ui text-on-dark-muted text-sm"
            >
              Contraseña
            </label>
            <input
              id="password-alumno"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-surface-canvas-dark border border-hairline-cool rounded-md px-lg py-md text-ink-deep font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Arithmetic CAPTCHA */}
          <div className="flex flex-col gap-sm">
            <label
              htmlFor="captcha"
              className="font-ui text-on-dark-muted text-sm"
            >
              Verificación: ¿Cuánto es{' '}
              <span className="text-primary font-bold">
                {a} + {b}
              </span>
              ?
            </label>
            <input
              id="captcha"
              type="text"
              inputMode="numeric"
              required
              value={captchaRespuesta}
              onChange={(e) => setCaptchaRespuesta(e.target.value)}
              placeholder="Tu respuesta"
              className="bg-surface-canvas-dark border border-hairline-cool rounded-md px-lg py-md text-ink-deep font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Inline error message */}
          {error && (
            <p role="alert" className="font-ui text-riesgo-alto text-sm text-center">
              {error}
            </p>
          )}

          <BotonPrimario
            variant="inverted"
            type="submit"
            className="w-full py-lg mt-sm"
          >
            Entrar
          </BotonPrimario>
        </form>

        {/* Demo hint */}
        <p className="font-ui text-on-dark-muted text-xs text-center mt-xl">
          Demo: boleta 2021630001 / demo1234
        </p>
      </div>

      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="font-ui text-on-dark-muted text-sm mt-xl hover:text-primary transition-colors"
      >
        ← Volver al inicio
      </button>
    </div>
  );
}
