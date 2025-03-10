import React, { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
// Elimina la importación del componente Productos

const Home = () => {
  const productosRef = useRef(null); // Crear referencia para la sección de productos

  return (
    <Container>
      <Row ref={productosRef}> {/* Referencia para la sección de productos */}
        {/* Otros elementos de Home aquí */}
      </Row>
    </Container>
  );
};

export default Home;
