import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';  // Si sigues usando la flecha hacia abajo
import Productos from './Productos';  // Asegúrate de importar el componente Productos
import './Portada.css';

const Portada = ({ handleCategoriaChange }) => {
  // Referencia a la sección de productos
  const productosRef = useRef(null);

  // Función para desplazar hacia la sección de productos
  const irAProductos = () => {
    productosRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Sección Hero */}
      <div className="hero">
        <div className="main-content d-flex flex-column justify-content-center align-items-center text-center text-white">
          <h1 className="display-4">Bienvenido a JBD Accesorios</h1>
          <p>Encuentra lo mejor para tus necesidades.</p>
          <Button variant="light" onClick={irAProductos}>Ver Productos</Button>
          <div className="arrow-container">
            <FaChevronDown className="arrow" />
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
