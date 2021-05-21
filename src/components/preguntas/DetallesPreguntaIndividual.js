import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';
import PreguntaGrafica from './PreguntaGrafica'

const DetallesPregunta = (props) => {
    // const id = "igwDVTQR3LedpGldpPe8";
    // console.log("Esto es ID", id)
    //Esto puede servir de filtro para la búsqueda de preguntas
    // if (!auth.uid) return <Redirect to="/signin" />
    const { pregunta } = props

    // const pregunta = {}
    // const preguntaRespuestas = [] //Array de diccionarios
    // { console.log("login pregunta --> DePre", pregunta) }
    const categoria = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
    }
    if (pregunta) {
        return (
            <div className="">
                <div className="form-1">
                    <div className="form-2">
                            <div className="input-field">
                                <span className="card-title">{pregunta.english}</span>
                            </div>
                            <div className="input-field">
                                <p>Descripción: {pregunta.description}</p>
                            </div>
                            <div className="input-field">
                                <p>Categoría: {categoria[pregunta.category]}</p>
                            </div>
                            <div className="input-field">
                                <p>Plan de reacción: {pregunta.reaction_plan}</p>
                            </div>
                            <div className="input-field">
                                <p>Creado por: {pregunta.createdBy}</p>
                            </div>
                            <div className="input-field">
                                <p>Creado: {moment(pregunta.createdAt.toDate()).fromNow()}</p>
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