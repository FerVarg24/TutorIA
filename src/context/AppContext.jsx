import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [mascota, setMascotaState] = useState({
    modo: 'flotando',
    mensaje: '',
  });

  const setMascota = useCallback((next) => {
    setMascotaState((prev) => ({ ...prev, ...next }));
  }, []);

  const login = useCallback((user) => {
    setSession(user);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setMascotaState({ modo: 'flotando', mensaje: '' });
  }, []);

  const value = useMemo(
    () => ({
      session,
      mascota,
      setMascota,
      login,
      logout,
    }),
    [session, mascota, setMascota, login, logout],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
