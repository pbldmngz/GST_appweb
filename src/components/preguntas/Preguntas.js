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
            <div className="cabecera">
            <button className="return"><NavLink to={path.crear_pregunta}>
                <text>New Question</text>
            </NavLink></button>
            <text className="title">Audit Creation</text>
            <button className="return"><NavLink to={path.crear_pregunta}>
                <text>Saved Questions</text>
            </NavLink></button>
            </div>
            <div className="preguntas">
            {pre && pre.map(pregunta => {
                return (
                    <Link to={path.preguntas_detalles + "/" + pregunta.id} key={pregunta.id}>
                        <TarjetaPregunta
                            pregunta={pregunta}
                        />
                    </Link>
                )
            })}
            </div>
            <div className="regreso"><button className="return">Return</button></div>
        </div>
    )
}
