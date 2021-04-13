import React from 'react'
import moment from 'moment'

export default function TarjetaPregunta(pregunta) {

    // Se tienen que añadir:
    // - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
    // Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
    const pre = pregunta.pregunta
    
    return (
        <div className="card x-depth-0 tarjeta-pregunta card-content" key={pre.id}>
            <div className="center-grid">
                <div className="grey-text text-darken-3 card-cont">
                    <span className="card-title">{pre.english}</span>
                    <p>{pre.description}</p>
                    <p>Reaction Plan: {pre.reaction_plan}</p>
                </div>
                <div className="card-extra">
                    <button className="boton">Editar</button>
                    <button className="boton">Eliminar</button>
                </div>
            </div>
        </div>
    )
}
