import React from 'react'
import moment from 'moment'

export default function TarjetaPregunta(pregunta) {

    // Se tienen que añadir:
    // - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
    // Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
    const pre = pregunta.pregunta
    
    return (
        <div classname="tarjetas">
        <div className="card" key={pre.id}>
            <div className="container">
                <span className="">{pre.english}</span>
                <p>{pre.description}</p>
            </div>
        </div>
        </div>
    )
}
