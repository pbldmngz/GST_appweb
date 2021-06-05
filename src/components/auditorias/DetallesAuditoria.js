import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';

import { bText } from "../../config/language";

const DetallesAuditoria = (props) => {
    
    const {auditoria, auth, lang} = props

    if (!lang) return null;

    if (!auth.uid) return <Redirect to="/signin" />
    
    if (auditoria) {
        return (
            <div className="container">
                <div className="section">
                    <div className="card x-depth-0" key={auditoria.id}>
                        <div className="card-content grey-text text-darken-3">
                            <span className="card-title">{auditoria.auditoria}</span>
                            <p>{bText[lang].auditorias.detallesAuditoria.auditor}: {auditoria.auditor}</p>
                            <p>{bText[lang].auditorias.detallesAuditoria.descripcion}: {auditoria.description}</p>
                            <p>{bText[lang].auditorias.detallesAuditoria.plan_reaccion}: {auditoria.reaction_plan}</p>
                            <p>{bText[lang].auditorias.detallesAuditoria.creada_por}: {auditoria.createdBy}, {moment(auditoria.createdAt.toDate()).locale(bText[lang].locale).fromNow()}</p>
                            <p>{bText[lang].auditorias.detallesAuditoria.fecha_inicio}: {moment(auditoria.fecha_inicio.toDate()).locale(bText[lang].locale).fromNow()}</p>
                            <p>{bText[lang].auditorias.detallesAuditoria.fecha_finalizacion}: {moment(auditoria.fecha_fin.toDate()).locale(bText[lang].locale).fromNow()}</p>
                            <p>{bText[lang].auditorias.detallesAuditoria.preguntas}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                {(bText[lang]) ? <p>{bText[lang].cargando}</p> : null}
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