import React from 'react';
import { Button } from 'react-bootstrap';
import './Portada.css';

const Portada = ({ handleCategoriaChange }) => {
    return (
        <div className="hero">
            {/* Imagen de portada */}
            <div className="main-content d-flex flex-column justify-content-center align-items-center text-center text-white">
                <h1 className="display-4">Bienvenido a JBD Accesorios</h1>
                <p>Encuentra lo mejor para tus necesidades.</p>
                <Button variant="light" onClick={handleCategoriaChange}>Ver Productos</Button>
            </div>
        </div>
    );
};

export default Portada;
