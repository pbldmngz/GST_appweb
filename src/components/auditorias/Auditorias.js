import React from 'react'
import TarjetaAuditoria from './TarjetaAuditoria'
import {Link} from 'react-router-dom'

export default function Auditorias(auditorias) {
    const audits = auditorias.auditorias
    var { path } = require('../../config/config');

    return (
        
        <div className="auditoria-list section">
            {audits && audits.map(auditoria => {
                return (
                    <Link to={path.responder_auditoria + "/" + auditoria.id} key={auditoria.id}>
                        <TarjetaAuditoria 
                        auditoria={auditoria}
                        />
                    </Link>
                )
            })}

            
        </div>
    )
}
