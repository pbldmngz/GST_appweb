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
    <div>
        <div className="arroz-chino">
        {/* Esto es muy mejorable */}
            {auditorias && auditorias.map(auditoria => {
                
                return <TarjetaAuditoria
                    auditoria={auditoria}
                    userLevel={userLevel}
                    alreadyDone={alreadyDone}
                    lang={lang}
                />
            })}
        </div>
    </div>
    )
}
