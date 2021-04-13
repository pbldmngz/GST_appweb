import React from 'react'
import moment from 'moment'



export default function TarjetaAuditoria(auditoria) {
    // Si las tarjetas no tienen las mismas "líneas" de contenido
    // se rompe la tabla
    // Para arreglar esto se limitó el límite de carácteres para el título, 
    // quizás sea necesario para el resto de atributos

    // Se tienen que añadir:
    // - Función que regrese un botón de color y texto correspondiente al tiempo que falte
    // - Añadir botones para borrar/editar una auditoría, con un "¿estás seguro?"

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const audit = auditoria.auditoria

    var color = "white";
    var text = "!!";

    var checkDate = new Date();
    var fecha_fin = audit.fecha_fin.toDate().addDays(0)

    if (fecha_fin < checkDate){
        color = "black";
        text = "!!!";
    } else if (fecha_fin < checkDate.addDays(7)) {
        color = "red";
        text = "!!";
    } else if (fecha_fin < checkDate.addDays(30)) {
        color = "orange";
        text = "!";
    } else if (fecha_fin < checkDate.addDays(60)) {
        color = "yellow";
        text = "M";
    } else {
        color = "green";
        text = "R";
    } 

    const date = audit.fecha_fin ? <p className="grey-text">Due date: {moment(audit.fecha_fin.toDate()).fromNow()}</p> : null
    return (
        <div className="card x-depth-0 tarjeta-auditoria" key={audit.id}>
            <div className="card-content grey-text text-darken-3">
                {/* {console.log(audit.auditoria.length)} */}
                <div className="card-title-all">
                    {/* card-title */}
                    <span className="card-cont card-title">{
                            (audit.auditoria.length > 18) ? audit.auditoria.substr(0, 18) + "..." : audit.auditoria
                        }</span>

                    <div style={{ backgroundColor: color }} className="card-extra suavizar-borde">
                        <p>{text}</p>
                    </div>
                </div>
                
                
                <p>Auditor: {audit.auditor}</p>
                {date}
            </div>
        </div>
    )
}
