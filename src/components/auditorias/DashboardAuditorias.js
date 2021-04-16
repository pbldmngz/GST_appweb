import React, { Component } from 'react'
import Auditorias from './Auditorias'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router'
// CSS class "container" centers content

class DashboardAuditorias extends Component {
    render() {
        const { auditorias, respuestas, auth, userLevel } = this.props

        if (!auth.uid) return <Redirect to="/signin"/>
        // if (userLevel != 0) return <Redirect to="/" />
        console.log("userLevel: ", userLevel)
        console.log("respuestas", respuestas)


        // ---> Con esto los usuarios no ven las que ya respondieron <---
        // Se podría mejorar mandando un prop de que ya está resuelta
        // hacia la tarjeta, pero se me hace mucha bronca porque luego se tendrían
        // Que mandar al fondo. En todo caso puedo hacer una vista de auditorias YA HECHAS
        var filteredAuditorias = auditorias;

        if (userLevel != 0 && respuestas) {
            // console.log("0", respuestas, auth.uid)
            const filtRespuestas = respuestas.filter(res => auth.uid == res.answeredById)

            // console.log("1", filtRespuestas)

            var filtID = {}
            for (let fA in filtRespuestas){
                console.log("fA", filtRespuestas[fA])
                filtID[filtRespuestas[fA].auditoria] = true
            }
            
            // console.log("2", filtID)

            const alreadyDone = Object.keys(filtID)

            // console.log("3", alreadyDone)

            filteredAuditorias = auditorias.filter(aud => !alreadyDone.includes(aud.id))
        }

        if (filteredAuditorias) {
            return (
                <div className="dashboard container">
                    <Auditorias auditorias={filteredAuditorias} userLevel={userLevel} />
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
        auditorias: state.firestore.ordered.auditorias,
        respuestas: state.firestore.ordered.respuestas,
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "auditorias", orderBy: ["fecha_fin", "asc"]}, {collection:"respuestas"}])
)(DashboardAuditorias)
