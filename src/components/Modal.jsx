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
    onAgregarAlCarrito(producto, cantidad);
    onClose(); // Cierra el modal del producto
    onCarritoClick(); // Abre el modal del carrito automáticamente

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const pagarAhora = () => {
    const total = producto.precio * cantidad; // Calcular el total del producto seleccionado
    navigate(
      `/compra?productos=${encodeURIComponent(
        JSON.stringify([{ ...producto, cantidad }])
      )}&total=${total}` // Pasar productos y total a la URL
    );
  };

  // Evitar el scroll en el fondo cuando el modal está abierto
  useEffect(() => {
    if (producto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [producto]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>{producto.nombre}</h2>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="modal-imagen"
          loading="lazy"
        />
        <p>{producto.descripcion}</p>
        <p>
          <strong>Precio:</strong> ${producto.precio}
        </p>

        <div className="cantidad-selector">
          <button onClick={disminuirCantidad}>-</button>
          <span>{cantidad}</span>
          <button onClick={aumentarCantidad}>+</button>
        </div>

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
