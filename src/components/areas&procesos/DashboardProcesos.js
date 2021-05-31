import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import TarjetaAgregarAuditoria from '../auditorias/TarjetaAgregarAuditoria'
import Volver from '../util/Volver'

import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import { deleteProceso } from "../../store/actions/procesoActions";

import { bText } from "../../config/language";


class DashboardProcesos extends Component {

    render() {

        const {procesos, userLevel, lang, auth} = this.props

        // const bText = require("../../config/language");

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
                        <h2>{bText[lang].area_proceso.procesos}</h2>
                    </div>
                </div>
                <div className="arroz-chino">
                    <TarjetaAgregarAuditoria where="/crear-proceso"/>
                    {procesos && procesos.map(pro => {
                        return (
                            <div
                                className="tarjeta-auditoría"
                                key={pro.id}
                            >
                                <Link to={"/areas/" + pro.id}  className="tarjeta-proceso-half1">
                                    {pro.proceso.toUpperCase()}
                                </Link>
                                <div className="tarjeta-auditoría-half2">
                                    <Link to={"/crear-proceso/" + pro.id} className="button">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <div className="button hover-cursor" onClick={() => {
                                        Swal.fire({
                                            title: bText[lang].swal.title,
                                            showDenyButton: true,
                                            showConfirmButton: true,
                                            denyButtonText: bText[lang].swal.cancel,
                                            confirmButtonText: bText[lang].swal.save,
                                        }).then((result) => {
                                            //  Read more about isConfirmed, isDenied below
                                            if (result.isConfirmed) {
                                                this.props.deleteProceso(pro.id);
                                                Swal.fire(bText[lang].swal.saved, "", "success");
                                            } else if (result.isDenied) {
                                                Swal.fire(bText[lang].swal.not_saved, "", "info");
                                            }
                                        });
                                        //props.deletePregunta(pregunta.id)
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
		procesos: state.firestore.ordered.procesos,
	};
};

const mapDispatchtoProps = (dispatch) => {
    return {
        deleteProceso: (id) => dispatch(deleteProceso(id)),
    };
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "procesos" }])
)(DashboardProcesos);