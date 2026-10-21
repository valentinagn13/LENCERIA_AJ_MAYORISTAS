import { cargarLubricantesDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const Lubricantes = ({ productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarLubricantesDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo tus placeres..."
    searchTerm={searchTerm}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default Lubricantes;
