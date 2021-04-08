import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';

const DetallesPregunta = (props) => {
    
    const { pregunta, auth } = props
    // console.log("Esto es pregunta", pregunta)
    //Esto puede servir de filtro para la búsqueda de preguntas
    if (!auth.uid) return <Redirect to="/signin" />
    
    if (pregunta) {
        return (
            <div className="container responder-pregunta">
                <div className="card-content card x-depth-0 section grey-text text-darken-3">
                    <div className="container">
                            <span className="card-title">{pregunta.english}</span>
                            <p>Descripción: {pregunta.description}</p>
                            <p>Categoría: {pregunta.category}</p>
                            <p>Plan de reacción: {pregunta.reaction_plan}</p>
                            <p>Creado por: {pregunta.createdBy}</p>
                            <p>Creado: {moment(pregunta.createdAt.toDate()).fromNow()}</p>
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