import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

/**
 * Global state provider for the entire application.
 * Manages user session and mascot display state.
 */
export function AppProvider({ children }) {
  // null when no user is logged in
  const [session, setSession] = useState(null);

  // Controls the global mascot component rendered in App.jsx
  const [mascota, setMascotaState] = useState({
    modo: "flotando",
    mensaje: "",
  });

  /**
   * Logs in a user. Expects an object with at minimum { nombre, rol }
   * plus either correo (profesor) or boleta (alumno).
   */
  const login = useCallback((user) => {
    setSession(user);
  }, []);

  /**
   * Clears the session and resets the mascot to default floating state.
   */
  const logout = useCallback(() => {
    setSession(null);
    setMascotaState({ modo: "flotando", mensaje: "" });
  }, []);

  /**
   * Updates the mascot's animation mode and optional speech bubble message.
   * @param {{ modo: string, mensaje?: string }} config
   */
  const setMascota = useCallback(({ modo, mensaje = "" }) => {
    setMascotaState({ modo, mensaje });
  }, []);

  return (
    <AppContext.Provider value={{ session, mascota, login, logout, setMascota }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom hook for consuming the app context.
 * Throws if used outside AppProvider.
 */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp debe usarse dentro de <AppProvider>");
  }
  return ctx;
}
