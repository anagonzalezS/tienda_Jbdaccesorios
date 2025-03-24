import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import Productos from "./Productos";
import "./Portada.css";

const Portada = ({ handleCategoriaChange }) => {
  const productosRef = useRef(null);

  // Función para desplazar hacia la sección de productos
  const irAProductos = () => {
    if (productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Sección Hero */}
      <div className="hero">
        <div className="main-content">
          <h1 className="display-4">
            <span className="orange-text">JBD Accesorios</span>
          </h1>
          <p className="hero-text">Accesorios con estilo y calidad.</p> {/* Subtítulo más fino */}
          <Button className="transparent-button" onClick={irAProductos}>
            Ver Productos
          </Button>
        </div>
      </div>

      {/* Sección de Productos con la referencia */}
      <div ref={productosRef}>
        <Productos handleCategoriaChange={handleCategoriaChange} />
      </div>
    </div>
  );
};

export default Portada;
