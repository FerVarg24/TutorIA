import { useState } from 'react';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import Reporte from './Reporte.jsx';

/**
 * Modal overlay that walks the professor through the follow-up flow.
 * Rendered inside AlumnoDetalle, not on its own route.
 *
 * Props:
 *   alumno  — student object
 *   onClose — callback to close the modal
 */
export default function Seguimiento({ alumno, onClose }) {
  const [paso, setPaso] = useState('confirm'); // 'confirm' | 'sent'
  const [showReporte, setShowReporte] = useState(false);

  return (
    <>
      {/* Overlay + centered card */}
      <div className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-xl">
        <div className="bg-surface-night border border-hairline-violet rounded-xl p-xxl max-w-[32rem] w-full">

          {paso === 'confirm' && (
            <>
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-accent-violet/20 border border-accent-violet/30 flex items-center justify-center mb-xl mx-auto">
                <span className="text-xl" aria-hidden="true">📋</span>
              </div>

              <h2 className="font-display text-xl font-bold text-ink-deep text-center mb-md">
                Enviar cuestionario diagnóstico
              </h2>
              <p className="font-ui text-on-dark-muted text-center mb-xxl leading-relaxed">
                ¿Deseas enviarle un cuestionario diagnóstico a{' '}
                <span className="text-ink-deep font-semibold">{alumno?.nombre}</span>?<br />
                Recibirá una notificación en la plataforma para responderlo.
              </p>

              <div className="flex flex-col gap-md">
                <BotonPrimario
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setPaso('sent')}
                >
                  Sí, enviar cuestionario
                </BotonPrimario>
                <BotonPrimario
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={onClose}
                >
                  No por ahora
                </BotonPrimario>
              </div>
            </>
          )}

          {paso === 'sent' && (
            <>
              {/* Success icon */}
              <div className="w-12 h-12 rounded-full bg-riesgo-bajo/20 border border-riesgo-bajo/30 flex items-center justify-center mb-xl mx-auto">
                <span className="text-xl" aria-hidden="true">✅</span>
              </div>

              <h2 className="font-display text-xl font-bold text-ink-deep text-center mb-md">
                Cuestionario enviado
              </h2>
              <p className="font-ui text-on-dark-muted text-center mb-xxl leading-relaxed">
                <span className="text-ink-deep font-semibold">{alumno?.nombre}</span>{' '}
                recibirá el cuestionario en su panel en breve.
              </p>

              <div className="flex flex-col gap-md">
                <BotonPrimario
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setShowReporte(true)}
                >
                  Ver respuestas del alumno
                </BotonPrimario>
                <BotonPrimario
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={onClose}
                >
                  Cerrar
                </BotonPrimario>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Side panel — rendered on top of the overlay */}
      {showReporte && (
        <Reporte alumno={alumno} onClose={() => setShowReporte(false)} />
      )}
    </>
  );
}
