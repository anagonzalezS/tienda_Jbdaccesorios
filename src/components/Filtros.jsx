import React, { useState } from 'react';
import './Filtros.css';  

const Filtros = ({ categorias, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!Array.isArray(categorias)) {
    console.error("La prop 'categorias' debe ser un arreglo");
    return null;
  }

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onFilter(selectedValue === 'all' ? '' : selectedValue);
  };

  return (
    <div className="filtro-lateral">
      <h2>Filtrar Productos</h2>
      <label htmlFor="categoria" className="filtro-label">Filtrar por categoría:</label>
      <select id="categoria" value={selectedCategory} onChange={handleChange} className="filtro-select">
        {categorias.map((categoria) => (
          <option key={categoria.value} value={categoria.value}>
            {categoria.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filtros;
