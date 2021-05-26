import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import TarjetaAgregarAuditoria from '../auditorias/TarjetaAgregarAuditoria'
import Volver from '../util/Volver'


class DashboardAreas extends Component {
    render() {

        const {areas, userLevel, lang, auth} = this.props

        const bText = require("../../config/language");

        if (!auth.uid) return <Redirect to="signin"/>

        if (userLevel !== 0) return <Redirect to="/"/>

        if (!lang) return null;

        // console.log(this.props.match.params.proceso)

        const procesoFilt = this.props.match.params.proceso

        const avalAreas = (areas && procesoFilt) ? [...areas].filter(a => a.proceso === procesoFilt) : [...areas]

        const whereToGo = (procesoFilt) ? "/procesos" : "/profile";

        // console.log(this.props.match.url)
        const createWProps = (procesoFilt) ? ("/crear-area-props/" + procesoFilt): ("/crear-area");

        return (
            <div className="padre-padre-titulo">
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                        <Volver where={whereToGo}/>
                    </div>
                    <div className="titulo">
                        <h2>{bText[lang].area_proceso.areas}</h2>
                    </div>
                </div>
                <div className="arroz-chino">
                    <TarjetaAgregarAuditoria where={createWProps}/>
                    {avalAreas && avalAreas.map(area => {
                        return (
                            <Link 
                                to={"/auditorias/" + (procesoFilt ? procesoFilt + "/": " /") + area.id}
                                className="tarjeta-auditoría center-box"
                                key={area.id}
                            >
                                {area.area}
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
		// procesos: state.firestore.ordered.procesos,
        areas: state.firestore.ordered.areas,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "areas" }])
)(DashboardAreas);