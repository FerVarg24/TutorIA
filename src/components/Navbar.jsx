import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

/**
 * Top navigation bar shared across all authenticated pages.
 * Props:
 *   title — page subtitle shown next to the brand name
 */
export default function Navbar({ title = '' }) {
  const { session, logout } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-surface-night border-b border-hairline-violet px-xl py-md flex items-center justify-between">
      {/* Left — brand + page title */}
      <div className="flex items-center gap-md">
        <span className="font-display text-xl font-bold text-accent-lime">
          TutorIA
        </span>
        {title && (
          <>
            <span className="text-hairline-violet select-none">/</span>
            <span className="font-ui text-on-dark-muted text-sm">{title}</span>
          </>
        )}
      </div>

      {/* Right — user name + logout */}
      <div className="flex items-center gap-md">
        {session?.nombre && (
          <span className="font-ui text-on-dark-muted text-sm hidden sm:block">
            {session.nombre}
          </span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="font-ui font-bold text-sm text-on-dark-muted hover:text-on-primary border border-hairline-violet rounded-md px-md py-xs transition-all hover:border-accent-violet"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
