import React from "react";
import { FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CarritoModal.css";

const CarritoModal = ({ showModal, handleClose, carritoItems, setCarrito }) => {
  const navigate = useNavigate();

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precio);

  const total = carritoItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const actualizarCantidad = (producto, cantidad) => {
    if (cantidad <= 0) return;
    const carritoActualizado = carritoItems.map((item) =>
      item.id === producto.id ? { ...item, cantidad } : item
    );
    setCarrito(carritoActualizado);
  };

  const eliminarProducto = (producto) => {
    const carritoFiltrado = carritoItems.filter((item) => item.id !== producto.id);
    setCarrito(carritoFiltrado);
  };

  const irAPagar = () => {
    const productosStr = encodeURIComponent(JSON.stringify(carritoItems));
    const total = carritoItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    navigate(`/compra?productos=${productosStr}&total=${total}`);
  };
  
  

  return (
    <div className={`carrito-modal ${showModal ? "open" : ""}`}>
      <div className="carrito-header">
        <h1>Tu carrito</h1>
        <button className="close-btn" onClick={handleClose}>
          <FaTimes />
        </button>
      </div>

      <div className="carrito-body">
        {carritoItems.length === 0 ? (
          <p className="carrito-vacio">No hay productos en el carrito.</p>
        ) : (
          carritoItems.map((producto) => (
            <div key={producto.id} className="product-item">
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="product-item-details">
                <span className="product-name">{producto.nombre}</span>
                <span className="product-price">{formatearPrecio(producto.precio)}</span>
                <div className="cantidad-control">
                  <button onClick={() => actualizarCantidad(producto, producto.cantidad - 1)}>
                    <FaMinus />
                  </button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => actualizarCantidad(producto, producto.cantidad + 1)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => eliminarProducto(producto)}>
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="carrito-footer">
        <p>
          <strong>Total: {formatearPrecio(total)}</strong>
        </p>
        <button className="checkout-btn" onClick={irAPagar}>
          pagar total
        </button>
      </div>
    </div>
  );
};

export default CarritoModal;
