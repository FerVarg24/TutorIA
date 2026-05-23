import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonPrimario from '../components/BotonPrimario.jsx';
import { useApp } from '../context/AppContext.jsx';
import { USUARIOS_ALUMNO } from '../services/mockData.js';

function SimpleCaptcha({ value, onChange, onValidate }) {
  const [a, b] = useMemo(() => [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1], []);
  const expected = a + b;

  useEffect(() => {
    onValidate(Number(value) === expected);
  }, [value, expected, onValidate]);

  return (
    <label className="mb-xl block">
      <span className="mb-sm block text-sm text-on-dark-muted">
        CAPTCHA: ¿Cuánto es {a} + {b}?
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-hairline-cool bg-surface-canvas-light px-md py-sm text-ink-deep"
        required
      />
    </label>
  );
}

export default function LoginAlumno() {
  const navigate = useNavigate();
  const { login, setMascota } = useApp();
  const [boleta, setBoleta] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMascota({ modo: 'bounce', mensaje: '' });
  }, [setMascota]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValid) {
      setError('CAPTCHA incorrecto');
      return;
    }

    const user = USUARIOS_ALUMNO.find(
      (u) => u.boleta === boleta && u.password === password,
    );

    if (!user) {
      setError('Credenciales incorrectas');
      return;
    }

    login({ ...user, rol: 'alumno' });
    navigate('/alumno/materias');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-canvas-dark px-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xxl border border-hairline-violet bg-ink-deep p-xxl"
      >
        <h1 className="mb-xl font-display text-2xl font-bold text-on-primary">Login Alumno</h1>

        {error && <p className="mb-lg text-sm text-riesgo-alto">{error}</p>}

        <label className="mb-lg block">
          <span className="mb-sm block text-sm text-on-dark-muted">Número de boleta</span>
          <input
            type="text"
            value={boleta}
            onChange={(e) => setBoleta(e.target.value)}
            className="w-full rounded-sm border border-hairline-cool bg-surface-canvas-light px-md py-sm text-ink-deep"
            required
          />
        </label>

        <label className="mb-lg block">
          <span className="mb-sm block text-sm text-on-dark-muted">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-hairline-cool bg-surface-canvas-light px-md py-sm text-ink-deep"
            required
          />
        </label>

        <SimpleCaptcha value={captcha} onChange={setCaptcha} onValidate={setCaptchaValid} />

        <BotonPrimario type="submit" className="w-full" disabled={!captchaValid}>
          Ingresar
        </BotonPrimario>
      </form>
    </main>
  );
}
