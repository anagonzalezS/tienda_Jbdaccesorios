import React, { useState } from 'react';
import ProductoCard from "./ProductoCard";
import Filtros from "./Filtros";
import Modal from "./Modal";
import CarritoModal from "./CarritoModal";
import { Container, Row, Col, Button } from "react-bootstrap";
import './Productos.css';

const Productos = ({ productos, carrito, agregarAlCarrito, mostrarCarrito, setMostrarCarrito }) => {
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoModal, setProductoModal] = useState(null);
  const [cantidadVisible, setCantidadVisible] = useState(6); // Inicialmente muestra 6 productos

  const abrirModal = (producto) => {
    setProductoModal(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoModal(null);
  };

  const mostrarMasProductos = () => {
    setCantidadVisible((prevCantidad) => prevCantidad + 6); // Incrementa en 6
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={3} className="sidebar-col">
          <Filtros productos={productos} setProductosFiltrados={setProductosFiltrados} />
        </Col>
        <Col xs={12} md={9}>
          <Row>
            {productosFiltrados.slice(0, cantidadVisible).map((producto) => (
              <Col key={producto.id} xs={6} sm={4} md={4} lg={4}>
                <ProductoCard producto={producto} abrirModal={abrirModal} />
              </Col>
            ))}
          </Row>

          {/* Botón "Ver más" */}
          {cantidadVisible < productosFiltrados.length && (
            <div className="ver-mas-container">
          <Button onClick={mostrarMasProductos} className="btn-ver-mas" variant="none">
          Ver más
          </Button>

            </div>
          )}
        </Col>
      </Row>

      {/* Modal de detalles del producto */}
      {mostrarModal && (
        <Modal producto={productoModal} onClose={cerrarModal} onAgregarAlCarrito={agregarAlCarrito} />
      )}

      {/* Modal del carrito */}
      {mostrarCarrito && (
        <CarritoModal
          showModal={mostrarCarrito}  
          handleClose={() => setMostrarCarrito(false)}  
          carritoItems={carrito}
        />
      )}
    </Container>
  );
};

export default Productos;
