import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar.jsx';
import Portada from './components/Portada.jsx';
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

  const filterProductos = (categoria) => {
    if (categoria) {
      const filtered = productos.filter(producto => producto.categoria === categoria);
      setProductosList(filtered);
    } else {
      setProductosList(productos);
    }
  };

  const toggleFiltroLateral = () => {
    setIsFiltroLateralOpen(!isFiltroLateralOpen);
  };

  return (
    <Router>
      <div>
        <Navbar carrito={carrito} onCarritoClick={() => setShowCarritoModal(true)} onToggleFiltroLateral={toggleFiltroLateral} />
        
        <CarritoModal
          showModal={showCarritoModal}
          handleClose={() => setShowCarritoModal(false)}
          carritoItems={carrito}
          setCarrito={setCarrito}
        />

        {/* Barra lateral de filtros */}
        <div className={`filtro-lateral-container ${isFiltroLateralOpen ? 'open' : ''}`}>
          <Filtros categorias={categorias} onFilter={filterProductos} />
        </div>

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
                  agregarAlCarrito={() => {}}
                  eliminarDelCarrito={() => {}}
                  onFilter={filterProductos} // Pasa la función de filtrado
                  categorias={categorias}
                />
              </section>

              <section id="ubicacion">
                <Ubicacion />
              </section>

              <Footer />
            </>
          } />

          <Route path="/compra" element={<Compra carrito={carrito} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
