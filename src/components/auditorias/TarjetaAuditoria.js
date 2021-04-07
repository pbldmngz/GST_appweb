import React from 'react'
import moment from 'moment'

export default function TarjetaAuditoria(auditoria) {
    //Por algún motivo conforme bajan los datos 
    //siempre están envueltos en un objeto auditoria
    const audit = auditoria.auditoria
    return (
        <div className="card x-depth-0 tarjeta-auditoria" key={audit._id}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{audit.auditoria}</span>
                <p>Auditor: {audit.auditor}</p>
                <p className="grey-text">Due date: {moment(audit.createdAt.toDate()).fromNow()}</p>
            </div>
        </div>
    )
}
