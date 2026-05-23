import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonPrimario from '../components/BotonPrimario.jsx';
import { useApp } from '../context/AppContext.jsx';
import { USUARIOS_PROFESOR } from '../services/mockData.js';

export default function LoginProfesor() {
  const navigate = useNavigate();
  const { login, setMascota } = useApp();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMascota({ modo: 'bounce', mensaje: '' });
  }, [setMascota]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = USUARIOS_PROFESOR.find(
      (u) => u.correo === correo && u.password === password,
    );

    if (!user) {
      setError('Credenciales incorrectas');
      return;
    }

    login({ ...user, rol: 'profesor' });
    navigate('/profesor/materias');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-canvas-dark px-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xxl border border-hairline-violet bg-ink-deep p-xxl"
      >
        <h1 className="mb-xl font-display text-2xl font-bold text-on-primary">Login Profesor</h1>

        {error && <p className="mb-lg text-sm text-riesgo-alto">{error}</p>}

        <label className="mb-lg block">
          <span className="mb-sm block text-sm text-on-dark-muted">Correo institucional</span>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full rounded-sm border border-hairline-cool bg-surface-canvas-light px-md py-sm text-ink-deep"
            required
          />
        </label>

        <label className="mb-xl block">
          <span className="mb-sm block text-sm text-on-dark-muted">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-hairline-cool bg-surface-canvas-light px-md py-sm text-ink-deep"
            required
          />
        </label>

        <BotonPrimario type="submit" className="w-full">
          Ingresar
        </BotonPrimario>
      </form>
    </main>
  );
}
