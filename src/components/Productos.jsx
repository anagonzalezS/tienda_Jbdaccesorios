import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Productos.css';

const Productos = ({ productos = [], onAgregarAlCarrito, abrirModal }) => {
  const [cantidadVisible, setCantidadVisible] = useState(8);
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(precio);
  };

  return (
    <div className="productos-container">
      <Row className="gx-3 gy-3 justify-content-center">
        {productos.slice(0, cantidadVisible).map((producto) => (
          <Col key={producto.id} xs={6} sm={6} md={3} lg={3} className="producto-container">
            <div className="producto-card">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
              />
              <div className="producto-info">
                <p className="producto-titulo"><strong>{producto.nombre}</strong></p>
                <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
              </div>
              <button 
                className="boton-agregar" 
                
                onClick={() => abrirModal(producto)} // Abre el modal con el producto seleccionado
              >
                Ver detalles
              </button>
            </div>
          </Col>
        ))}
      </Row>

      {productos.length > cantidadVisible && (
        <div className="ver-mas-container">
          <button className="boton-ver-mas" onClick={() => setCantidadVisible(cantidadVisible + 8)}>
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default Productos;
