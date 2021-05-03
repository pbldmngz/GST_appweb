import React from 'react'
import TarjetaPregunta from './TarjetaPregunta'
import { Link, NavLink } from 'react-router-dom'

export default function Preguntas(props) {
    var { path, pathName } = require('../../config/config');
    const { preguntas, editPregunta, deletePregunta, userLevel } = props

    //Center the + icon pls
    // Considerándolo, no tiene caso, va a haber más de 5 preguntas y se va a perder

    return (
    <div className="width">
        <div className="cabecera">
                <div className="titulo">
                    <NavLink to={path.crear_pregunta} className="">
                        <button className="boton-generico">New Question</button>
                    </NavLink>
                </div>

                <div className="titulo">
                    <h2>Audit Creation</h2>
                </div>

                <div className="titulo">
                    <NavLink to={path.crear_pregunta} className="">
                        <button className="boton-generico">Saved Questions</button>
                    </NavLink>
                </div>
        </div>

    <div>
            <div className="carta">
                {preguntas && preguntas.map(pregunta => {
                    return (
                        <div className="box" key={pregunta.id}>
                            <TarjetaPregunta
                                pregunta={pregunta}
                                editPregunta={editPregunta}
                                deletePregunta={deletePregunta}
                                userLevel={userLevel}
                            />
                        </div>
                    )
                })}
            </div>
    </div>

        <div className="width">
            <button className="regreso">Return</button>
        </div>
    </div>

    )
}
