/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { slugDeRuta } from "../utils/subcategorias";
import ProductGrid from "./ProductGrid";
import DecorativeHearts from "./DecorativeHearts";
import BotonVolver from "./ui/BotonVolver";

// Página de una categoría con subcategorías (lencería, lubricantes, juguetes):
// banner, botones de subcategorías, productos y "Explora más categorías".

// Filtros de color sobre la imagen del banner
const FILTROS_BANNER = {
  rosa: "bg-gradient-to-t from-[#D98FA5]/70 via-[#E8B8C6]/30 to-transparent",
  azul: "bg-gradient-to-t from-blue-900/70 via-blue-700/45 to-sky-500/35",
};

// Banner alto en la página principal y más bajo en las subcategorías,
// para que los productos aparezcan antes
const Banner = ({ imagen, titulo, descripcion, compacto = false, filtro = "rosa" }) => (
  <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
    <DecorativeHearts fixed={false} count={36} />
    <div className={`relative w-full overflow-hidden shadow-xl ${compacto ? "h-28 sm:h-36 md:h-40 lg:h-48" : "h-40 sm:h-56 md:h-72 lg:h-96"}`}>
      <img
        src={imagen}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 min-w-full"
      />
      <div className={`absolute inset-0 ${FILTROS_BANNER[filtro] || FILTROS_BANNER.rosa}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`font-semibold text-white drop-shadow-lg ${compacto ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
            {titulo}
          </h1>
          <p className={`text-sm sm:text-base text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] ${compacto ? "mt-1" : "mt-2"}`}>{descripcion}</p>
        </div>
      </div>
    </div>
  </div>
);

const SelectorSubcategorias = ({ opciones, activa, etiqueta, estiloLista = false }) => {
  const navigate = useNavigate();

  return (
    <nav
      aria-label={estiloLista ? `Más categorías de ${etiqueta}` : `Subcategorías de ${etiqueta}`}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <ul className={`flex flex-wrap justify-center ${estiloLista ? "gap-x-5 gap-y-2" : "gap-3"}`}>
        {opciones.map(({ nombre, ruta, slug }) => {
          const esActiva = slug === activa;
          return (
            <li key={ruta}>
              <button
                type="button"
                onClick={() => navigate(ruta, { state: { scrollToProducts: true } })}
                aria-current={esActiva ? "page" : undefined}
                className={
                  estiloLista
                    ? `min-h-11 text-sm font-medium text-pink-800 transition hover:underline hover:underline-offset-4 ${
                        esActiva ? "underline decoration-2 underline-offset-4" : ""
                      }`
                    : `rounded-full px-5 py-2.5 text-base font-medium transition ${
                        esActiva
                          ? "bg-pink-600 text-white"
                          : "border border-pink-600 bg-white text-pink-600 hover:bg-pink-600 hover:text-white"
                      }`
                }
              >
                {nombre}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/**
 * imagen:   imagen del banner
 * etiqueta: nombre de la categoría en minúscula, para textos de accesibilidad
 * landing:  { titulo, descripcion, slug } — lo que se ve en la página principal;
 *           `slug` es la opción cuyos productos se muestran ahí (queda marcada)
 * opciones: [{ nombre, ruta, titulo, descripcion, fetchFn, loadingMessage, filtro? }]
 *           deben definirse fuera del componente para que fetchFn no cambie en cada render
 */
const PaginaSubcategorias = ({ imagen, etiqueta, landing, opciones, productos, searchTerm }) => {
  const { sub } = useParams();
  const location = useLocation();
  const productosRef = useRef(null);

  const conSlug = opciones.map((opcion) => ({ ...opcion, slug: slugDeRuta(opcion.ruta) }));
  const slugPedido = (sub || "").toLowerCase();
  const opcionPedida = conSlug.find((opcion) => opcion.slug === slugPedido);
  const isLanding = !opcionPedida;
  const activa = isLanding ? landing.slug : slugPedido;
  const seleccionada = conSlug.find((opcion) => opcion.slug === activa) || conSlug[0];

  useEffect(() => {
    if (!location.state?.scrollToProducts || !productosRef.current) return undefined;

    const frame = requestAnimationFrame(() => {
      const top = productosRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.state]);

  const grilla = (
    <ProductGrid
      key={activa}
      fetchFn={seleccionada.fetchFn}
      productos={productos}
      loadingMessage={seleccionada.loadingMessage}
      searchTerm={searchTerm}
      showBackButton={false}
    />
  );

  if (isLanding) {
    return (
      <>
        <Banner imagen={imagen} titulo={landing.titulo} descripcion={landing.descripcion} />

        <div className="min-h-screen bg-white px-4 pb-8 sm:px-6 lg:px-8 relative">
          <div className="mt-8">
            <SelectorSubcategorias opciones={conSlug} activa={activa} etiqueta={etiqueta} />
          </div>

          <div ref={productosRef} className="mt-8 scroll-mt-28">
            {grilla}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner
        imagen={imagen}
        titulo={seleccionada.titulo}
        descripcion={seleccionada.descripcion}
        compacto
        filtro={seleccionada.filtro}
      />

      <div className="min-h-screen bg-white px-4 pt-6 pb-8 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <BotonVolver to="/" texto="Volver al inicio" className="" />
        </div>

        <div className="mt-6">
          <SelectorSubcategorias opciones={conSlug} activa={activa} etiqueta={etiqueta} />
        </div>

        <div ref={productosRef} className="relative z-10 scroll-mt-28">
          {grilla}
        </div>

        <div className="mt-8 border-t border-pink-100 pt-5">
          <h2 className="mb-3 text-center text-base font-semibold text-pink-800">
            Explora más categorías
          </h2>
          <SelectorSubcategorias opciones={conSlug} activa={activa} etiqueta={etiqueta} estiloLista />
        </div>
      </div>
    </>
  );
};

export default PaginaSubcategorias;
