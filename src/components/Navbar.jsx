import React, { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart, FaStore, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import CarritoModal from "./CarritoModal";
import { useNavigate, useLocation } from "react-router-dom";
import Banner from "./Banner";
import "./Navbar.css";

const NavBar = ({ carrito, setCarrito, cantidadTotal }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const abrirCarrito = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const isCompraPage = location.pathname === "/compra";

  return (
    <div>
      <Banner />

      <Navbar bg="dark" variant="dark" className="navbar">
        <Container className="d-flex justify-content-between">
          {/* 🔹 LOGO */}
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src="/img/navbar2.png" alt="Logo" className="navbar-logo" />
          </Navbar.Brand>

          {/* 🔹 MENÚ SIEMPRE VISIBLE */}
          <Nav className="ms-auto d-flex flex-row align-items-center">
            {!isCompraPage && (
              <>
                <Nav.Link onClick={() => navigate("/Productos")} className="icon-link">
                  <FaStore size={24} />
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/Ubicacion")} className="icon-link">
                  <FaMapMarkerAlt size={24} />
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/Contacto")} className="icon-link">
                  <FaPhoneAlt size={24} />
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* 🔹 Ícono del carrito */}
          {!isCompraPage && (
            <Nav.Item className="carrito-icono" onClick={abrirCarrito}>
              <FaShoppingCart size={24} className="icono-carrito" />
              {cantidadTotal > 0 && (
                <Badge pill bg="danger" className="badge-carrito">
                  {cantidadTotal}
                </Badge>
              )}
            </Nav.Item>
          )}
        </Container>
      </Navbar>

      <CarritoModal
        showModal={showModal}
        handleClose={handleCloseModal}
        carritoItems={carrito}
        setCarrito={setCarrito}
      />
    </div>
  );
};

export default NavBar;
