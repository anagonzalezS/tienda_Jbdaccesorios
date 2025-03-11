import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Ubicacion.css'; // Asegúrate de incluir este archivo para los estilos personalizados

const Ubicacion = () => {
  return (
    <Container id="ubicacion" className="ubicacion-container my-5">
      <Row>
        <Col md={6} className="order-md-first"> {/* La columna del título será la primera en pantallas pequeñas */}
          <h3>Ubicación</h3>
          <p>
            Si deseas retirar tu compra, por favor contáctanos con anticipación para coordinar tu llegada. 
            Nos encontramos en el <strong>Barrio de Once</strong> entre la altura:
          </p>
          <p><strong>Mitre 2309</strong></p>
          <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 17:00.</p>
          <p><strong>Importante:</strong> Para una mejor atención, es necesario avisar previamente antes de asistir a nuestra dirección.</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mitre+2309"
            className="btn btn-sutil"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
          </a>
        </Col>
        <Col md={6}>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.9472272484325!2d-58.409603184770736!3d-34.60962038045862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb28c76d6919%3A0x36e8653a047c4c68!2sMitre%202309%2C%20C1044AAH%20CABA%2C%20Argentina!5e0!3m2!1ses!2sar!4v1667875471489!5m2!1ses!2sar"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default Ubicacion;
