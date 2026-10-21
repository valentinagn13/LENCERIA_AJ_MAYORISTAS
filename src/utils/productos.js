// Utilidades compartidas para mostrar productos y precios

export const normalizarTexto = (texto = "") =>
  String(texto).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Convierte "35000", "35.000" o 35000 en el número 35000
export const precioANumero = (valor) => {
  if (typeof valor === "number") return valor;
  const limpio = String(valor ?? "")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
  return Number(limpio) || 0;
};

// Formato colombiano con separador de miles: 35000 -> "$35.000"
export const formatearPrecio = (valor) =>
  `$${Math.round(precioANumero(valor)).toLocaleString("es-CO")}`;

export const rutaProducto = (producto) =>
  `/${producto.id}-${normalizarTexto(producto.nombre)
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")}`;
