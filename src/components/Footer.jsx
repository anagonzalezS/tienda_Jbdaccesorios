import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Archivo CSS para los estilos personalizados

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          {/* Sección de la Empresa */}
          <Col xs={12} md={4}>
            <h5 className="footer-title">JBD Accesorios</h5>
            <p>Venta de accesorios para autos, bicicletas y motos. Productos de calidad.</p>
          </Col>

          {/* Sección de Contacto */}
          <Col xs={12} md={4}>
            <h5 className="footer-title">Contacto</h5>
            <ul className="list-unstyled">
              <li><i className="fa-solid fa-map-marker-alt"></i> Dirección: Mitre 2309 Barrio Once</li>
              <li><i className="fa-solid fa-phone"></i> Teléfono: <a href="tel:+5491136545084">+54 9 11 3654-5084</a></li>
              <li><i className="fa-solid fa-envelope"></i> Correo: <a href="mailto:jonatandanielsanchez03@gmail.com">jonatandanielsanchez03@gmail.com</a></li>
            </ul>
          </Col>

          {/* Redes Sociales */}
          <Col xs={12} md={4}>
            <h5 className="footer-title">Síguenos</h5>
            <div className="social-icons">
              <a href="https://www.instagram.com/jbdaccesorios" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/+5491136545084" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </Col>
        </Row>

        <Row className="py-2">
          <Col xs={12} className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} JBD Accesorios. Todos los derechos reservados.</p>
            <p className="mb-0">
              <a href="/terminos" className="footer-link">Términos y Condiciones</a> | 
              <a href="/privacidad" className="footer-link">Política de Privacidad</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
