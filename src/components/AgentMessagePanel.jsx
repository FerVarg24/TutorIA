import { Bot } from 'lucide-react';
import GlassPanel from './ui/GlassPanel.jsx';
import TypewriterText from './TypewriterText.jsx';
import { cn } from '@/lib/utils';

export default function AgentMessagePanel({
  title = 'Mensaje de TutorIA',
  text,
  speed = 25,
  onComplete,
  loading = false,
  loadingMessage = 'Analizando datos del alumno...',
  variant = 'rojo',
  children,
  className,
}) {
  return (
    <GlassPanel
      variant={variant}
      padding="lg"
      className={cn('flex flex-1 min-h-0 flex-col gap-lg overflow-hidden', className)}
    >
      <div className="flex shrink-0 items-center gap-md">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-violet/15 text-accent-violet-deep">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-ui text-[10px] font-semibold uppercase tracking-wider text-accent-violet-deep">
            TutorIA
          </p>
          <h2 className="font-display text-lg font-semibold text-ink-deep">{title}</h2>
        </div>
        <span className="ml-auto flex items-center gap-xs font-ui text-xs text-on-dark-muted">
          <span className="chat-online-dot h-2 w-2 rounded-full bg-exito-text" aria-hidden="true" />
          En línea
        </span>
      </div>

      {loading ? (
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-lg py-xl">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-violet border-t-accent-lime" />
          <p className="animate-pulse font-ui text-sm text-on-dark-muted">{loadingMessage}</p>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-hairline-violet/60">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-accent-violet/60" />
          </div>
        </div>
      ) : (
        <>
          <div className="scrollbar-hidden relative flex-1 min-h-0 overflow-y-auto rounded-xl border border-accent-violet/20 bg-gradient-to-br from-accent-violet-deep/20 to-accent-violet/10 p-xl">
            {text != null ? (
              <TypewriterText
                text={text}
                speed={speed}
                onComplete={onComplete}
                className="font-ui text-sm leading-relaxed whitespace-pre-line text-ink-deep"
              />
            ) : (
              children
            )}
          </div>
        </>
      )}
    </GlassPanel>
  );
}
