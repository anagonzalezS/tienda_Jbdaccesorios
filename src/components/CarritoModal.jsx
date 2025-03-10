import React from "react";
import { FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./CarritoModal.css";

const CarritoModal = ({ showModal, handleClose, carritoItems, setCarrito }) => {
  const navigate = useNavigate();

  // Formatea el precio
  const formatearPrecio = (precio) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precio);

  // Total del carrito
  const total = carritoItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Actualizar cantidad de producto
  const handleUpdateQuantity = (index, newCantidad) => {
    const newCarrito = [...carritoItems];
    newCarrito[index].cantidad = newCantidad;
    setCarrito(newCarrito);  // Actualiza el carrito con la nueva cantidad
  };

  // Eliminar producto del carrito
  const handleRemoveItem = (index) => {
    const newCarrito = carritoItems.filter((_, i) => i !== index); // Filtra el producto por su índice
    setCarrito(newCarrito);  // Actualiza el carrito eliminando el producto
  };

  // Redirige al formulario de compra con los productos del carrito en formato JSON
  const pagarAhora = () => {
    const carritoJSON = JSON.stringify(carritoItems); // Convierte el carrito a un string JSON
    navigate(`/compra?productos=${encodeURIComponent(carritoJSON)}&total=${total}`);
  };

  return (
    <div className={`carrito-modal ${showModal ? "open" : ""}`}>
      <div className="carrito-header">
        <h1>Mi Carrito</h1>
        <button className="close-btn" onClick={handleClose}><FaTimes size={20} /></button> {/* Cierra el modal */}
      </div>
      <div className="carrito-body">
        {carritoItems.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío</p>
        ) : (
          carritoItems.map((item, index) => (
            <div key={item.id} className="product-item">
              <img src={item.imagen} alt={item.nombre} className="product-image" />
              <div className="product-item-details">
                <span className="product-name">{item.nombre}</span>
                <span className="product-price">{formatearPrecio(item.precio)}</span>
                <div className="cantidad-selector">
                  <button onClick={() => handleUpdateQuantity(index, item.cantidad - 1)} disabled={item.cantidad <= 1}><FaMinus /></button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => handleUpdateQuantity(index, item.cantidad + 1)}><FaPlus /></button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                <FaTrash size={20} />
              </button>
            </div>
          ))
        )}
      </div>
      {carritoItems.length > 0 && (
        <div className="carrito-footer">
          <span className="total">Total: {formatearPrecio(total)}</span>
          <button className="checkout-btn" onClick={pagarAhora}>
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  );
};

export default CarritoModal;
