import React from "react"; 
import { FaTruck, FaCreditCard, FaMapMarkerAlt, FaWhatsapp, FaTools } from "react-icons/fa"; 
import "./Banner.css"; // Asegúrate de importar este archivo para los estilos

const Banner = () => {
  return (
    <div className="info-banner">
      <div className="marquee">
        <div className="marquee-content">
          <FaTools size={20} className="info-icon" />
          <span className="info-text">Accesorios para motos, autos y bicicletas</span>
          <span> | </span>

          <FaTruck size={20} className="info-icon" />
          <span className="info-text">Envíos disponibles coordinando con el vendedor</span>
          <span> | </span>

          <FaCreditCard size={20} className="info-icon" />
          <span className="info-text">Pagos exclusivamente con Mercado Pago</span>
          <span> | </span>

          <FaMapMarkerAlt size={20} className="info-icon" />
          <span className="info-text">Entregas en puntos acordados con el cliente</span>
          <span> | </span>

          <FaWhatsapp size={20} className="info-icon" />
          <span className="info-text">Consultas y pedidos por WhatsApp</span>

          {/* Duplicamos el contenido para evitar el corte */}
          <FaTools size={20} className="info-icon" />
          <span className="info-text">Accesorios para motos, autos y bicicletas</span>
          <span> | </span>

          <FaTruck size={20} className="info-icon" />
          <span className="info-text">Envíos disponibles coordinando con el vendedor</span>
          <span> | </span>

          <FaCreditCard size={20} className="info-icon" />
          <span className="info-text">Pagos exclusivamente con Mercado Pago</span>
          <span> | </span>

          <FaMapMarkerAlt size={20} className="info-icon" />
          <span className="info-text">Entregas en puntos acordados con el cliente</span>
          <span> | </span>

          <FaWhatsapp size={20} className="info-icon" />
          <span className="info-text">Consultas y pedidos por WhatsApp</span>

          {/* Añadir más repeticiones */}
          <FaTools size={20} className="info-icon" />
          <span className="info-text">Accesorios para motos, autos y bicicletas</span>
          <span> | </span>

          <FaTruck size={20} className="info-icon" />
          <span className="info-text">Envíos disponibles coordinando con el vendedor</span>
          <span> | </span>

          <FaCreditCard size={20} className="info-icon" />
          <span className="info-text">Pagos exclusivamente con Mercado Pago</span>
          <span> | </span>

          <FaMapMarkerAlt size={20} className="info-icon" />
          <span className="info-text">Entregas en puntos acordados con el cliente</span>
          <span> | </span>

          <FaWhatsapp size={20} className="info-icon" />
          <span className="info-text">Consultas y pedidos por WhatsApp</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
