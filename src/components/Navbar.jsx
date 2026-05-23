import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar({ title = 'TutorIA' }) {
  const { session, logout } = useApp();

  return (
    <header className="flex items-center justify-between border-b border-hairline-violet bg-surface-night px-xl py-lg">
      <Link to="/" className="font-display text-xl font-bold text-on-primary">
        {title}
      </Link>
      {session && (
        <div className="flex items-center gap-lg">
          <span className="text-sm text-on-dark-muted">{session.nombre}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-on-dark-faint px-lg py-sm text-sm font-semibold uppercase tracking-wide text-on-primary"
            aria-label="Cerrar sesión"
          >
            Salir
          </button>
        </div>
      )}
    </header>
  );
}
