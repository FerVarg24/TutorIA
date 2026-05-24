import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import BotonPrimario from './BotonPrimario.jsx';
import GlassPanel from './ui/GlassPanel.jsx';
import { cn } from '@/lib/utils';

const messageVariants = {
  hidden: (isUser) => ({
    opacity: 0,
    x: isUser ? 12 : -12,
    scale: 0.97,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

function TutorAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet-deep to-accent-violet text-on-primary shadow-sm"
      aria-hidden="true"
    >
      <Bot className="h-4 w-4" />
    </div>
  );
}

/**
 * Multi-turn chat interface for the student agent flow.
 */
export default function ChatAgente({
  historial = [],
  onSend,
  loading = false,
  variant = 'morado',
}) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

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
    <GlassPanel variant={variant} padding="none" className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-md border-b border-hairline-violet/60 px-lg py-md">
        <TutorAvatar />
        <div>
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-accent-violet-deep">
            TutorIA
          </p>
          <p className="font-display text-sm font-semibold text-ink-deep">Asistente de apoyo</p>
        </div>
        <span className="ml-auto flex items-center gap-xs font-ui text-xs text-on-dark-muted">
          <span className="chat-online-dot h-2 w-2 rounded-full bg-exito-text" aria-hidden="true" />
          En línea
        </span>
      </div>

      <div className="scrollbar-hidden flex flex-1 flex-col gap-md overflow-y-auto p-lg">
        {historial.length === 0 && (
          <p className="mt-xl text-center font-ui text-sm text-on-dark-muted">
            El agente está listo para ayudarte.
          </p>
        )}

        <AnimatePresence initial={false}>
          {historial.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <motion.div
                key={msg.id}
                custom={isUser}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={cn('flex gap-sm', isUser ? 'justify-end' : 'justify-start')}
              >
                {!isUser && <TutorAvatar />}
                <div
                  className={cn(
                    'max-w-[20rem] rounded-xl px-lg py-md font-ui text-sm leading-relaxed lg:max-w-[24rem] xl:max-w-[28rem]',
                    isUser
                      ? 'rounded-br-xs bg-accent-violet text-on-primary shadow-[0_4px_16px_rgba(91,155,213,0.25)]'
                      : 'rounded-bl-xs border border-accent-violet/25 bg-gradient-to-br from-accent-violet-deep to-accent-violet text-on-primary shadow-[0_4px_16px_rgba(74,127,181,0.2)]',
                  )}
                >
                  {msg.content}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-start gap-sm"
          >
            <TutorAvatar />
            <div className="rounded-xl rounded-bl-xs border border-accent-violet/25 bg-gradient-to-br from-accent-violet-deep/90 to-accent-violet/90 px-lg py-md">
              <span className="flex items-center gap-xs">
                <span className="h-2 w-2 animate-bounce rounded-full bg-on-primary/70 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-on-primary/70 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-on-primary/70 [animation-delay:300ms]" />
              </span>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-sm border-t border-hairline-violet/60 bg-white/50 p-md backdrop-blur-sm transition-shadow focus-within:shadow-[0_0_20px_rgba(91,155,213,0.15)] focus-within:ring-2 focus-within:ring-accent-violet/30"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Escribe tu mensaje..."
          className="flex-1 rounded-md border border-hairline-violet bg-white/80 px-md py-sm font-ui text-sm text-ink-deep placeholder:text-on-dark-muted transition-colors focus:border-accent-violet focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Mensaje al agente"
        />
        <BotonPrimario
          type="submit"
          variant="primary"
          disabled={loading || !input.trim()}
          aria-label="Enviar mensaje"
          className="gap-xs"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Enviar
        </BotonPrimario>
      </form>
    </GlassPanel>
  );
}
