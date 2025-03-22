import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./CarritoModal.css";

const CarritoModal = ({ showModal, handleClose, carritoItems, setCarrito }) => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const total = carritoItems.reduce((acc, item) => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = parseInt(item.cantidad) || 1;
    return acc + precio * cantidad;
  }, 0);

  const eliminarProducto = (id) => {
    setCarrito(carritoItems.filter((item) => item.id !== id));
  };

  const modificarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(
      carritoItems.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const irACompra = () => {
    // Redirige a la página de compra y pasa los productos y el total como parámetros de URL
    navigate("/compra", {
      state: {
        productos: carritoItems,
        total: total,
      },
    });
  };

  return (
    <div className={`carrito-modal ${showModal ? "open" : ""}`}>
      <div className="carrito-header">
        <span>Mi Carrito</span>
        <button className="close-btn" onClick={handleClose} aria-label="Cerrar el carrito">
          <FaTimes />
        </button>
      </div>

      <div className="carrito-body">
        {carritoItems.length === 0 ? (
          <p className="carrito-vacio">No hay productos en el carrito.</p>
        ) : (
          carritoItems.map((producto) => (
            <div key={producto.id} className="product-item">
              <img src={producto.imagen} alt={producto.nombre} className="carrito-product-image" />
              <div className="product-details">
                <span className="producto-nombre">{producto.nombre}</span>
                <span className="producto-precio">
                  {" $"}{new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2 }).format((parseFloat(producto.precio) || 0) * (producto.cantidad || 1))}
                </span>
                <div className="cantidad-selector">
                  <button
                    onClick={() => modificarCantidad(producto.id, producto.cantidad - 1)}
                    disabled={producto.cantidad === 1}
                    className={producto.cantidad === 1 ? "disabled" : ""}
                  >
                    -
                  </button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => modificarCantidad(producto.id, producto.cantidad + 1)}>
                    +
                  </button>
                </div>
              </div>
              <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="carrito-footer">
        <p>
          <strong>Total: ${" "}
            {new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2 }).format(total)}
          </strong>
        </p>
        <button className="checkout-btn" onClick={irACompra}>Pagar total</button> {/* Redirige al formulario de compra */}
      </div>
    </div>
  );
};

export default CarritoModal;
