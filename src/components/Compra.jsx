import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Footer from "./Footer";
import "./Compra.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReCAPTCHA from "react-google-recaptcha";

const Compra = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  
  const queryParams = new URLSearchParams(location.search);
  const productos = JSON.parse(queryParams.get("productos")) || [];
  const total = Number(queryParams.get("total")) || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);
  }, []);

  const createPreference = async () => {
    try {
      const items = productos.map((producto) => ({
        title: producto.nombre,
        quantity: Number(producto.cantidad),
        unit_price: Number(producto.precio),
        currency_id: "ARS",
      }));

      const response = await axios.post("http://localhost:3000/create_preference", { items });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  const handleBuy = async () => {
    if (!validarFormulario()) return;
    setLoading(true);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
    }
    setLoading(false);
  };

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    metodoPago: "",
    aceptaPoliticas: false,
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validarFormulario = () => {
    const { metodoPago, dni, telefono, email, nombre, apellido, aceptaPoliticas } = formulario;
    let errores = {};

    if (!metodoPago) {
      errores.metodoPago = "Por favor, selecciona un método de pago.";
    }

    if (!nombre || !apellido || !dni || !telefono || !email) {
      errores.datosPersonales = "Por favor, completa todos los campos personales.";
    }

    if (!/^\d{7,8}$/.test(dni)) {
      errores.dni = "Por favor, ingresa un DNI válido (7 u 8 dígitos numéricos).";
    }

    if (!/^\d{8,12}$/.test(telefono)) {
      errores.telefono = "Por favor, ingresa un número de teléfono válido (8-12 dígitos).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errores.email = "Por favor, ingresa un correo electrónico válido.";
    }

    if (!aceptaPoliticas) {
      errores.aceptaPoliticas = "Debes aceptar las políticas de privacidad.";
    }
    if (!recaptchaValue) {
      errores.recaptcha = "Por favor, verifica que no eres un robot.";
    }
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    alert("Orden confirmada. Ahora serás redirigido a Mercado Pago para completar tu compra.");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Finalizar Compra</h2>
      <div className="row d-flex flex-row-reverse">
        <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h5>Tu Carrito</h5>
            <table className="table table-borderless align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr key={index}>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }}
                      />
                      {producto.nombre}
                    </td>
                    <td className="text-center">{producto.cantidad}</td>
                    <td className="text-end">${producto.precio * producto.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h5 className="text-end"><strong>Total: </strong>${total}</h5>
          </div>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Formulario */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
              />
              {errores.nombre && <div className="text-danger">{errores.nombre}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={formulario.apellido}
                onChange={handleChange}
              />
              {errores.apellido && <div className="text-danger">{errores.apellido}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                className="form-control"
                id="dni"
                name="dni"
                value={formulario.dni}
                onChange={handleChange}
              />
              {errores.dni && <div className="text-danger">{errores.dni}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formulario.telefono}
                onChange={handleChange}
              />
              {errores.telefono && <div className="text-danger">{errores.telefono}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formulario.email}
                onChange={handleChange}
              />
              {errores.email && <div className="text-danger">{errores.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="metodoPago">Método de pago</label>
              <select
                className="form-control"
                id="metodoPago"
                name="metodoPago"
                value={formulario.metodoPago}
                onChange={handleChange}
              >
                <option value="">Selecciona</option>
                <option value="mercadopago">MercadoPago</option>
              </select>
              {errores.metodoPago && <div className="text-danger">{errores.metodoPago}</div>}
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="aceptaPoliticas"
                name="aceptaPoliticas"
                checked={formulario.aceptaPoliticas}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="aceptaPoliticas">
                Acepto las políticas de privacidad
              </label>
              {errores.aceptaPoliticas && <div className="text-danger">{errores.aceptaPoliticas}</div>}
            </div>

            <div className="form-group mt-3">
              <ReCAPTCHA
                sitekey="6Lf4Z-8qAAAAAPc7ZxeMxQPnIc_8IY6CJT4G7ehZ"
                onChange={(value) => setRecaptchaValue(value)}
              />
              {errores.recaptcha && <div className="text-danger">{errores.recaptcha}</div>}
            </div>

            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleBuy}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Realizar Compra"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Compra;
