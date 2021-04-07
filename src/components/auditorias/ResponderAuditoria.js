import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';

const ResponderAuditoria = (props) => {
    const {auditoria, auth} = props
    //Esto puede servir de filtro para la búsqueda de preguntas
    if (!auth.uid) return <Redirect to="/signin" />
    
    if (auditoria) {
        return (
            <div className="container section responder-auditoria">
                <div className="card z-depth-0">
                    <div className="card  z-depth-0 content">
                        <span className="card-title">{auditoria.auditoria}</span>
                        <p>Texto de prueba</p>
                    </div>
                    <div className="card-action-grey-lighten-4 grey-text">
                        <div>Auditor: {auditoria.auditor}</div>
                        <div>{moment(auditoria.createdAt.toDate()).fromNow()}</div>
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
)(ResponderAuditoria)