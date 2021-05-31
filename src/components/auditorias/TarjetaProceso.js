import React from 'react'
import moment from 'moment/min/moment-with-locales';
import { bText } from "../../config/language";

export default function TarjetaProceso(props) {
    const {auditoria, userLevel, alreadyDone, lang} = props
    // const bText = require('../../config/language');

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
    // console.log(moment.locale("es"))
    const date = auditoria.fecha_fin ? <p className="grey-text">{bText[lang].auditorias.tarjetaAuditoria.fecha_limite}: {moment(auditoria.fecha_fin.toDate()).fromNow()}</p> : null
    
    return (
        <div style={style} className="box" key={auditoria.id}>
            <div className="">
                {/* {console.log(audit.auditoria.length)} */}
                <div className="">
                    {/* card-title */}
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

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        lang: state.firebase.profile.lang,
    }
}