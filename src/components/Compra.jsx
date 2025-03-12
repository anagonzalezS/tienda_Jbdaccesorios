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
  const handleRecaptcha = (value) => {
    setRecaptchaValue(value);
  };
  
  const queryParams = new URLSearchParams(location.search);
const productos = JSON.parse(queryParams.get("productos")) || [];
const total = Number(queryParams.get("total")) || 0;


  const [preferenceId, setPreferenceId] = useState(null);
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

  const telefonoVendedor = "1136545084";
  const direccionLocal = "Mitre 2309, CABA, Barrio once";
  const horarioAtencion = "Lunes a Viernes de 9:00 a 17:00.";
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    direccion: "",
    numero: "",
    piso: "",
    departamento: "",
    codigoPostal: "",
    partido: "",
    provincia: "",
    metodoEntrega: "retiro",
    metodoPago: "",
    aceptaPoliticas: false,
  });

  const [errores, setErrores] = useState({});
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(false);

  useEffect(() => {
    if (preferenceId) {
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
    }
  }, [preferenceId]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "metodoPago" && value === "mercadopago") {
      setMetodoPagoSeleccionado(true);
    } else {
      setMetodoPagoSeleccionado(false);
    }
  };

  const validarFormulario = () => {
    const { metodoPago, dni, telefono, email, nombre, apellido, metodoEntrega, direccion, numero, codigoPostal, partido, provincia, aceptaPoliticas } = formulario;
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

    if (metodoEntrega === "envio") {
      if (!direccion || !numero || !codigoPostal || !partido || !provincia) {
        errores.direccion = "Por favor, completa todos los campos de dirección.";
      }

      if (!/^\d{4,5}$/.test(codigoPostal)) {
        errores.codigoPostal = "Por favor, ingresa un código postal válido.";
      }
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

      {/* 🔥 Ahora el carrito está a la izquierda y el formulario a la derecha */}
      <div className="row d-flex flex-row-reverse">
  {/* 🛒 Carrito de compras (Derecha) */}
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
                src={producto.imagen} // URL de la imagen del producto
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


{/* 📝 Formulario de datos personales (Izquierda) */}
<div className="col-md-6">
  <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
    <h5>Datos Personales</h5>

    <div className="mb-3">
      <label className="form-label">Nombre:</label>
      <input type="text" className="form-control" name="nombre" value={formulario.nombre} onChange={handleChange} required />
    </div>

    <div className="mb-3">
      <label className="form-label">Apellido:</label>
      <input type="text" className="form-control" name="apellido" value={formulario.apellido} onChange={handleChange} required />
    </div>

    <div className="mb-3">
      <label className="form-label">Email:</label>
      <input type="email" className="form-control" name="email" value={formulario.email} onChange={handleChange} required />
    </div>
    <div className="mb-3">
      <label className="form-label">Teléfono:</label>
      <input type="text" className="form-control" name="telefono" value={formulario.telefono} onChange={handleChange} required />
    </div>

    <h5>Método de Pago</h5>
     {/* 🔽 DNI y Teléfono ahora van aquí 🔽 */}
 <div className="mb-3">
      <label className="form-label">DNI:</label>
      <input type="text" className="form-control" name="dni" value={formulario.dni} onChange={handleChange} required />
    </div>

<div className="form-check mb-3 d-flex align-items-center">
  <input type="radio" className="form-check-input me-2" id="mercadopago" name="metodoPago" value="mercadopago" checked={formulario.metodoPago === "mercadopago"} onChange={handleChange} />
  <label className="form-check-label d-flex align-items-center" htmlFor="mercadopago">
    <img src="/img/mercadopago-banner.png" alt="Mercado Pago" style={{ width: "40px", height: "auto", marginRight: "8px" }} />
    Mercado Pago
  </label>
</div>

{formulario.metodoPago === "mercadopago" && (
  <div className="alert alert-info mt-2">
    Serás redirigido a Mercado Pago para completar tu compra. Si cierras la ventana, la orden se perderá.
  </div>
)}

{errores.metodoPago && <div className="text-danger">{errores.metodoPago}</div>}


{/* 🚚 Método de Entrega */}
<h5>Método de Entrega</h5>
    <div className="form-check">
      <input type="radio" className="form-check-input" id="retiro" name="metodoEntrega" value="retiro" checked={formulario.metodoEntrega === "retiro"} onChange={handleChange} />
      <label className="form-check-label" htmlFor="retiro">Retiro en tienda</label>
    </div>
    <div className="form-check">
      <input type="radio" className="form-check-input" id="envio" name="metodoEntrega" value="envio" checked={formulario.metodoEntrega === "envio"} onChange={handleChange} />
      <label className="form-check-label" htmlFor="envio">Envío a domicilio</label>
    </div>

    {formulario.metodoEntrega === "retiro" && (
      <div className="alert alert-info mt-3">
        Puedes retirar tu compra en nuestra tienda ubicada en {direccionLocal}, de lunes a sábado de {horarioAtencion}.
      </div>
    )}

    {formulario.metodoEntrega === "envio" && (
      <div className="alert alert-info mt-3">
        La entrega será coordinado con el vendedor Jonatan Sanchez 1136545084.
      </div>
    )}

    {/* 📦 Datos de Envío si selecciona "Envío a domicilio" */}
    {formulario.metodoEntrega === "envio" && (
      <div className="mt-3">
        <h6>Datos de Envío</h6>
        <div className="mb-3">
          <label htmlFor="calle">Calle</label>
          <input type="text" className="form-control" id="calle" name="calle" value={formulario.calle} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="provincia">Provincia</label>
          <input type="text" className="form-control" id="provincia" name="provincia" value={formulario.provincia} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="codigoPostal">Código Postal</label>
          <input type="text" className="form-control" id="codigoPostal" name="codigoPostal" value={formulario.codigoPostal} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="departamento">Departamento</label>
          <input type="text" className="form-control" id="departamento" name="departamento" value={formulario.departamento} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="casa">Casa / Número</label>
          <input type="text" className="form-control" id="casa" name="casa" value={formulario.casa} onChange={handleChange} required />
        </div>
      </div>
    )}

    {/* 📜 Aceptación de Políticas */}
    <div className="form-check mb-4">
      <input type="checkbox" className="form-check-input" id="aceptaPoliticas" name="aceptaPoliticas" checked={formulario.aceptaPoliticas} onChange={handleChange} />
      <label className="form-check-label" htmlFor="aceptaPoliticas">
        Acepto las <a href="/politicas" target="_blank">políticas de privacidad</a>
      </label>
    </div>

    {errores.aceptaPoliticas && <div className="text-danger">{errores.aceptaPoliticas}</div>}

    <ReCAPTCHA
  sitekey="6Lf4Z-8qAAAAAPc7ZxeMxQPnIc_8IY6CJT4G7ehZ"
  onChange={handleRecaptcha}
/>



{errores.recaptcha && <div className="text-danger">{errores.recaptcha}</div>}

<button 
  type="button" 
  className="btn btn-primary w-100 mt-3" 
  onClick={handleBuy} 
  disabled={loading} // Deshabilitar el botón mientras carga
>
  {loading ? (
    <span className="spinner-border spinner-border-sm"></span> // Loader de Bootstrap
  ) : (
    "Confirmar Compra"
  )}
  
</button>
{preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} locale="es-AR" />}


  </form>
  </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compra;
