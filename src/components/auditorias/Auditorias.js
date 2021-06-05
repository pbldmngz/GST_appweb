import React from 'react'
import TarjetaAuditoria from './TarjetaAuditoria'

import TarjetaAgregarAuditoria from './TarjetaAgregarAuditoria'

import { bText } from "../../config/language";


export default function Auditorias(props) {

    const { userLevel, auditorias, alreadyDone, lang, uid, users, hasTrace } = props

    const pertinent = (userLevel !== 0) ? auditorias.filter(a => a.auditor.includes(uid)) : auditorias;

    return (
        <div>
            {(pertinent && pertinent.length !== 0) || (userLevel === 0) ? (
                <div className="arroz-chino">
                
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
                <div className="footer-single"><p>{bText[lang].auditorias.auditorias.nada}</p></div>
            )}
        </div>
    )
}
