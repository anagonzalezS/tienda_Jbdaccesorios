import React, { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart, FaTruck } from "react-icons/fa";
import CarritoModal from "./CarritoModal";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const NavBar = ({ carrito, setCarrito }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Calcular cantidad total de productos en el carrito
  const cantidadTotal = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);

  // Función para abrir el modal del carrito
  const abrirCarrito = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Comprobar si estamos en la página de compra
  const isCompraPage = location.pathname === "/compra";

  return (
    <div>
      {/* 🔹 Barra de Navegación (PRIMERA LÍNEA) */}
      <Navbar bg="dark" variant="dark" expand="md" className="navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src="/img/navbar2.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!isCompraPage && (
                <>
                  <Nav.Link href="#productos-list">Tienda</Nav.Link>
                  <Nav.Link href="#ubicacion">Ubicación</Nav.Link>
                  <Nav.Link href="#contacto">Contacto</Nav.Link>
                  {/* Ícono del carrito con contador */}
                  <Nav.Link onClick={abrirCarrito} style={{ position: "relative" }}>
                    <FaShoppingCart size={24} />
                    {cantidadTotal > 0 && (
                      <Badge pill bg="danger" className="badge-carrito">
                        {cantidadTotal}
                      </Badge>
                    )}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🔹 Banner de Información (SEGUNDA LÍNEA) */}
      <div className="info-banner">
        <FaTruck size={18} className="info-icon" />
        <span className="info-text">Envíos a domicilio</span>
        <span> | </span>
        <span className="info-text">Pago seguro solo por Mercado Pago</span>
        <img src="/img/mercadopago-logo.png" alt="Logo Mercado Pago" className="mercado-pago-logo" />
      </div>

      {/* 🔹 Modal del carrito */}
      <CarritoModal showModal={showModal} handleClose={handleCloseModal} carritoItems={carrito} setCarrito={setCarrito} />
    </div>
  );
};

export default NavBar;
