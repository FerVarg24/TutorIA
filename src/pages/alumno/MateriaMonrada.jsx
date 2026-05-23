import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatAgente from '../../components/ChatAgente.jsx';
import Navbar from '../../components/Navbar.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { chatAgente, generarGuia } from '../../services/anthropicService.js';
import { getMateriaAlumnoById, MATERIAL_POR_MATERIA } from '../../services/mockData.js';

const INITIAL_MESSAGE = {
  id: 'init',
  role: 'assistant',
  content: 'Notamos algunas variaciones en tu desempeño. ¿Quieres que revisemos juntos cómo estás?',
};

export default function MateriaMonrada() {
  const { id } = useParams();
  const { setMascota } = useApp();
  const materia = getMateriaAlumnoById(id);
  const [historial, setHistorial] = useState([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [guia, setGuia] = useState('');
  const [turnos, setTurnos] = useState(0);

  useEffect(() => {
    setMascota({
      modo: 'hablando',
      mensaje: INITIAL_MESSAGE.content,
    });
  }, [setMascota]);

  const handleSend = async (mensaje) => {
    const userMsg = { id: `user-${Date.now()}`, role: 'user', content: mensaje };
    const nextHistorial = [...historial, userMsg];
    setHistorial(nextHistorial);
    setLoading(true);

    try {
      const apiHistorial = nextHistorial.map(({ role, content }) => ({ role, content }));
      const response = await chatAgente(apiHistorial.slice(0, -1), mensaje);
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
      };
      setHistorial((prev) => [...prev, assistantMsg]);
      setMascota({ modo: 'hablando', mensaje: response });

      const newTurnos = turnos + 1;
      setTurnos(newTurnos);

      if (newTurnos >= 3) {
        const guiaResult = await generarGuia(
          'visual',
          materia?.nombre ?? 'la materia',
          'temas con dificultad',
          MATERIAL_POR_MATERIA[id] ?? '',
        );
        setGuia(guiaResult);
      }
    } catch {
      const fallback = 'Entiendo. Cuéntame más sobre qué temas te resultan más difíciles.';
      setHistorial((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: fallback },
      ]);
      setMascota({ modo: 'hablando', mensaje: fallback });
    } finally {
      setLoading(false);
    }
  };

  if (!materia) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark p-xxl text-on-primary">
        Materia no encontrada
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title={materia.nombre} />
      <main className="mx-auto grid max-w-6xl gap-xxl px-xl py-xxl lg:grid-cols-2">
        <section className="h-[500px]">
          <ChatAgente historial={historial} onSend={handleSend} loading={loading} />
        </section>

        {guia && (
          <section className="rounded-xxl border border-hairline-violet bg-ink-deep p-xxl">
            <h2 className="mb-lg font-display text-xl font-medium text-on-primary">
              Tu guía de estudio
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-primary">{guia}</p>
          </section>
        )}
      </main>
    </div>
  );
}
