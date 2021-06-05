import React from 'react'
import moment from 'moment/min/moment-with-locales';

import { bText } from "../../config/language";

export default function TarjetaProceso(props) {

    const {auditoria, userLevel, alreadyDone, lang} = props

    var color = "white";
    var text = "!!";

    var style = {}

    if (alreadyDone) {
        color = "grey";
        text = "D";
        style = { backgroundColor: "#D5D8DC" }
    }

    const graphOrWarn = (userLevel == 0) ? (
        <div>
            <i className="material-icons">analytics</i>
        </div>
    ) : (
        <div style={{ backgroundColor: color }} className="card-extra suavizar-borde">
            <p>{text}</p>
        </div>
    );

    moment.locale(bText[lang].locale)

    const date = auditoria.fecha_fin ? <p className="grey-text">{bText[lang].auditorias.tarjetaAuditoria.fecha_limite}: {moment(auditoria.fecha_fin.toDate()).fromNow()}</p> : null
    
    return (
        <div style={style} className="box" key={auditoria.id}>
            <div className="">
                <div className="">
                    <span className="">{
                            (auditoria.auditoria.length > 18) ? auditoria.auditoria.substr(0, 18) + "..." : auditoria.auditoria
                        }</span>

                    {graphOrWarn}
                </div>
                
                <p>{bText[lang].auditorias.tarjetaAuditoria.auditor}: {auditoria.auditor}</p>
                {date}
            </div>
        </div>
    )
}