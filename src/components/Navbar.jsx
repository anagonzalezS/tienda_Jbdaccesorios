import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = ({ carrito, onCarritoClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cantidadTotal = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);

  const abrirFormulario = () => {
    navigate('/compra');
  };

  const irPaginaPrincipal = () => {
    navigate('/');
  };

  const isCompraPage = location.pathname === '/compra';

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand onClick={irPaginaPrincipal} style={{ cursor: 'pointer' }}>
          Accesorios JBD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isCompraPage && (
              <>
                <Nav.Link href="#productos-list">Tienda</Nav.Link>
                <Nav.Link href="#ubicacion">Ubicación</Nav.Link>
                <Nav.Link href="#contacto">Contacto</Nav.Link>
              </>
            )}
            {!isCompraPage && (
              <Nav.Link onClick={onCarritoClick} style={{ position: 'relative' }}>
                <FaShoppingCart size={24} />
                {cantidadTotal > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-10px',
                      fontSize: '0.75rem',
                      padding: '5px 7px'
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
  );
};

export default NavBar;
