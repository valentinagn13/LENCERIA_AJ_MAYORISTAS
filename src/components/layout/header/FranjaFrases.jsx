import { useEffect, useState } from "react";
import { HEADER } from "../../../data/header";

const MS_TRANSICION = 1000;

// Posición de la frase en cada fase: entra por la derecha, se queda en el centro y sale por la izquierda
const CLASE_FASE = {
  entrada: "translate-x-[100vw]",
  centro: "translate-x-0",
  salida: "-translate-x-[100vw]",
};

// Franja delgada a todo el ancho, encima del header, con frases que van cambiando
export default function FranjaFrases() {
  const frases = HEADER.frasesFranja;
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("entrada");

  useEffect(() => {
    const tiempos = [];
    const ciclo = () => {
      setFase("entrada");
      // Un instante en la derecha para que el navegador anime la entrada
      tiempos.push(
        setTimeout(() => setFase("centro"), 50),
        setTimeout(() => setFase("salida"), HEADER.segundosPorFrase * 1000),
        setTimeout(() => {
          setIndice((i) => (i + 1) % frases.length);
          ciclo();
        }, HEADER.segundosPorFrase * 1000 + MS_TRANSICION)
      );
    };
    ciclo();
    return () => tiempos.forEach(clearTimeout);
  }, [frases.length]);

  return (
    <div className="relative flex h-10 items-center justify-center overflow-hidden bg-header-franja px-4 text-sm font-semibold tracking-wide text-white">
      <span
        aria-live="polite"
        className={`whitespace-nowrap ease-in-out ${CLASE_FASE[fase]} ${
          fase === "entrada" ? "" : "transition-transform duration-1000"
        }`}
      >
        {frases[indice]}
      </span>
    </div>
  );
}
