import React, { useState, useEffect } from 'react';
import './Filtros.css'; // Importamos los estilos

const Filtros = ({ productos, setProductosFiltrados }) => {
  const [orden, setOrden] = useState('asc');
  const [categoria, setCategoria] = useState('all');

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

  useEffect(() => {
    let productosFiltrados = productos.filter((producto) =>
      categoria === 'all' ? true : producto.categoria === categoria
    );

    productosFiltrados.sort((a, b) =>
      orden === 'asc' ? a.precio - b.precio : b.precio - a.precio
    );

    setProductosFiltrados(productosFiltrados);
  }, [productos, orden, categoria, setProductosFiltrados]);

  return (
    <aside className="sidebar">
      <div className="filtros-container">
        <div className="filtro-item">
          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <label htmlFor="orden">Ordenar por precio:</label>
          <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default Filtros;
