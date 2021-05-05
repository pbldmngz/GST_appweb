import React from 'react'
import moment from 'moment'
import { Link, NavLink } from 'react-router-dom'

export default function TarjetaPregunta(props) {
    var { path, pathName } = require('../../config/config');
    // Se tienen que añadir:
    // - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
    // Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
    const {pregunta, userLevel, lang} = props

    // console.log("userLevel on tarjeta", userLevel)
    
    // En cierto modo, ni siquiera tiene caso esto, los usuarios normales no llegarían aquí
    const botones = (userLevel == 0) ? (
        <div className="button-group">
            <Link to={path.editar_pregunta + "/" + pregunta.id}>
                <div className="boton"><i className="material-icons">edit</i></div>
            </Link>
            <Link to={path.preguntas}>
                <div className="boton" onClick={() => {
                    props.deletePregunta(pregunta.id)
                }}><i className="material-icons">delete</i></div>
            </Link>
        </div>
    ) : null
    
    return ( 
        <div className="card x-depth-0 tarjeta-pregunta card-content" key={pregunta.id}>
            <div className="center-grid">
                <Link to={path.detalles_pregunta_auditoria + "/" + pregunta.id}>
                    <div className="grey-text text-darken-3 card-cont">
                        <span className="card-title">{pregunta[lang]}</span>
                        <p>{pregunta.description}</p>
                    </div>
                </Link>
                <div className="card-extra">
                    {botones}
                </div>
            </div>
        </div>
    )
}
