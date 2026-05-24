import { useState, useEffect, useRef } from 'react';
import BotonPrimario from './BotonPrimario.jsx';

/**
 * Multi-turn chat interface for the student agent flow.
 * Props:
 *   historial — [{ id, role: 'user'|'assistant', content }]
 *   onSend    — (mensaje: string) => void  called when user submits a message
 *   loading   — disables input while the agent is responding
 */
export default function ChatAgente({ historial = [], onSend, loading = false }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    onSend?.(trimmed);
    setInput('');
  }

  return (
    <div className="flex flex-col h-full bg-surface-night border border-hairline-violet rounded-xl overflow-hidden">
      {/* ── Message list ── */}
      <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-md">
        {historial.length === 0 && (
          <p className="text-on-dark-muted font-ui text-sm text-center mt-xl">
            El agente está listo para ayudarte.
          </p>
        )}

        {historial.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[20rem] lg:max-w-[24rem] xl:max-w-[28rem]
                  px-lg py-md rounded-xl font-ui text-sm leading-relaxed
                  ${isUser
                    ? 'bg-accent-violet text-on-primary rounded-br-xs'
                    : 'bg-accent-violet-deep text-on-primary rounded-bl-xs border border-hairline-violet'
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-accent-violet-deep border border-hairline-violet rounded-xl rounded-bl-xs px-lg py-md">
              <span className="flex gap-xs items-center">
                <span className="w-2 h-2 bg-on-dark-muted rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-on-dark-muted rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-on-dark-muted rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-sm p-md border-t border-hairline-violet bg-ink-deep"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Escribe tu mensaje..."
          className="
            flex-1 bg-surface-night border border-hairline-violet rounded-md
            px-md py-sm font-ui text-sm text-on-primary placeholder:text-on-dark-muted
            focus:outline-none focus:border-accent-violet transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label="Mensaje al agente"
        />
        <BotonPrimario
          type="submit"
          variant="primary"
          disabled={loading || !input.trim()}
          aria-label="Enviar mensaje"
        >
          Enviar
        </BotonPrimario>
      </form>
    </div>
  );
}
