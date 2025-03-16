import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import Productos from './Productos';
import './Portada.css';

const Portada = ({ handleCategoriaChange }) => {
  const productosRef = useRef(null);

  // Función para desplazar hacia la sección de productos
  const irAProductos = () => {
    productosRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Sección Hero */}
      <div className="hero">
        <div className="main-content">
          <h1 className="display-4">
            <span className="orange-text">JBD Accesorios</span>
          </h1>
          <p className="hero-text">Calidad y estilo en tus accesorios.</p>
          <Button variant="light" onClick={irAProductos}>Ver Productos</Button>
          <div className="arrow-container">
          </div>
        </div>
      </div>

      {/* Sección de productos */}
      <div ref={productosRef}>
        <Productos />
      </div>
    </div>
  );
};

export default Portada;
