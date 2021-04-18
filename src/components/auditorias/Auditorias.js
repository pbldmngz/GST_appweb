import React from 'react'
import TarjetaAuditoria from './TarjetaAuditoria'
import {Link} from 'react-router-dom'

export default function Auditorias(props) {
    const { auditorias, userLevel } = props
    var { path } = require('../../config/config');

    const refLink = (userLevel === 0) ? path.detalles_preguntas_auditoria : path.responder_auditoria;

    return (
        
        <div className="auditoria-list section">
            {auditorias && auditorias.map(auditoria => {
                return (
                    <Link to={refLink + "/" + auditoria.id} key={auditoria.id}>
                        <TarjetaAuditoria 
                        auditoria={auditoria}
                        userLevel={userLevel}
                        />
                    </Link>
                )
            })}

            
        </div>
    )
}
