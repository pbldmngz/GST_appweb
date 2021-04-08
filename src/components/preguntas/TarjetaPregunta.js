import React from 'react'
import moment from 'moment'

export default function TarjetaPregunta(pregunta) {

    // Se tienen que añadir:
    // - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
    // Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
    const pre = pregunta.pregunta
    
    return (
        <div className="card x-depth-0 tarjeta-pregunta" key={pre.id}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{pre.english}</span>
                <p>{pre.description}</p>
            </div>
        </div>
    )
}
