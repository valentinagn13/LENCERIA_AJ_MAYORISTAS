/* eslint-disable react/prop-types */
import { cargarLubricantesDesdeSheets } from "../database/sheets";
import PaginaSubcategorias from "../components/PaginaSubcategorias";
import { opcionesDesdeHojas } from "../utils/subcategorias";
import { CATEGORIAS, LUBRICANTES_SUBCATEGORIAS } from "../data/categorias";

const OPCIONES_LUBRICANTES = [
  {
    nombre: "Todos los lubricantes",
    ruta: "/lubricantes",
    titulo: "Lubricantes",
    descripcion: "Explora toda nuestra colección de lubricantes.",
    fetchFn: cargarLubricantesDesdeSheets,
    loadingMessage: "Descubriendo tus placeres...",
  },
  ...opcionesDesdeHojas(LUBRICANTES_SUBCATEGORIAS),
];

const LANDING = {
  titulo: "Lubricantes",
  descripcion: "Suavidad que intensifica: encuentra el lubricante ideal para cada momento.",
  slug: "lubricantes",
};

const IMAGEN = CATEGORIAS.find(({ key }) => key === "lubricantes").imagen;

const Lubricantes = ({ productos, searchTerm }) => (
  <PaginaSubcategorias
    imagen={IMAGEN}
    etiqueta="lubricantes"
    landing={LANDING}
    opciones={OPCIONES_LUBRICANTES}
    productos={productos}
    searchTerm={searchTerm}
  />
);

export default Lubricantes;
