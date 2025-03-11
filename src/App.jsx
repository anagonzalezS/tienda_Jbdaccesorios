import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar React Router
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar.jsx';
import Portada from './components/Portada.jsx';
import Productos from './components/Productos.jsx';
import Ubicacion from './components/Ubicacion.jsx';
import Footer from './components/Footer.jsx';
import productos from './data/productos';
import Compra from './components/Compra';  // Importamos el formulario de compra
import CarritoModal from './components/CarritoModal'; // Importamos el modal del carrito

function App() {
  const [productosList, setProductosList] = useState(productos);
  const [carrito, setCarrito] = useState([]);  // Inicializamos carrito como un array vacío
  const [showCarritoModal, setShowCarritoModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prevCarrito) => {
      const existeProducto = prevCarrito.find((item) => item.id === producto.id);
      if (existeProducto) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad }];
    });
  
    setShowCarritoModal(true); // 🔥 Esto abre automáticamente el carrito modal
  };
  

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (idProducto) => {
    setCarrito(carrito.filter(producto => producto.id !== idProducto));
  };

  // Función para abrir el modal del carrito
  const onCarritoClick = () => {
    setShowCarritoModal(true);
  };

  return (
    <Router>
      <div>
        <Navbar carrito={carrito} onCarritoClick={onCarritoClick} />

        {/* Modal del carrito */}
        <CarritoModal 
          showModal={showCarritoModal}
          handleClose={() => setShowCarritoModal(false)} 
          carritoItems={carrito}
          setCarrito={setCarrito}
        />

        {/* Definir las rutas */}
        <Routes>
          <Route path="/" element={
            <>
              <section id="home">
                <Portada />
              </section>

              <section id="productos-list">
                <Productos 
                  productos={productosList} 
                  carrito={carrito}
                  agregarAlCarrito={agregarAlCarrito}
                  eliminarDelCarrito={eliminarDelCarrito}
                />
              </section>

              <section id="ubicacion">
                <Ubicacion />
              </section>

              <Footer />
            </>
          } />

          {/* Ruta para la página del formulario de compra */}
          <Route path="/compra" element={<Compra carrito={carrito} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
