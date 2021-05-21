import React from 'react'
import TarjetaPregunta from './TarjetaPregunta'
import { Link, NavLink } from 'react-router-dom'
import CambiarIdioma from '../util/CambiarIdioma'
import Volver from '../util/Volver'

import TarjetaAgregarPregunta from './TarjetaAgregarPregunta'

export default function Preguntas(props) {
    var { path, pathName } = require('../../config/config');
    const text = require('../../config/language');

    const { preguntas, editPregunta, deletePregunta, userLevel, lang } = props

    // Considerándolo, no tiene caso, va a haber más de 5 preguntas y se va a perder

    return (
        <div className="">
            <div className="center-box">
                <TarjetaAgregarPregunta/>
            </div>
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
        </div>
    )
}
