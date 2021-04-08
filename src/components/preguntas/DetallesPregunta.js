import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';

const DetallesPregunta = (props) => {
    console.log("Esto es pregunta", pregunta)
    const { pregunta, auth } = props
    //Esto puede servir de filtro para la búsqueda de preguntas
    if (!auth.uid) return <Redirect to="/signin" />
    
    if (pregunta) {
        return (
            <div className="container section responder-pregunta">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{pregunta.lang.english}</span>
                    <p>{pregunta.description}</p>
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
    const preguntas = state.firestore.data.preguntas;
    const pregunta = preguntas ? preguntas[id] : null;
    return {
        pregunta: pregunta,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "preguntas" }
    ])
)(DetallesPregunta)