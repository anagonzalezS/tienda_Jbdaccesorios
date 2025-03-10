import React, { useState } from 'react';
import ProductoCard from "./ProductoCard";
import Filtros from "./Filtros";
import Modal from "./Modal";
import CarritoModal from "./CarritoModal";
import { Container, Row, Col } from "react-bootstrap";

const Productos = ({ productos, carrito, agregarAlCarrito, setMostrarCarrito }) => {
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoModal, setProductoModal] = useState(null);

  const abrirModal = (producto) => {
    setProductoModal(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoModal(null);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={3} className="sidebar-col">
          <Filtros productos={productos} setProductosFiltrados={setProductosFiltrados} />
        </Col>
        <Col xs={12} md={9}>
          <Row>
            {productosFiltrados.map((producto) => (
              <Col key={producto.id} xs={6} sm={4} md={4} lg={4}>
                <ProductoCard producto={producto} abrirModal={abrirModal} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      {mostrarModal && (
        <Modal producto={productoModal} onClose={cerrarModal} onAgregarAlCarrito={agregarAlCarrito} />
      )}
      {setMostrarCarrito && (
        <CarritoModal
          showModal={setMostrarCarrito}  // Aquí usas la prop setMostrarCarrito correctamente
          handleClose={() => setMostrarCarrito(false)}  // Función para cerrar el modal
          carritoItems={carrito}
        />
      )}
    </Container>
  );
};

export default Productos;
