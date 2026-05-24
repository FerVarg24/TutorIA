import { useApp } from '../context/AppContext.jsx';
import mascotaImg from '../assets/mascota.svg';

/**
 * Global mascot component — rendered once in App.jsx outside <Routes>.
 * Animation mode and speech bubble are driven entirely by AppContext.
 */
export default function Mascota() {
  const { mascota } = useApp();
  const { modo, mensaje } = mascota;

  return (
    <div className={`mascota mascota--${modo}`}>
      <div className="mascota__avatar">
        <img
          className="mascota__image"
          src={mascotaImg}
          alt="Mascota TutorIA"
        />
      </div>

      {mensaje && (
        <div className="mascota__bubble">
          <p className="mascota__mensaje">{mensaje}</p>
        </div>
      )}
    </div>
  );
}
