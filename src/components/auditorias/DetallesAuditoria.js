import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';

const DetallesAuditoria = (props) => {
    const {auditoria, auth} = props
    // Se tienen que generar las preguntas en base al arr[] de ID's, 
    // esto debería estar en auditoria.preguntas

    //Esto puede servir de filtro para la búsqueda de preguntas
    if (!auth.uid) return <Redirect to="/signin" />
    
    if (auditoria) {
        return (
            <div className="container">
                <div className="section">
                    <div className="card x-depth-0" key={auditoria.id}>
                        <div className="card-content grey-text text-darken-3">
                            <span className="card-title">{auditoria.auditoria}</span>
                            <p>Auditor: {auditoria.auditor}</p>
                            <p>Descripción: {auditoria.description}</p>
                            <p>Plan de reacción: {auditoria.reaction_plan}</p>
                            <p>Creada por: {auditoria.createdBy}, {moment(auditoria.createdAt.toDate()).fromNow()}</p>
                            <p>Fecha de inicio: {moment(auditoria.fecha_inicio.toDate()).fromNow()}</p>
                            <p>Fecha de finalización: {moment(auditoria.fecha_fin.toDate()).fromNow()}</p>
                            <p>Preguntas (esto es un array, ya veremos como se arregla esto)</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Cargando...</p>
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
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "auditorias"}
    ])
)(DetallesAuditoria)