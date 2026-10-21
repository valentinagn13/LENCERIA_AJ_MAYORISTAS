'use client'
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';
import IconoCarrito from '../ui/IconoCarrito';
import { formatearPrecio, precioANumero } from '../../utils/productos';
import { urlWhatsApp } from '../../data/tienda';

export default function SolarOverview({ open, setOpen }) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    cartTotal,
    cartCount 
  } = useCart();
  const navigate = useNavigate();

  const generarMensajeWhatsApp = () => {
    let mensaje = '🛒 *PEDIDO MAYORISTA*\n\n';
    mensaje += '*Productos solicitados:*\n';
    cartItems.forEach((item, index) => {
      mensaje += `\n${index + 1}. ${item.nombre}`;
      if (item.id) mensaje += ` (Ref: ${item.id})`;
      if (item.selectedSize) mensaje += `\n   Talla: ${item.selectedSize}`;
      mensaje += `\n   Cantidad: ${item.quantity}`;
      mensaje += `\n   Precio unitario: ${formatearPrecio(item.precio)}`;
      mensaje += `\n   Subtotal: ${formatearPrecio(precioANumero(item.precio) * item.quantity)}\n`;
    });
    mensaje += `\n*Total de productos:* ${cartCount}`;
    mensaje += `\n*Total a pagar:* ${cartTotal}`;
    return urlWhatsApp(mensaje);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Ajuste para móviles: ocupa toda la pantalla en móvil, sidebar en desktop */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-6 lg:pl-10">
     <DialogPanel
  transition
                className="pointer-events-auto w-screen max-w-full sm:max-w-md lg:max-w-lg transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"

>

              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {/* Header mejorado para móviles */}
                <div className="flex-shrink-0 px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-200">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-xl sm:text-xl lg:text-2xl font-semibold text-gray-900">
                      Carrito de compras
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-3 text-gray-400 hover:text-gray-500 hover:bg-pink-100 rounded-full transition-colors"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Cerrar</span>
                        <XMarkIcon aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7" />
                      </button>
                    </div>
                  </div>
                  {cartCount > 0 && (
                    <p className="mt-2 text-base sm:text-sm text-gray-600 font-medium">
                      {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                    </p>
                  )}
                </div>

                {/* Cart Items  */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                  <div className="flow-root">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-16 sm:py-20">
                        <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                          <IconoCarrito className="w-12 sm:w-14 text-pink-600" strokeWidth={8} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">Tu carrito está vacío</h3>
                        
<button
  onClick={() => {
    setOpen(false); // Opcional: cierra el modal del carrito
    navigate('/');  // Redirige al inicio
  }}
  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
>
  Explorar productos
</button>
                        {/* <p className="text-base sm:text-lg text-gray-500">Agrega algunos productos para comenzar</p> */}


                      </div>
                    ) : (
                      <ul role="list" className="-my-4 sm:-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={`${product.id}-${product.selectedSize}`} className="flex py-6 sm:py-8">
                            {/* Product Image - más grande en móviles */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                              <img 
                                src={product.imagen} 
                                alt={product.nombre} 
                                className="w-full h-full object-contain" 
                              />
                            </div>

                            {/* Product Details */}
                            <div className="ml-4 flex flex-1 flex-col min-w-0">
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2 leading-tight mb-1">
                                      {product.nombre}
                                    </h3>
                                    {product.selectedSize && (
                                      <p className="text-sm sm:text-base text-gray-500 mb-2">
                                        Talla: <span className="font-medium">{product.selectedSize}</span>
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-start sm:ml-4">
                                    <p className="text-lg sm:text-xl font-bold text-pink-600">{formatearPrecio(product.precio)}</p>
                                  </div>
                                </div>
                                
                                {/* Subtotal móvil */}
                                <div className="mt-2 sm:hidden">
                                  <p className="text-sm text-gray-600">
                                    Subtotal: <span className="font-bold text-gray-900 text-base">{formatearPrecio(precioANumero(product.precio) * product.quantity)}</span>
                                  </p>
                                </div>
                              </div>
                              
                              {/* Quantity and Remove - mejor para móviles */}
                              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mt-4">
                                {/* Control de cantidad más grande */}
                                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                                  <button 
                                    onClick={() => updateQuantity(
                                      product.id, 
                                      product.selectedSize, 
                                      product.quantity - 1
                                    )}
                                    className="px-4 py-3 sm:px-3 sm:py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors font-medium text-lg sm:text-base"
                                    disabled={product.quantity <= 1}
                                  >
                                    −
                                  </button>
                                  <span className="px-4 py-3 sm:px-4 sm:py-2 text-gray-700 font-bold bg-gray-50 min-w-[3.5rem] sm:min-w-[3rem] text-center text-lg sm:text-base">
                                    {product.quantity}
                                  </span>
                                  <button 
                                    onClick={() => updateQuantity(
                                      product.id, 
                                      product.selectedSize, 
                                      product.quantity + 1
                                    )}
                                    className="px-4 py-3 sm:px-3 sm:py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors font-medium text-lg sm:text-base"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                                  <button 
                                    type="button" 
                                    onClick={() => removeFromCart(product.id, product.selectedSize)}
                                    className="font-medium text-pink-600 hover:text-pink-500 transition-colors text-base sm:text-sm"
                                  >
                                    Eliminar
                                  </button>
                                  
                                  {/* Subtotal desktop */}
                                  <div className="hidden sm:block">
                                    <p className="text-sm text-gray-600">
                                      Subtotal: <span className="font-medium text-gray-900">{formatearPrecio(precioANumero(product.precio) * product.quantity)}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

               {cartItems.length > 0 && (
  <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-8 bg-gray-50">
    <div className="flex justify-between items-center text-2xl sm:text-xl font-bold text-gray-900 mb-6">
      <p>Total</p>
      <p className="text-pink-600">{cartTotal}</p>
    </div>

    <a
      href={generarMensajeWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-xl border border-transparent bg-[#BC6E87] px-4 py-4 sm:py-3 text-base font-medium text-white shadow-lg hover:bg-pink-700 transition-colors w-full"
    >
      {/* Icono de enviar */}
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
      <span>Mandar pedido</span>
    </a>
    
    <div className="mt-6 flex justify-center text-center text-base sm:text-sm text-gray-500">
      <p>
        o{' '}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-medium text-pink-600 hover:text-pink-500"
        >
          Continuar comprando
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </p>
    </div>
  </div>
)}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}