import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { Bot, Mic, MicOff } from 'lucide-react';
import GlassPanel from './ui/GlassPanel.jsx';
import TypewriterText from './TypewriterText.jsx';
import StreamingTypewriter from './StreamingTypewriter.jsx';
import { cn } from '@/lib/utils';

const STATUS_COPY = {
  connected: 'TutorIA en linea',
  connecting: 'Conectando...',
  disconnected: 'Sin conexion',
  disconnecting: 'Desconectando...',
  error: 'Error de conexion',
};

function buildContextString({ modo, datosAlumno, datosFormulario }) {
  if (modo === 'profesor') {
    return [
      `Modo: profesor`,
      `Nombre del alumno: ${datosAlumno?.nombre ?? 'Juan Pablo Morales'}`,
      `Asistencia: ${datosAlumno?.asistencia ?? 'No disponible'}`,
      `Tareas entregadas: ${datosAlumno?.tareas_entregadas ?? 'No disponible'}`,
      `Calificacion actual: ${datosAlumno?.calificacion_actual ?? 'No disponible'}`,
      `Calificacion anterior: ${datosAlumno?.calificacion_parcial_anterior ?? 'No disponible'}`,
      `Declive: ${datosAlumno?.declive ?? 'No disponible'} puntos`,
      `Nivel de riesgo: ${datosAlumno?.nivel_riesgo ?? 'No determinado'}`,
    ].join('\n');
  }

  return [
    `Modo: alumno`,
    `Nombre del alumno: ${datosAlumno?.nombre ?? 'Juan Pablo Morales'}`,
    `Problema detectado: ${datosFormulario?.problema ?? 'No especificado'}`,
    `Recomendaciones: ${datosFormulario?.recomendaciones ?? 'No especificado'}`,
    `Recursos: ${datosFormulario?.recursos ?? 'No especificado'}`,
  ].join('\n');
}

function buildDynamicVariables({ modo, datosAlumno, datosFormulario }) {
  if (modo === 'profesor') {
    const base = {
      modo: 'profesor',
      nombre_alumno: datosAlumno?.nombre ?? 'Juan Pablo Morales',
      asistencia: datosAlumno?.asistencia ?? '',
      tareas_entregadas: datosAlumno?.tareas_entregadas ?? '',
      calificacion_actual: String(datosAlumno?.calificacion_actual ?? ''),
      calificacion_anterior: String(datosAlumno?.calificacion_parcial_anterior ?? ''),
      declive: datosAlumno?.declive != null ? String(Math.abs(datosAlumno.declive)) : '',
      nivel_riesgo: datosAlumno?.nivel_riesgo ?? '',
    };
    return Object.fromEntries(
      Object.entries(base).flatMap(([key, value]) => [
        [key, value],
        [`_${key}_`, value],
      ]),
    );
  }

  const base = {
    modo: 'alumno',
    nombre_alumno: datosAlumno?.nombre ?? 'Juan Pablo Morales',
    problema_detectado: datosFormulario?.problema ?? '',
    recomendaciones: datosFormulario?.recomendaciones ?? '',
    recursos: datosFormulario?.recursos ?? '',
  };
  return Object.fromEntries(
    Object.entries(base).flatMap(([key, value]) => [
      [key, value],
      [`_${key}_`, value],
    ]),
  );
}

function TutorIAFallback({ title, variant, fallbackText, onComplete, className }) {
  const fallbackCalledRef = useRef(false);

  useEffect(() => {
    if (fallbackCalledRef.current) return;
    fallbackCalledRef.current = true;
    onComplete?.();
  }, [onComplete]);

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
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden="true" />
          Sin conexion
        </span>
      </div>

      <div className="scrollbar-hidden flex-1 min-h-0 overflow-y-auto rounded-xl border border-accent-violet/20 bg-gradient-to-br from-accent-violet-deep/20 to-accent-violet/10 p-xl">
        <TypewriterText
          text={fallbackText}
          speed={22}
          onComplete={onComplete}
          className="font-ui text-sm leading-relaxed whitespace-pre-line text-ink-deep"
        />
      </div>

      <div className="rounded-xl border border-accent-violet/10 bg-white/60 p-md text-xs text-on-dark-muted">
        Configura `VITE_ELEVENLABS_AGENT_ID` en tu `.env` para activar el agente.
      </div>
    </GlassPanel>
  );
}

function TutorIAContent({
  modo,
  datosAlumno,
  datosFormulario,
  title,
  variant,
  onComplete,
  className,
  kickoffMessage,
  onResetSession,
  connectionError,
  onConnectionError,
}) {
  const [mensajes, setMensajes] = useState([]);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const scrollRef = useRef(null);
  const messageIdRef = useRef(0);
  const streamingBufferRef = useRef('');
  const streamingActiveRef = useRef(false);
  const kickoffSentRef = useRef(false);
  const completedRef = useRef(false);
  const reinjectContextRef = useRef(null);
  const reinjectTimeoutRef = useRef(null);
  const kickoffTimerRef = useRef(null);
  const endSessionRef = useRef(null);

  const dynamicVariables = useMemo(
    () => buildDynamicVariables({ modo, datosAlumno, datosFormulario }),
    [modo, datosAlumno, datosFormulario],
  );

  const contextString = useMemo(
    () => buildContextString({ modo, datosAlumno, datosFormulario }),
    [modo, datosAlumno, datosFormulario],
  );

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  const pushMessage = useCallback((texto, origen, meta = {}) => {
    setMensajes((prev) => [
      ...prev,
      { id: `m-${messageIdRef.current++}`, texto, origen, ...meta },
    ]);
  }, []);

  const handleAgentPart = useCallback(
    ({ text, type }) => {
      if (!text && type !== 'stop') return;

      if (type === 'start') {
        streamingBufferRef.current = '';
        streamingActiveRef.current = true;
        setStreamingMessage({
          id: `s-${messageIdRef.current++}`,
          texto: '',
          origen: 'ai',
          streaming: true,
        });
        return;
      }

      if (type === 'delta') {
        if (!streamingActiveRef.current) {
          streamingActiveRef.current = true;
          setStreamingMessage({
            id: `s-${messageIdRef.current++}`,
            texto: '',
            origen: 'ai',
            streaming: true,
          });
        }
        streamingBufferRef.current += text;
        setStreamingMessage((prev) =>
          prev
            ? { ...prev, texto: streamingBufferRef.current }
            : {
                id: `s-${messageIdRef.current++}`,
                texto: streamingBufferRef.current,
                origen: 'ai',
                streaming: true,
              },
        );
        return;
      }

      if (type === 'stop') {
        const finalText = streamingBufferRef.current.trim();
        if (finalText) {
          pushMessage(finalText, 'ai', { fromStream: true });
        }
        streamingBufferRef.current = '';
        streamingActiveRef.current = false;
        setStreamingMessage(null);
        reinjectContextRef.current?.();
        handleComplete();
      }
    },
    [handleComplete, pushMessage],
  );

  const {
    startSession,
    endSession,
    sendUserMessage,
    sendContextualUpdate,
    setVolume,
    getInputVolume,
    status,
    isSpeaking,
    isListening,
    isMuted,
    setMuted,
    message: statusMessage,
  } = useConversation({
    onMessage: ({ message, source }) => {
      if (source === 'ai' && streamingActiveRef.current) return;
      if (!message) return;
      if (source === 'user') {
        pushMessage(message, 'user');
        if (reinjectTimeoutRef.current) {
          clearTimeout(reinjectTimeoutRef.current);
        }
        reinjectTimeoutRef.current = setTimeout(() => {
          reinjectTimeoutRef.current = null;
          reinjectContextRef.current?.();
        }, 50);
        return;
      }
      pushMessage(message, 'ai', { revealTypewriter: true });
      handleComplete();
    },
    onAgentChatResponsePart: handleAgentPart,
    onConnect: () => {
      onConnectionError?.(null);
      setVolume?.({ volume: 1 });
    },
    onDisconnect: () => {
      pushMessage('Conversacion terminada.', 'system');
    },
    onError: (error) => {
      const message = typeof error === 'string'
        ? error
        : error?.message ?? 'No se pudo conectar con TutorIA.';
      if (message.toLowerCase().includes('microphone') || message.toLowerCase().includes('notallowed')) {
        pushMessage('Permiso de microfono denegado. Revisa la configuracion de tu navegador.', 'system');
      }
      onConnectionError?.(message);
    },
  });

  endSessionRef.current = endSession;

  const reinjectContext = useCallback(() => {
    if (!contextString) return;
    try {
      sendContextualUpdate?.(
        '[CONTEXTO]\n' + contextString + '\n[FIN CONTEXTO]\n\nUsa estos datos para tu siguiente respuesta sin mencionar que recibiste una actualizacion.',
      );
    } catch {
      // ignore errors from sendContextualUpdate
    }
  }, [contextString, sendContextualUpdate]);

  reinjectContextRef.current = reinjectContext;

  const connected = status === 'connected';
  const connecting = status === 'connecting';

  const toggleMute = useCallback(() => {
    setMuted(!isMuted);
  }, [isMuted, setMuted]);

  const startConversation = useCallback(() => {
    if (status !== 'disconnected' && status !== 'error') return;
    onConnectionError?.(null);
    completedRef.current = false;
    kickoffSentRef.current = false;
    streamingBufferRef.current = '';
    streamingActiveRef.current = false;
    setStreamingMessage(null);
    setMensajes([]);
    setMicLevel(0);
    // Iniciar en el mismo click del usuario (sin setTimeout) para que
    // AudioContext y getUserMedia conserven el gesto del navegador.
    startSession({
      dynamicVariables,
      connectionType: 'websocket',
    });
  }, [dynamicVariables, onConnectionError, startSession, status]);

  const stopConversation = useCallback(() => {
    if (kickoffTimerRef.current) {
      clearTimeout(kickoffTimerRef.current);
      kickoffTimerRef.current = null;
    }
    onConnectionError?.(null);
    setMicLevel(0);
    endSession();
    setTimeout(() => onResetSession?.(), 300);
  }, [endSession, onConnectionError, onResetSession]);

  const retryConversation = useCallback(() => {
    onConnectionError?.(null);
    onResetSession?.();
  }, [onConnectionError, onResetSession]);

  const initialKickoff = useMemo(() => {
    if (kickoffMessage) return kickoffMessage;
    return modo === 'profesor'
      ? 'Inicia el analisis para el profesor con los datos recibidos.'
      : 'Inicia el mensaje de apoyo para el alumno con los datos recibidos.';
  }, [kickoffMessage, modo]);

  useEffect(() => {
    if (!connected || kickoffSentRef.current === true) return;
    if (!initialKickoff) return;

    kickoffTimerRef.current = setTimeout(() => {
      kickoffTimerRef.current = null;
      try {
        sendContextualUpdate?.(
          `[CONTEXTO]\n${contextString}\n[FIN CONTEXTO]\n\nUsa estos datos en tu respuesta sin mencionar que recibiste una actualizacion.`,
        );
      } catch {
        // ignore contextual update errors during kickoff
      }
      sendUserMessage(initialKickoff);
      kickoffSentRef.current = true;
    }, 400);

    return () => {
      if (kickoffTimerRef.current) {
        clearTimeout(kickoffTimerRef.current);
        kickoffTimerRef.current = null;
      }
    };
  }, [connected, contextString, initialKickoff, sendContextualUpdate, sendUserMessage]);

  useEffect(() => {
    if (!connected || isMuted) {
      setMicLevel(0);
      return;
    }
    const interval = setInterval(() => {
      setMicLevel(getInputVolume?.() ?? 0);
    }, 120);
    return () => clearInterval(interval);
  }, [connected, getInputVolume, isMuted]);

  useEffect(() => {
    const handlePageHide = () => {
      endSessionRef.current?.();
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      if (kickoffTimerRef.current) {
        clearTimeout(kickoffTimerRef.current);
        kickoffTimerRef.current = null;
      }
      if (reinjectTimeoutRef.current) {
        clearTimeout(reinjectTimeoutRef.current);
        reinjectTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [mensajes, streamingMessage]);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  function renderAiMessageContent(msg) {
    if (msg.streaming) {
      return (
        <StreamingTypewriter
          text={msg.texto}
          speed={18}
          className="whitespace-pre-wrap"
          onProgress={scrollToBottom}
        />
      );
    }

    if (msg.fromStream) {
      return <span className="whitespace-pre-wrap">{msg.texto}</span>;
    }

    if (msg.revealTypewriter) {
      return (
        <TypewriterText
          text={msg.texto}
          speed={22}
          className="whitespace-pre-wrap"
          cursorClassName="bg-on-primary/70"
          onProgress={scrollToBottom}
        />
      );
    }

    return <span className="whitespace-pre-wrap">{msg.texto}</span>;
  }

  const allMessages = streamingMessage
    ? [...mensajes, streamingMessage]
    : mensajes;

  const showRetry = Boolean(connectionError || (status === 'error' && statusMessage));

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
        <span className="ml-auto flex items-center gap-sm font-ui text-xs text-on-dark-muted">
          {connected && (
            <>
              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center gap-xs rounded-md px-sm py-xs transition-colors hover:bg-white/10"
                aria-label={isMuted ? 'Activar microfono' : 'Silenciar microfono'}
              >
                {isMuted ? (
                  <MicOff className="h-3.5 w-3.5 text-riesgo-alto" />
                ) : (
                  <Mic className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{isMuted ? 'Silenciado' : 'Microfono'}</span>
              </button>
              {!isMuted && (
                <span
                  className="hidden sm:flex h-2 w-10 overflow-hidden rounded-full bg-white/15"
                  aria-hidden="true"
                  title="Nivel del microfono"
                >
                  <span
                    className="h-full rounded-full bg-exito-text transition-all duration-100"
                    style={{ width: `${Math.min(100, Math.round(micLevel * 100))}%` }}
                  />
                </span>
              )}
            </>
          )}
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              connected && isSpeaking && 'bg-riesgo-alto animate-pulse',
              connected && isListening && !isMuted && 'bg-exito-text',
              connected && isMuted && 'bg-riesgo-medio',
              connecting && 'bg-riesgo-medio animate-pulse',
              status === 'error' && 'bg-riesgo-alto',
              status === 'disconnected' && 'bg-white/20',
            )}
            aria-hidden="true"
          />
          {connected && isSpeaking ? 'TutorIA hablando' :
           connected && isListening && !isMuted ? 'Escuchando...' :
           connected && isMuted ? 'Microfono silenciado' :
           STATUS_COPY[status] ?? 'Sin conexion'}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hidden flex-1 min-h-0 overflow-y-auto rounded-xl border border-accent-violet/20 bg-gradient-to-br from-accent-violet-deep/20 to-accent-violet/10 p-xl"
      >
        {allMessages.length === 0 && (
          <p className="text-center font-ui text-sm text-on-dark-muted mt-xl">
            {connecting ? 'Preparando el analisis...' : 'Inicia la conversacion con TutorIA.'}
          </p>
        )}

        <div className="flex flex-col gap-md">
          {allMessages.map((msg) => {
            if (msg.origen === 'system') {
              return (
                <div key={msg.id} className="text-center text-xs text-on-dark-muted">
                  {msg.texto}
                </div>
              );
            }

            const isUser = msg.origen === 'user';
            return (
              <div
                key={msg.id}
                className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-lg py-md font-ui text-sm leading-relaxed',
                    isUser
                      ? 'rounded-tr-none bg-accent-lime text-ink-deep font-medium'
                      : 'rounded-tl-none bg-accent-violet-deep text-on-primary',
                  )}
                >
                  {!isUser && (
                    <span className="block text-[10px] uppercase tracking-wider text-on-primary/60 mb-xs">
                      TutorIA
                    </span>
                  )}
                  {isUser ? msg.texto : renderAiMessageContent(msg)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        {connected && !isMuted && micLevel < 0.02 && !isSpeaking && (
          <p className="text-xs text-on-dark-muted font-ui">
            Habla cerca del microfono. Si la barra verde no se mueve, revisa permisos del navegador.
          </p>
        )}
        {showRetry && (
          <p className="text-xs text-riesgo-alto font-ui">
            {connectionError ?? statusMessage}
          </p>
        )}
        {!connected ? (
          showRetry ? (
            <button
              type="button"
              onClick={retryConversation}
              className="w-full rounded-xl bg-accent-lime text-ink-deep font-semibold py-sm transition-all hover:brightness-105"
            >
              Reintentar
            </button>
          ) : (
            <button
              type="button"
              onClick={startConversation}
              disabled={connecting}
              className="w-full rounded-xl bg-accent-lime text-ink-deep font-semibold py-sm transition-all hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {connecting ? 'Conectando...' : 'Iniciar TutorIA'}
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={stopConversation}
            className="w-full rounded-xl bg-riesgo-alto text-on-primary font-semibold py-sm transition-all hover:brightness-110"
          >
            Terminar conversacion
          </button>
        )}
      </div>
    </GlassPanel>
  );
}

export default function TutorIA({
  modo,
  datosAlumno,
  datosFormulario,
  title = 'Mensaje de TutorIA',
  variant = 'rojo',
  className,
  fallbackText = 'Configura la integracion de TutorIA para ver el mensaje.',
  onComplete,
  kickoffMessage,
}) {
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
  const [sessionKey, setSessionKey] = useState(0);
  const [connectionError, setConnectionError] = useState(null);

  if (!agentId) {
    return (
      <TutorIAFallback
        title={title}
        variant={variant}
        fallbackText={fallbackText}
        onComplete={onComplete}
        className={className}
      />
    );
  }

  return (
    <ConversationProvider key={sessionKey} agentId={agentId}>
      <TutorIAContent
        modo={modo}
        datosAlumno={datosAlumno}
        datosFormulario={datosFormulario}
        title={title}
        variant={variant}
        className={className}
        onComplete={onComplete}
        kickoffMessage={kickoffMessage}
        connectionError={connectionError}
        onConnectionError={setConnectionError}
        onResetSession={() => setSessionKey((k) => k + 1)}
      />
    </ConversationProvider>
  );
}
