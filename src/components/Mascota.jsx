import { useApp } from '../context/AppContext.jsx';
import mascotaImg from '../assets/mascota.svg';

const MODO_CLASSES = {
  flotando: 'mascota--flotando',
  hablando: 'mascota--hablando',
  bounce: 'mascota--bounce',
  'entrada-derecha': 'mascota--entrada-derecha',
};

export default function Mascota() {
  const { mascota } = useApp();
  const { modo, mensaje } = mascota;
  const modoClass = MODO_CLASSES[modo] ?? MODO_CLASSES.flotando;

  return (
    <div className={`mascota ${modoClass}`} aria-hidden={!mensaje}>
      <div className="mascota__avatar">
        <img src={mascotaImg} alt="Mascota TutorIA" className="mascota__image" />
      </div>
      {mensaje && (
        <div className="mascota__bubble">
          <p className="mascota__mensaje">{mensaje}</p>
        </div>
      )}
    </div>
  );
}
