import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';

const DetallesAuditoria = (props) => {
    const {auditoria, auth, lang} = props
    const text = require('../../config/language');
    if (!lang) return null;
    // Se tienen que generar las preguntas en base al arr[] de ID's, 
    // esto debería estar en auditoria.preguntas

    //Esto puede servir de filtro para la búsqueda de preguntas
    if (!auth.uid) return <Redirect to="/signin" />
    
    if (auditoria) {
        return (
            <div className="container">
                {/* {console.log("listo", text, lang)} */}
                <div className="section">
                    <div className="card x-depth-0" key={auditoria.id}>
                        <div className="card-content grey-text text-darken-3">
                            <span className="card-title">{auditoria.auditoria}</span>
                            <p>{text[lang].auditorias.detallesAuditoria.auditor}: {auditoria.auditor}</p>
                            <p>{text[lang].auditorias.detallesAuditoria.descripcion}: {auditoria.description}</p>
                            <p>{text[lang].auditorias.detallesAuditoria.plan_reaccion}: {auditoria.reaction_plan}</p>
                            <p>{text[lang].auditorias.detallesAuditoria.creada_por}: {auditoria.createdBy}, {moment(auditoria.createdAt.toDate()).locale(text[lang].locale).fromNow()}</p>
                            <p>{text[lang].auditorias.detallesAuditoria.fecha_inicio}: {moment(auditoria.fecha_inicio.toDate()).locale(text[lang].locale).fromNow()}</p>
                            <p>{text[lang].auditorias.detallesAuditoria.fecha_finalizacion}: {moment(auditoria.fecha_fin.toDate()).locale(text[lang].locale).fromNow()}</p>
                            <p>{text[lang].auditorias.detallesAuditoria.preguntas}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
            {console.log("cargando", text, lang)}
                {(text[lang]) ? <p>{text[lang].cargando}</p> : null}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const auditorias = state.firestore.data.auditorias;
    const auditoria = auditorias ? auditorias[id] : null;
    return {
        auditoria: auditoria,
        lang: state.firebase.profile.lang,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "auditorias"}
    ])
)(DetallesAuditoria)