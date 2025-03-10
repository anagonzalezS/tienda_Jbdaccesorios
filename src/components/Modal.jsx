// Modal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ producto, onClose, onAgregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  if (!producto) return null;

  // Aumentar y disminuir cantidad
  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

  // Agregar al carrito
  const agregarAlCarrito = () => {
    onAgregarAlCarrito(producto, cantidad); // Pasar la cantidad correcta
    onClose(); // Cierra el modal después de agregar al carrito
  };

  // Ir a la página de compra
  const pagarAhora = () => {
    navigate(`/compra?nombre=${encodeURIComponent(producto.nombre)}&precio=${producto.precio}&imagen=${encodeURIComponent(producto.imagen)}&cantidad=${cantidad}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>{producto.nombre}</h2>
        <img src={producto.imagen} alt={producto.nombre} className="modal-imagen" />
        <p>{producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precio}</p>

        {/* Selector de cantidad */}
        <div className="cantidad-selector">
          <button onClick={disminuirCantidad}>-</button>
          <span>{cantidad}</span>
          <button onClick={aumentarCantidad}>+</button>
        </div>

        {/* Botones de acción */}
        <div className="modal-botones">
          <button className="btn-agregar" onClick={agregarAlCarrito}>
            Agregar al carrito
          </button>
          <button className="btn-pagar" onClick={pagarAhora}>
            Pagar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
