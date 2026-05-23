import { useState } from 'react';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import Reporte from './Reporte.jsx';

export default function Seguimiento({ alumno, onClose }) {
  const [step, setStep] = useState('confirm');
  const [showReporte, setShowReporte] = useState(false);

  const handleConfirm = () => {
    setStep('sent');
  };

  const handleVerRespuestas = () => {
    setShowReporte(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-primary/80 p-xl">
        <div className="w-full max-w-lg rounded-xxl border border-hairline-violet bg-ink-deep p-xxl">
          {step === 'confirm' && (
            <>
              <h2 className="mb-lg font-display text-xl font-medium text-on-primary">
                Confirmar seguimiento
              </h2>
              <p className="mb-xxl text-on-dark-muted">
                ¿Deseas enviarle un cuestionario diagnóstico a {alumno.nombre}?
              </p>
              <div className="flex gap-lg">
                <BotonPrimario onClick={handleConfirm}>Sí, enviar</BotonPrimario>
                <BotonPrimario variant="ghost" onClick={onClose}>
                  No por ahora
                </BotonPrimario>
              </div>
            </>
          )}

          {step === 'sent' && (
            <>
              <p className="mb-xxl text-on-primary">
                Cuestionario enviado a {alumno.nombre} — recibirá el link por Teams
              </p>
              <div className="flex gap-lg">
                <BotonPrimario onClick={handleVerRespuestas}>
                  Ver respuestas del alumno
                </BotonPrimario>
                <BotonPrimario variant="ghost" onClick={onClose}>
                  Cerrar
                </BotonPrimario>
              </div>
            </>
          )}
        </div>
      </div>

      {showReporte && <Reporte alumno={alumno} onClose={() => setShowReporte(false)} />}
    </>
  );
}
