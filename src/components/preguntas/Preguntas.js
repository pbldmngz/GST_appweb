import React from 'react'
import TarjetaPregunta from './TarjetaPregunta'
import { Link, NavLink } from 'react-router-dom'

export default function Preguntas(props) {
    var { path, pathName } = require('../../config/config');
    const { preguntas, editPregunta, deletePregunta, userLevel } = props

    //Center the + icon pls
    // Considerándolo, no tiene caso, va a haber más de 5 preguntas y se va a perder

    return (

        <div className="pregunta-list section">
            <div className="center extra-padding-button">
                <NavLink to={path.crear_pregunta} className="btn-floating btn-large waves-effect waves-light blue">
                    <i className="material-icons">add</i>
                </NavLink>
            </div>
            {preguntas && preguntas.map(pregunta => {
                return (
                    <div key={pregunta.id}>
                        <TarjetaPregunta
                            pregunta={pregunta}
                            editPregunta={editPregunta}
                            deletePregunta={deletePregunta}
                            userLevel={userLevel}
                        />
                    </div>
                )
            })}
            <button className="regreso">Return</button>
        </div>
    )
}
