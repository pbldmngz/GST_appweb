import React from 'react'
import TarjetaPregunta from './TarjetaPregunta'
import { Link, NavLink } from 'react-router-dom'
import CambiarIdioma from '../util/CambiarIdioma'

export default function Preguntas(props) {
    var { path, pathName } = require('../../config/config');
    const text = require('../../config/language');

    const { preguntas, editPregunta, deletePregunta, userLevel, lang } = props

    // Considerándolo, no tiene caso, va a haber más de 5 preguntas y se va a perder

    return (
    <div className="padre-padre-titulo">
        <div className="padre-titulo">
                <div className="titulo">
                    <NavLink to={path.crear_pregunta}>
                        <button className="boton-arriba">New Question</button>
                    </NavLink>
                </div>

                <div className="titulo">
                    <h2>Creación de auditoría</h2>
                </div>

                <div className="titulo">
                    <NavLink to={path.crear_pregunta} className="">
                        <button className="boton-arriba">Saved Questions</button>
                    </NavLink>
                </div>
        </div>

    <div>
            <div className="">
            {preguntas && preguntas.map(pregunta => {
                return (
                    <div key={pregunta.id}>
                        <TarjetaPregunta
                            pregunta={pregunta}
                            editPregunta={editPregunta}
                            deletePregunta={deletePregunta}
                            userLevel={userLevel}
                            lang={lang}
                        />
                    </div>
                )
            })}
        <div className="footer-padre-padre">
            <div className="footer-padre"></div>
                <div className="footer">
                    <div className="width-botones-abajo">
                        <NavLink to={path.crear_pregunta} className="">
                            <button className="boton-abajo">Asignar auditoría</button>
                        </NavLink>
                    </div>

                    <div className="width-botones-abajo">
                        <NavLink to={path.crear_pregunta} className="">
                            <button className="boton-abajo">Guardar preguntas</button>
                        </NavLink>
                    </div>
                </div>
        </div>
        
        </div>
            <button className="return"><a href="/">{text[lang].return}</a></button>
        </div>
        
        </div>

    )
}
