import React from 'react'
import TarjetaPregunta from './TarjetaPregunta'
import { Link, NavLink } from 'react-router-dom'

export default function Preguntas(preguntas) {
    var { path, pathName } = require('../../config/config');
    const pre = preguntas.preguntas

    //Center the + icon pls
    // Considerándolo, no tiene caso, va a haber más de 5 preguntas y se va a perder

    return (

        <div className="pregunta-list section">
            {pre && pre.map(pregunta => {
                return (
                    <Link to={path.preguntas_detalles + "/" + pregunta.id} key={pregunta.id}>
                        {console.log("Clicked here, going to: ")}
                        <TarjetaPregunta
                            pregunta={pregunta}
                        />
                    </Link>
                )
            })}
            <NavLink to={path.crear_pregunta} className="btn-floating btn-large waves-effect waves-light blue">
                <i className="material-icons">add</i>
            </NavLink>
        </div>
    )
}
