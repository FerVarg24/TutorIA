import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

/**
 * Top navigation bar shared across all authenticated pages.
 * Props:
 *   title — page subtitle shown next to the brand name
 *   breadcrumbs — array of {label, href} for navigation path
 */
export default function Navbar({ title = '', breadcrumbs = [] }) {
  const { session, logout } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-surface-night border-b border-hairline-violet px-xl py-md flex items-center justify-between">
      {/* Left — brand + breadcrumbs or title */}
      <div className="flex items-center gap-md flex-wrap">
        <span className="font-display text-xl font-bold text-primary cursor-pointer hover:text-accent-violet transition-colors" onClick={() => navigate('/')} aria-label="Ir a inicio">
          TutorIA
        </span>

        {breadcrumbs.length > 0 ? (
          <div className="flex items-center gap-sm">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-sm">
                <span className="text-hairline-cool select-none">/</span>
                <button
                  type="button"
                  onClick={() => navigate(crumb.href)}
                  className="font-ui text-sm text-on-dark-muted hover:text-primary transition-colors underline underline-offset-2"
                  aria-label={`Ir a ${crumb.label}`}
                >
                  {crumb.label}
                </button>
              </div>
            ))}
          </div>
        ) : title ? (
          <>
            <span className="text-hairline-cool select-none">/</span>
            <span className="font-ui text-on-dark-muted text-sm">{title}</span>
          </>
        ) : null}
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
          className="font-ui font-bold text-sm text-on-dark-muted hover:text-primary border border-hairline-violet rounded-md px-md py-xs transition-all hover:border-accent-violet"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
