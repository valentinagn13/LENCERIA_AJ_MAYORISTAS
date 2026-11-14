import { cargarHoja } from "../database/sheets";

// El slug es la última parte de la ruta: "/lubricantes/anales" -> "anales"
export const slugDeRuta = (ruta) => ruta.split("/").filter(Boolean).pop();

// Convierte la lista de subcategorías de data/categorias.js en opciones de la página.
// Cada una lee su propia pestaña del Excel con cargarHoja.
export const opcionesDesdeHojas = (subcategorias) =>
  subcategorias.map(({ nombre, hoja, ruta }) => ({
    nombre,
    ruta,
    titulo: nombre,
    descripcion: `Explora nuestra colección de ${nombre.toLowerCase()}.`,
    fetchFn: () => cargarHoja(hoja),
    loadingMessage: `Cargando ${nombre.toLowerCase()}...`,
  }));
