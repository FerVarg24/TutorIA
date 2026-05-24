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

  useEffect(() => {
    setMascota({ modo: 'bounce', mensaje: '' });
  }, [setMascota]);

  function handleSubmit(e) {
    e.preventDefault();

    const demoUser = USUARIOS_PROFESOR[0];
    login({ ...demoUser, rol: 'profesor' });
    navigate('/profesor/materias');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-canvas-dark px-lg">
      <div className="w-full max-w-[24rem] bg-surface-night border border-hairline-violet rounded-xl p-xxl">
        {/* Header */}
        <p className="font-display text-on-dark-muted text-xs uppercase tracking-widest mb-md text-center">
          TutorIA
        </p>
        <h1 className="font-display text-ink-deep text-2xl text-center mb-xl">
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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@ipn.mx"
              className="bg-surface-canvas-dark border border-hairline-cool rounded-md px-lg py-md text-ink-deep font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-primary transition-colors"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-surface-canvas-dark border border-hairline-cool rounded-md px-lg py-md text-ink-deep font-ui text-sm placeholder:text-on-dark-faint focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <BotonPrimario
            variant="primary"
            type="submit"
            className="w-full py-lg mt-sm shadow-[0_8px_24px_rgba(91,155,213,0.35)]"
          >
            Entrar
          </BotonPrimario>
        </form>

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
