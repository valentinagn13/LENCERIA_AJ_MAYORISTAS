import { cargarHigieneDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Higiene = ({ productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarHigieneDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo productos de higiene..."
    searchTerm={searchTerm}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Higiene;
