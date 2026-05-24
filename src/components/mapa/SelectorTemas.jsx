import { NIVEL_DOMINIO } from '../../utils/dominioTema.js';
import BotonPrimario from '../BotonPrimario.jsx';

/**
 * @param {{
 *   temas: Array<{ tema: string, promedio: number, nivel: string }>,
 *   temaSeleccionado: string | null,
 *   onSeleccionar: (tema: string) => void,
 *   onConfirmar: () => void,
 *   cargando: boolean,
 *   mapaGenerado: boolean,
 * }} props
 */
export default function SelectorTemas({
  temas,
  temaSeleccionado,
  onSeleccionar,
  onConfirmar,
  cargando,
  mapaGenerado,
}) {
  return (
    <div className="bg-surface-night border border-hairline-violet rounded-xl p-lg flex flex-col gap-md">
      <div className="flex items-center justify-between gap-md flex-wrap">
        <p className="font-ui text-sm text-on-dark-muted">
          Elige un tema para estudiar
        </p>
        <div className="flex items-center gap-md text-xs font-ui text-on-dark-muted">
          <span className="flex items-center gap-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-riesgo-bajo" />
            Domina
          </span>
          <span className="flex items-center gap-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-riesgo-medio" />
            Parcial
          </span>
          <span className="flex items-center gap-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-riesgo-alto" />
            Bajo
          </span>
        </div>
      </div>

      <div className="flex gap-sm overflow-x-auto pb-xs">
        {temas.map(({ tema, promedio, nivel }) => {
          const config = NIVEL_DOMINIO[nivel] ?? NIVEL_DOMINIO.bajo;
          const selected = temaSeleccionado === tema;

          return (
            <button
              key={tema}
              type="button"
              onClick={() => onSeleccionar(tema)}
              className={`shrink-0 px-lg py-sm rounded-full border text-sm font-ui transition-colors cursor-pointer ${
                selected
                  ? `${config.bgClass} ring-2 ring-accent-violet/50 font-semibold`
                  : `${config.bgClass} hover:opacity-90`
              }`}
            >
              {tema}
              {promedio > 0 && (
                <span className="ml-xs opacity-70">({promedio})</span>
              )}
            </button>
          );
        })}
      </div>

      {!mapaGenerado && (
        <BotonPrimario
          variant="primary"
          className="self-start"
          disabled={!temaSeleccionado || cargando}
          onClick={onConfirmar}
        >
          {cargando ? 'Generando mapa...' : 'Generar mapa'}
        </BotonPrimario>
      )}
    </div>
  );
}
