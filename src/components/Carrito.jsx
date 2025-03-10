import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const Carrito = () => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setProductosSeleccionados(carritoGuardado);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productosSeleccionados));
  }, [productosSeleccionados]);

  const modificarCantidad = (index, cambio) => {
    setProductosSeleccionados((prev) => {
      const nuevoCarrito = [...prev];
      if (nuevoCarrito[index].cantidad + cambio > 0) {
        nuevoCarrito[index].cantidad += cambio;
      } else {
        nuevoCarrito.splice(index, 1);
      }
      return nuevoCarrito;
    });
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);
  };

  const handlePagar = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create_preference", {
        items: productosSeleccionados.map((prod) => ({
          title: prod.nombre,
          quantity: Number(prod.cantidad),
          unit_price: Number(prod.precio),
          currency_id: "ARS",
        })),
      });

      if (response.data.id) {
        setPreferenceId(response.data.id);
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <Container>
      <h2>Carrito de Compras</h2>
      {productosSeleccionados.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {productosSeleccionados.map((prod, index) => (
            <li key={index}>
              <img src={prod.imagen} alt={prod.nombre} width="50" />
              {prod.nombre} - ${prod.precio} x {prod.cantidad}
              <Button onClick={() => modificarCantidad(index, -1)}><FaMinus /></Button>
              <Button onClick={() => modificarCantidad(index, 1)}><FaPlus /></Button>
              <Button onClick={() => modificarCantidad(index, -prod.cantidad)}><FaTrash /></Button>
            </li>
          ))}
        </ul>
      )}
      <h4>Total: ${calcularTotal()}</h4>
      <Button variant="success" onClick={handlePagar} disabled={productosSeleccionados.length === 0}>
        Generar Pago
      </Button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </Container>
  );
};

export default Carrito;
