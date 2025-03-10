import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductoCard.css';

const ProductoCard = ({ producto, abrirModal }) => {
  // Función para formatear el precio correctamente
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <div className="producto-card" onClick={() => abrirModal(producto)}>
      <div className="producto-imagen-container">
        <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
      </div>
      <div className="producto-detalles">
        <h5 className="producto-titulo">{producto.nombre}</h5>
        <p className="producto-precio">{formatearPrecio(producto.precio)}</p> {/* Precio formateado */}
      </div>
      <button className="btn-agregar-carrito">
        <FaShoppingCart size={20} /> Agregar al carrito
      </button>
    </div>
  );
};

export default ProductoCard;
