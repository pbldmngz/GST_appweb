import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import TarjetaAgregarAuditoria from '../auditorias/TarjetaAgregarAuditoria'
import Volver from '../util/Volver'

import { faTrashAlt, faEdit, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import { deleteArea } from "../../store/actions/areaActions";


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
                            <div
                                className="tarjeta-auditoría"
                                key={area.id}
                            >
                                <Link to={"/auditorias/" + (procesoFilt ? procesoFilt + "/" : " /") + area.id} className="tarjeta-proceso-half1">
                                    {area.area}
                                </Link>
                                <div className="tarjeta-auditoría-half2">
                                    <Link to={"/crear-area/" + area.id} className="button">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <div className="button hover-cursor" onClick={() => {
                                        Swal.fire({
                                            title: "Do you want to save the changes?",
                                            showDenyButton: true,
                                            showConfirmButton: true,
                                            denyButtonText: "Don't save",
                                            confirmButtonText: "Save",
                                        }).then((result) => {
                                            //  Read more about isConfirmed, isDenied below
                                            if (result.isConfirmed) {
                                                this.props.deleteArea(area.id);
                                                Swal.fire("Saved!", "", "success");
                                            } else if (result.isDenied) {
                                                Swal.fire("Changes are not saved", "", "info");
                                            }
                                        });
                                    }}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </div>
                                </div>
                            </div>
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

const mapDispatchtoProps = (dispatch) => {
    return {
        deleteArea: (id) => dispatch(deleteArea(id)),
    };
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "areas" }])
)(DashboardAreas);