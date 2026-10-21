import { cargarJuguetesDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Juguetes = ({ productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarJuguetesDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo tus placeres..."
    searchTerm={searchTerm}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Juguetes;
