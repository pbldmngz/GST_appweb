import React, { Component } from 'react'
import Preguntas from '../preguntas/Preguntas'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router'
// CSS class "container" centers content

// Para cuando se esté creado una auditoría debería 
// crear un componente para buscar la pregunta por texto

// Por algún motivo, al hacer click en una pregunta 
// no me lleva al componente específico pero si cambia el link

class DashboardPreguntas extends Component {
    render() {
        const { preguntas, auth } = this.props

        if (!auth.uid) return <Redirect to="/signin" />

        if (preguntas){
            return (
                <div className="dashboard container">
                    <Preguntas preguntas={preguntas} />
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
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        preguntas: state.firestore.ordered.preguntas,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "preguntas", orderBy: ["createdAt", "desc"] }])
)(DashboardPreguntas)
