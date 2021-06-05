import React from 'react'

import TarjetaPregunta from './TarjetaPregunta'
import TarjetaAgregarPregunta from './TarjetaAgregarPregunta'


export default function Preguntas(props) {

    const { preguntas, editPregunta, deletePregunta, userLevel, lang } = props

    const sortByKey = (array, key) => {
        return array.sort(function (a, b) {
            var x = a[key].toString(); var y = b[key].toString();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    const sortedPreguntas = sortByKey([...preguntas], "createdAt").reverse();

    return (
        <div className="">
            <div className="preguntas">

            <TarjetaAgregarPregunta/>

            {preguntas && sortedPreguntas.map(pregunta => {
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
        </div>
    )
}
