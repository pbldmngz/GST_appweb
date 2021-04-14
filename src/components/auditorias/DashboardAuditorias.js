import React, { Component } from 'react'
import Auditorias from './Auditorias'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router'
// CSS class "container" centers content

class DashboardAuditorias extends Component {
    render() {
        const { auditorias, auth, userLevel } = this.props

        if (!auth.uid) return <Redirect to="/signin"/>
        if (userLevel != 0) return <Redirect to="/" />

        if (auditorias) {
            return (
                <div className="dashboard container">
                    <Auditorias auditorias={auditorias} userLevel={userLevel} />
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
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "auditorias", orderBy: ["fecha_fin", "asc"]}])
)(DashboardAuditorias)
