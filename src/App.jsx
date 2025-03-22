import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Portada from './components/Portada.jsx';
import Modal from './components/Modal';
import Productos from './components/Productos.jsx';
import Ubicacion from './components/Ubicacion.jsx';
import Footer from './components/Footer.jsx';
import Compra from './components/Compra';
import CarritoModal from './components/CarritoModal';
import Filtros from './components/Filtros';
import productos from './data/productos.jsx';

const categorias = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'Bicicletas', label: 'Bicicletas' },
  { value: 'Auto', label: 'Auto' },
  { value: 'Equipo de mate', label: 'Equipo de mate' },
  { value: 'Moto', label: 'Moto' },
  { value: 'Herramientas', label: 'Herramientas' },
  { value: 'Iluminación', label: 'Iluminación' },
  { value: 'Seguridad', label: 'Seguridad' },
  { value: 'Camping', label: 'Camping' },
  { value: 'Accesorios', label: 'Accesorios' },
  { value: 'Audio', label: 'Audio' },
];

function App() {
  const [productosList, setProductosList] = useState(productos);
  const [carrito, setCarrito] = useState([]);
  const [showCarritoModal, setShowCarritoModal] = useState(false);
  const [isFiltroLateralOpen, setIsFiltroLateralOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el modal del producto

  // Filtra productos según la categoría
  const filterProductos = (categoria) => {
    if (categoria === 'all') {
      setProductosList(productos);  // Restablece a todos los productos
    } else {
      const filtered = productos.filter(producto => producto.categoria === categoria);
      setProductosList(filtered);
    }
  };

  // Maneja el cambio en el carrito, añadiendo productos
  const handleAgregarAlCarrito = (producto, cantidad) => {
    setCarrito(prevCarrito => {
      const cantidadFinal = Number(cantidad) || 1; // Si cantidad no es un número, asume 1
  
      const existeProducto = prevCarrito.find(item => item.id === producto.id);
  
      if (existeProducto) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: (item.cantidad || 0) + cantidadFinal } : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: cantidadFinal }];
      }
    });
  };
  

  // Calcular la cantidad total de productos en el carrito
  const cantidadTotal = carrito.reduce((total, item) => total + (Number(item.cantidad) || 0), 0);

  const toggleFiltroLateral = () => {
    setIsFiltroLateralOpen(!isFiltroLateralOpen);
  };

  // Función para manejar el click en el carrito
  const onCarritoClick = () => {
    setShowCarritoModal(true); // Abre el modal del carrito
  };

  return (
    <Router>
      <div>
        <Navbar carrito={carrito} cantidadTotal={cantidadTotal} /> {/* Pasamos cantidadTotal al Navbar */}
        

        <CarritoModal
          showModal={showCarritoModal}
          handleClose={() => setShowCarritoModal(false)}
          carritoItems={carrito}
          setCarrito={setCarrito}
        />

        <div className={`filtro-lateral-container ${isFiltroLateralOpen ? 'open' : ''}`}>
          <Filtros categorias={categorias} onFilter={filterProductos} />
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <section id="home">
                <h2 className="titulo-seccion">Bienvenido a nuestra tienda</h2>
                <Portada />
              </section>

              <section id="productos-list">
                <h2 className="titulo-seccion">Productos disponibles</h2>
                <Productos 
                  productos={productosList}
                  carrito={carrito}
                  abrirModal={setProductoSeleccionado}  // Pasamos setProductoSeleccionado para abrir el modal
                  onAgregarAlCarrito={handleAgregarAlCarrito}  // Pasamos la función de agregar al carrito
                  categorias={categorias}
                />
              </section>

              <section id="ubicacion">
                <h2 className="titulo-seccion">Ubicación</h2>
                <Ubicacion />
              </section>

              <Footer />
            </>
          } />

          <Route path="/compra" element={<Compra carrito={carrito} />} />
        </Routes>

        {productoSeleccionado && <Modal 
          producto={productoSeleccionado} 
          onClose={() => setProductoSeleccionado(null)} 
          onAgregarAlCarrito={handleAgregarAlCarrito} 
          onCarritoClick={onCarritoClick}  // Pasa onCarritoClick como prop
        />}
      </div>
    </Router>
  );
}

export default App;
