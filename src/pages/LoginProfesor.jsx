import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import BotonPrimario from '../components/BotonPrimario.jsx';
import { USUARIOS_PROFESOR } from '../services/mockData.js';

export default function LoginProfesor() {
  const { setMascota, login } = useApp();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Trigger mascot bounce on mount
  useEffect(() => {
    setMascota({ modo: 'bounce', mensaje: '' });
  }, [setMascota]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const user = USUARIOS_PROFESOR.find(
      (u) => u.correo === correo.trim() && u.password === password
    );

    if (user) {
      login({ ...user, rol: 'profesor' });
      navigate('/profesor/materias');
    } else {
      setError('Credenciales incorrectas');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-canvas-dark px-lg">
      <div className="w-full max-w-[24rem] bg-surface-night border border-hairline-violet rounded-xl p-xxl">
        {/* Header */}
        <p className="font-display text-on-dark-muted text-xs uppercase tracking-widest mb-md text-center">
          TutorIA
        </p>
        <h1 className="font-display text-on-primary text-2xl text-center mb-xl">
          Acceso Profesor
        </h1>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg" noValidate>
          <div className="flex flex-col gap-sm">
            <label
              htmlFor="correo"
              className="font-ui text-on-dark-muted text-sm"
            >
              Correo institucional
            </label>
            <input
              id="correo"
              type="email"
              autoComplete="username"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@ipn.mx"
              className="bg-ink-deep border border-hairline-violet rounded-md px-lg py-md text-on-primary font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-accent-violet transition-colors"
            />
          </div>

          <div className="flex flex-col gap-sm">
            <label
              htmlFor="password"
              className="font-ui text-on-dark-muted text-sm"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-ink-deep border border-hairline-violet rounded-md px-lg py-md text-on-primary font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-accent-violet transition-colors"
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
        <p className="font-ui text-on-dark-faint text-xs text-center mt-xl">
          Demo: profesor@ipn.mx / demo1234
        </p>
      </div>

      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="font-ui text-on-dark-muted text-sm mt-xl hover:text-on-primary transition-colors"
      >
        ← Volver al inicio
      </button>
    </div>
  );
}
