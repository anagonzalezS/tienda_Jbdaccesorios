import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ producto, onClose, onAgregarAlCarrito, onCarritoClick }) => {
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  if (!producto) return null;

  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

  const agregarAlCarrito = () => {
    onAgregarAlCarrito({ ...producto, cantidad });
    onClose();
    onCarritoClick();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const formatearPrecio = (precio) => {
    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      return "Precio no disponible";
    }
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(precioNumerico);
  };

  useEffect(() => {
    document.body.style.overflow = producto ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [producto]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={producto.imagen} alt={producto.nombre} className="modal-imagen" />
          <div className="modal-info">
            <h2>{producto.nombre}</h2>
            <p className="modal-precio">{formatearPrecio(producto.precio)}</p>
            <p className="modal-descripcion">{producto.descripcion}</p>
            <div className="cantidad-selector">
              <button onClick={disminuirCantidad}>-</button>
              <span>{cantidad}</span>
              <button onClick={aumentarCantidad}>+</button>
            </div>
            <button className="btn-agregar" onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
