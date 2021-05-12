import React from 'react'
import moment from 'moment/min/moment-with-locales';

export default function TarjetaAuditoria(props) {
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

    const {auditoria, userLevel, alreadyDone, lang} = props
    const bText = require('../../config/language');
    // if (!lang) return null;

    var color = "white";
    var text = "!!";

    var checkDate = new Date();
    var fecha_fin = auditoria.fecha_fin.toDate().addDays(0)

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