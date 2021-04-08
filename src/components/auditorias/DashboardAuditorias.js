import React, { Component } from 'react'
import Auditorias from './Auditorias'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router'
// CSS class "container" centers content

class DashboardAuditorias extends Component {
    render() {
        const { auditorias, auth } = this.props

        if (!auth.uid) return <Redirect to="/signin"/>

        if (auditorias) {
            return (
                <div className="dashboard container">
                    <Auditorias auditorias={auditorias} />
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
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "auditorias", orderBy: ["fecha_fin", "asc"]}])
)(DashboardAuditorias)
