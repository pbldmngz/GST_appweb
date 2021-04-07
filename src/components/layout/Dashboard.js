import React, { Component } from 'react'
import Auditorias from '../auditorias/Auditorias'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router'
// CSS class "container" centers content

class Dashboard extends Component {
    render() {
        const { auditorias, auth } = this.props

        if (!auth.uid) return <Redirect to="/signin"/>
        return (
            <div className="dashboard container">
                <Auditorias auditorias={auditorias}/>
            </div>
        )
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
    firestoreConnect([{collection: "auditorias"}])
)(Dashboard)
