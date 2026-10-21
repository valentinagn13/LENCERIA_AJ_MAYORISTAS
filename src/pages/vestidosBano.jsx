import { cargarBronceadoresDesdeSheets } from "../database/sheets";
import ProductGrid from "../components/ProductGrid";

const BronceadoresPage = ({ productos, searchTerm, mostrarBotonVolver }) => (
  <ProductGrid
    fetchFn={cargarBronceadoresDesdeSheets}
    productos={productos}
    loadingMessage="Descubriendo Bronceadores..."
    searchTerm={searchTerm}
    showBackButton={mostrarBotonVolver !== false}
  />
);

export default BronceadoresPage;
