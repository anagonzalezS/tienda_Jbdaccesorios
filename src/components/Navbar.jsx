import React, { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import CarritoModal from "./CarritoModal";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const NavBar = ({ carrito, setCarrito }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const cantidadTotal = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);

  const abrirCarrito = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const isCompraPage = location.pathname === "/compra"; // Verifica si estamos en la página de compra

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>Accesorios JBD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Condicional para ocultar los elementos en la página de compra */}
              {!isCompraPage && (
                <>
                  <Nav.Link href="#productos-list" className={isCompraPage ? "hidden-mobile" : ""}>Tienda</Nav.Link>
                  <Nav.Link href="#ubicacion" className={isCompraPage ? "hidden-mobile" : ""}>Ubicación</Nav.Link>
                  <Nav.Link href="#contacto" className={isCompraPage ? "hidden-mobile" : ""}>Contacto</Nav.Link>
                </>
              )}

              {/* Condicional para ocultar el carrito en la página de compra */}
              {!isCompraPage && (
                <Nav.Link onClick={abrirCarrito} style={{ position: "relative", cursor: "pointer" }}>
                  <FaShoppingCart size={24} />
                  {cantidadTotal > 0 && (
                    <Badge
                      pill
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        fontSize: "0.75rem",
                        padding: "5px 7px",
                      }}
                    >
                      {cantidadTotal}
                    </Badge>
                  )}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal del carrito */}
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
