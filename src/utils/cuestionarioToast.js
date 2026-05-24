import { sileo } from 'sileo';

export const CUESTIONARIO_TOAST_ID = 'cuestionario-diagnostico';
export const CUESTIONARIO_ENVIO_TOAST_ID = 'cuestionario-envio-profesor';

export const CUESTIONARIO_FORM_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=2fRL-ZeAlEet9qVGbKKFY3P5AuTpSp1Mla03QS3vIkVUNEUxVUxRODY3NkNQSDFSU05NUzk5WFBTWS4u';

const TOAST_AUTOPILOT = { expand: 400, collapse: 60000 };

export function showCuestionarioToast({ onRespondido }) {
  const toastId = sileo.action({
    id: CUESTIONARIO_TOAST_ID,
    title: 'Cuestionario Diagnóstico',
    description: 'Tu profesor quiere conocer mejor tu situación para darte apoyo personalizado. Solo toma 3 minutos.',
    duration: null,
    position: 'bottom-right',
    autopilot: TOAST_AUTOPILOT,
    button: {
      title: 'Responder cuestionario',
      onClick: () => {
        window.open(CUESTIONARIO_FORM_URL, '_blank');
        sileo.dismiss(toastId);
        setTimeout(() => {
          sileo.success({
            title: '¡Cuestionario enviado!',
            description: 'El Dr. Ramírez ya recibió tus respuestas. Recibirás tu guía personalizada pronto.',
            position: 'bottom-right',
            autopilot: TOAST_AUTOPILOT,
          });
          onRespondido?.();
        }, 1500);
      },
    },
  });

  return toastId;
}

export function dismissCuestionarioToast(toastId) {
  if (toastId) sileo.dismiss(toastId);
}

export function showEnviarCuestionarioToast({ alumno, onEnviado }) {
  const nombre = alumno?.nombre ?? 'el alumno';

  const toastId = sileo.action({
    id: CUESTIONARIO_ENVIO_TOAST_ID,
    title: 'Cuestionario diagnóstico',
    description: `¿Deseas enviarle un cuestionario diagnóstico a ${nombre}? Lo recibirá como notificación en la plataforma.`,
    duration: null,
    position: 'bottom-right',
    autopilot: TOAST_AUTOPILOT,
    button: {
      title: 'Enviar cuestionario',
      onClick: () => {
        sileo.dismiss(toastId);
        sileo.success({
          title: 'Cuestionario enviado',
          description: `Podrás consultar las respuestas cuando ${nombre} conteste.`,
          position: 'bottom-right',
          autopilot: TOAST_AUTOPILOT,
        });
        onEnviado?.();
      },
    },
  });

  return toastId;
}

export function dismissEnviarCuestionarioToast(toastId) {
  if (toastId) sileo.dismiss(toastId);
}
