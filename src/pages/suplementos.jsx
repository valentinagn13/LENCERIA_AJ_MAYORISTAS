import { cargarSuplementosDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Suplementos = ({ productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarSuplementosDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo suplementos..."
    searchTerm={searchTerm}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Suplementos;
