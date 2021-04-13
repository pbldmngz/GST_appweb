import React from 'react'
import moment from 'moment'
import { Link, NavLink } from 'react-router-dom'

export default function TarjetaPregunta(props) {
    var { path, pathName } = require('../../config/config');
    // Se tienen que añadir:
    // - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
    // Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
    const {pregunta} = props
    
    return (
        <div className="card x-depth-0 tarjeta-pregunta card-content" key={pregunta.id}>
            <div className="center-grid">
                <Link to={path.detalles_pregunta_auditoria + "/" + pregunta.id}>
                    <div className="grey-text text-darken-3 card-cont">
                        <span className="card-title">{pregunta.english}</span>
                        <p>{pregunta.description}</p>
                        <p>Reaction Plan: {pregunta.reaction_plan}</p>
                    </div>
                </Link>
                <div className="card-extra">
                    <Link to={path.editar_pregunta + "/" + pregunta.id}>
                        <button className="boton">Editar</button>
                    </Link>
                    <Link to={path.preguntas}>
                        <button className="boton" onClick={() => {
                            props.deletePregunta(pregunta.id)
                        }}>Eliminar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
