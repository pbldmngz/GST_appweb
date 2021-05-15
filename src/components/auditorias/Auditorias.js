import React from 'react'
import TarjetaAuditoria from './TarjetaAuditoria'
import {Link} from 'react-router-dom'

import CambiarIdioma from '../util/CambiarIdioma'

export default function Auditorias(props) {
    const { userLevel, auditorias, alreadyDone, lang } = props
    var { path } = require('../../config/config');
    const text = require('../../config/language');

    const refLink = (userLevel === 0) ? path.detalles_preguntas_auditoria : path.responder_auditoria;

    return (
        <div className="">
            <div className="width">
                <div className="cabecera">
                    <div className="titulo">
                        <h2>Auditoría</h2>
                    </div>
                </div>
            </div>
        {/* Esto es muy mejorable */}
            {auditorias && auditorias.map(auditoria => {
                const retThis = (alreadyDone) ? (
                    <TarjetaAuditoria
                        auditoria={auditoria}
                        userLevel={userLevel}
                        alreadyDone={alreadyDone}
                        lang={lang}
                    />
                ) : (
                    <TarjetaAuditoria
                        key={auditoria.id}
                        auditoria={auditoria}
                        userLevel={userLevel}
                        alreadyDone={alreadyDone}
                        lang={lang}
                    />
                )
                return retThis
            })}

            <div className="width">
                <button className="regreso"><a href="#">{text[lang].return}</a></button>
            </div>
        </div>
    )
}
