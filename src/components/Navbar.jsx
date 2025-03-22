import React, { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
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

  // Debug: Verificar si cantidadTotal está llegando correctamente
  console.log("Cantidad total recibida en NavBar:", cantidadTotal);

  return (
    <div>
      <Banner />

      <Navbar bg="dark" variant="dark" expand="md" className="navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src="/img/navbar2.png" alt="Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!isCompraPage && (
                <>
                  <Nav.Link onClick={() => navigate("/productos")}>Tienda</Nav.Link>
                  <Nav.Link onClick={() => navigate("/ubicacion")}>Ubicación</Nav.Link>
                  <Nav.Link onClick={() => navigate("/contacto")}>Contacto</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* Ícono del carrito con badge */}
          {!isCompraPage && (
            <Nav.Item className="carrito-icono" onClick={abrirCarrito}>
              <FaShoppingCart size={24} className="icono-carrito" />
              
              {/* Mostrar el badge solo si cantidadTotal es mayor que 0 */}
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
