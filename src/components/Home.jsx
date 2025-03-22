import React, { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';

const Home = () => {
  const productosRef = useRef(null); // Crear referencia para la sección de productos

  return (
    <Container>
      <h2 className="titulo-seccion">Nuestros Productos</h2> {/* Título de la sección */}
      <Row ref={productosRef}> {/* Referencia para la sección de productos */}
        {/* Otros elementos de Home aquí */}
      </Row>
    </Container>
  );
};

export default Home;
