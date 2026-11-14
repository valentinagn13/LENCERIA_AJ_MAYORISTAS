/* eslint-disable react/prop-types */
import { cargarJuguetesDesdeSheets } from "../database/sheets";
import PaginaSubcategorias from "../components/PaginaSubcategorias";
import { opcionesDesdeHojas } from "../utils/subcategorias";
import { CATEGORIAS, JUGUETES_SUBCATEGORIAS } from "../data/categorias";

const OPCIONES_JUGUETES = [
  {
    nombre: "Todos los juguetes",
    ruta: "/juguetes",
    titulo: "Juguetes",
    descripcion: "Explora toda nuestra colección de juguetes.",
    fetchFn: cargarJuguetesDesdeSheets,
    loadingMessage: "Descubriendo tus placeres...",
  },
  ...opcionesDesdeHojas(JUGUETES_SUBCATEGORIAS),
];

const LANDING = {
  titulo: "Juguetes",
  descripcion: "Placeres que sorprenden: descubre nuestra selección de juguetes.",
  slug: "juguetes",
};

const IMAGEN = CATEGORIAS.find(({ key }) => key === "juguetes").imagen;

const Juguetes = ({ productos, searchTerm }) => (
  <PaginaSubcategorias
    imagen={IMAGEN}
    etiqueta="juguetes"
    landing={LANDING}
    opciones={OPCIONES_JUGUETES}
    productos={productos}
    searchTerm={searchTerm}
  />
);

export default Juguetes;
