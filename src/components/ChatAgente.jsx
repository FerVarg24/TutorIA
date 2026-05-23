import { useState } from 'react';
import BotonPrimario from './BotonPrimario.jsx';

export default function ChatAgente({ onSend, historial = [], loading = false }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSend?.(input.trim());
    setInput('');
  };

  return (
    <div className="flex h-full flex-col rounded-xxl border border-hairline-violet bg-ink-deep">
      <div className="flex-1 space-y-md overflow-y-auto p-xl">
        {historial.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[85%] rounded-xl px-lg py-md text-sm ${
              msg.role === 'user'
                ? 'ml-auto bg-accent-violet text-on-primary'
                : 'bg-surface-night text-on-primary'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-on-dark-muted">El agente está escribiendo...</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-sm border-t border-hairline-violet p-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu respuesta..."
          className="flex-1 rounded-sm border border-hairline-cool bg-surface-canvas-light px-md py-sm text-ink-deep"
          disabled={loading}
        />
        <BotonPrimario type="submit" disabled={loading || !input.trim()}>
          Enviar
        </BotonPrimario>
      </form>
    </div>
  );
}
