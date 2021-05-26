import React from 'react'
import TarjetaAuditoria from './TarjetaAuditoria'
import {Link} from 'react-router-dom'

import CambiarIdioma from '../util/CambiarIdioma'
import TarjetaAgregarAuditoria from './TarjetaAgregarAuditoria'

export default function Auditorias(props) {
    const { userLevel, auditorias, alreadyDone, lang, uid, users, hasTrace } = props
    var { path } = require('../../config/config');
    const text = require('../../config/language');

    const refLink = (userLevel === 0) ? path.detalles_preguntas_auditoria : path.responder_auditoria;

    const pertinent = (userLevel !== 0) ? auditorias.filter(a => a.auditor.includes(uid)) : auditorias;

    // auditorias.filter(a => a.auditor.includes(uid))
    // console.log(auditorias)

    return (
    <div>
        {(pertinent && pertinent.length !== 0) || (userLevel === 0) ? (
            <div className="arroz-chino">
            {/* Esto es muy mejorable */}
                {(userLevel === 0) ? <TarjetaAgregarAuditoria hasTrace={hasTrace}/> : null}

                {pertinent && pertinent.map(auditoria => {

                    return (
                        <div key={auditoria.id}>
                            <TarjetaAuditoria
                                auditoria={auditoria}
                                userLevel={userLevel}
                                alreadyDone={alreadyDone}
                                lang={lang}
                                users={users}
                            />
                        </div>
                    )
                })}
            </div>
        ) : (
            <div className="footer-single"><p>{text[lang].auditorias.auditorias.nada}</p></div>
        )}
        

       
    </div>
    )
}
