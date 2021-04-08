import React from 'react'
import moment from 'moment'

export default function TarjetaAuditoria(auditoria) {
    // Si las tarjetas no tienen las mismas "líneas" de contenido
    // se rompe la tabla

    // Se tienen que añadir:
    // - Función que regrese un botón de color y texto correspondiente al tiempo que falte
    // - Añadir botones para borrar/editar una auditoría, con un "¿estás seguro?"
    const audit = auditoria.auditoria

    const date = audit.fecha_fin ? <p className="grey-text">Due date: {moment(audit.fecha_fin.toDate()).fromNow()}</p> : null
    return (
        <div className="card x-depth-0 tarjeta-auditoria" key={audit.id}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{audit.auditoria}</span>
                <p>Auditor: {audit.auditor}</p>
                {date}
            </div>
        </div>
    )
}
