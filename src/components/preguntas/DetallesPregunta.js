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

    const count = {
        yes: 0,
        no: 0
    }

    pregunta.respuestas.forEach(res => {
        if (res.respuesta === "Sí") {
            count.yes += 1;
        } else if (res.respuesta === "No") {
            count.no += 1;
        }
    });
    // const pregunta = {}
    // const preguntaRespuestas = [] //Array de diccionarios
    console.log("count:", count)
    // { console.log("login pregunta --> DePre", pregunta) }
    if (pregunta) {
        return (
            <div className="container">
                <div className="card-content card x-depth-0 grey-text text-darken-3 main-container">
                    <div className="container card-cont">
                            <span className="card-title">{pregunta.english}</span>
                            <p>Descripción: {pregunta.description}</p>
                            <p>Categoría: {pregunta.category}</p>
                            <p>Plan de reacción: {pregunta.reaction_plan}</p>
                            <p>Creado por: {pregunta.createdBy}</p>
                            <p>Creado: {moment(pregunta.createdAt.toDate()).fromNow()}</p>
                    </div>
                    <div className="graph">
                        <PreguntaGrafica count={count} />
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

const mapStateToProps = (state) => {
    // const id = ownProps.match.params.id;
    // const preguntas = state.firestore.data.preguntas;
    // const pregunta = preguntas ? preguntas[id] : null;
    return {
        // pregunta: pregunta,
        auth: state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "preguntas" }
    ])
)(DetallesPregunta)