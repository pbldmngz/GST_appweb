import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import TarjetaAgregarAuditoria from '../auditorias/TarjetaAgregarAuditoria'
import Volver from '../util/Volver'


class DashboardProcesos extends Component {
    render() {

        const {procesos, userLevel, lang, auth} = this.props

        if (!auth.uid) return <Redirect to="signin"/>

        if (userLevel !== 0) return <Redirect to="/"/>

        if (!lang) return null;

        return (
            <div className="padre-padre-titulo">
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                        <Volver where="/profile"/>
                    </div>
                    <div className="titulo">
                        <h2>Procesos##</h2>
                    </div>
                </div>
                <div className="arroz-chino">
                    <TarjetaAgregarAuditoria where="/crear-proceso"/>
                    {procesos && procesos.map(pro => {
                        return (
                            <Link 
                                to={"/crear-proceso/" + pro.id} 
                                className="tarjeta-auditoría center-box"
                                key={pro.id}
                            >
                                {pro.proceso.toUpperCase()}
                            </Link>
                        )
                    })}
                </div>
            </div>
    )
    }
}


const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		userLevel: state.firebase.profile.userLevel,
		lang: state.firebase.profile.lang,
		procesos: state.firestore.ordered.procesos,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "procesos" }])
)(DashboardProcesos);