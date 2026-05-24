import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { cn } from '@/lib/utils';

/**
 * Top navigation bar shared across all authenticated pages.
 * Props:
 *   title — page subtitle shown next to the brand name
 *   breadcrumbs — array of {label, href} for navigation path
 *   center — optional centered content (e.g. student identity chip)
 */
export default function Navbar({ title = '', breadcrumbs = [], center = null }) {
  const { session, logout } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav
      className={cn(
        'bg-surface-night border-b border-hairline-violet px-xl py-md',
        center
          ? 'grid grid-cols-[1fr_auto_1fr] items-center gap-md'
          : 'flex items-center justify-between',
      )}
    >
      <div className="flex min-w-0 items-center gap-md flex-wrap">
        <span
          className="font-display text-xl font-bold text-primary cursor-pointer hover:text-accent-violet transition-colors shrink-0"
          onClick={() => navigate('/')}
          aria-label="Ir a inicio"
        >
          TutorIA
        </span>

        {breadcrumbs.length > 0 ? (
          <div className="flex min-w-0 items-center gap-sm">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-sm min-w-0">
                <span className="text-hairline-cool select-none">/</span>
                <button
                  type="button"
                  onClick={() => crumb.href !== '#' ? navigate(crumb.href) : undefined}
                  className={cn(
                    'font-ui text-sm text-on-dark-muted truncate',
                    crumb.href !== '#'
                      ? 'hover:text-primary transition-colors underline underline-offset-2'
                      : 'cursor-default',
                  )}
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
            <span className="font-ui text-on-dark-muted text-sm truncate">{title}</span>
          </>
        ) : null}
      </div>

      {center && (
        <div className="justify-self-center w-full max-w-[min(100%,28rem)] min-w-0">
          {center}
        </div>
      )}

      <div className="flex items-center justify-end gap-md shrink-0">
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
