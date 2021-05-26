import React, { Component } from "react";
import moment from "moment/min/moment-with-locales";
import { connect } from "react-redux";
import {
	deleteAuditoria,
	editAuditoria,
} from "../../store/actions/auditoriaActions";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import PopUp from "../util/PopUp";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { faTrashAlt, faEdit, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TarjetaAuditoria extends Component {
	render() {
		var { path, pathName } = require("../../config/config");

		// console.log("Those are props", props)
		// Si las tarjetas no tienen las mismas "líneas" de contenido
		// se rompe la tabla
		// Para arreglar esto se limitó el límite de carácteres para el título,
		// quizás sea necesario para el resto de atributos

		// Se tienen que añadir:
		// - Función que regrese un botón de color y texto correspondiente al tiempo que falte
		// - Añadir botones para borrar/editar una auditoría, con un "¿estás seguro?"

		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};

		const { auditoria, userLevel, alreadyDone, lang, users, areas, procesos } = this.props;

		// console.log(lang, users, areas, procesos)
		if (!lang) return null;
		if (!users) return null;
		if (!areas) return null;
		if (!procesos) return null;
		// console.log(users)

		const bText = require("../../config/language");
		// if (!lang) return null;

		var color = "white";
		var text = "";

		// console.log([...users])

		const findUser = [...auditoria.auditor].map(u => {
			// console.log("This is U: ", u)
			// console.log("This is users: ", users)
			return users.find(e => e.id === u)
		})
		// console.log("This is what findUsers returns: ", findUser)

		const findArea = areas.find(e => e.id === auditoria.area)
		const findProceso = procesos.find(e => e.id === auditoria.proceso)

		if (findArea) {
			switch (findArea.urgencia) {
				case 0:
					color = "#009900";
					text = "R";
					break;
				case 1:
					color = "#FFCC00";
					text = "M";
					break;
				case 2:
					color = "#FF9900";
					text = "!";
					break;
				case 3:
					color = "#C00000";
					text = "!!";
					break;
				default:
					break;
			}
		}

		var checkDate = new Date();
		var fecha_fin = auditoria.fecha_fin.toDate().addDays(0);

		var style = {};

		if (alreadyDone) {
			color = "grey";
			text = "D";
			style = { backgroundColor: "#D5D8DC" };
		}
		// <div className="a"></div>
		const refLink =
			userLevel === 0
				? path.detalles_preguntas_auditoria
				: path.responder_auditoria;

		const graphOrWarn =
			userLevel === 0 ? (
				<div className="boton extra-margin-botones">
					<Link to={path.detalles_preguntas_auditoria + "/" + auditoria.id}>
						<FontAwesomeIcon icon={faChartBar} />
					</Link>
					
				</div>
			) : (
				<div
					style={{ backgroundColor: color, color: "white" }}
					className="suavizar-borde center-box"
				>
					{text}
					
				</div>
			);

		const botones =
			userLevel == 0 ? (
				<div className="button-group">
					{graphOrWarn}
					<Link to={path.crear_auditoria + "/" + auditoria.id}>
						<div className="boton extra-margin-botones">
							<FontAwesomeIcon icon={faEdit} />
						</div>
					</Link>
					<div
						className="boton extra-margin-botones"
						onClick={() => {
							/*<PopUp></PopUp>
								  this.props.deleteAuditoria(auditoria.id)*/
							Swal.fire({
								title: "Do you want to save the changes?",
								showDenyButton: true,
								showCancelButton: false,
								denyButtonText: "Don't save",
								confirmButtonText: "Save",
							}).then((result) => {
								//  Read more about isConfirmed, isDenied below
								if (result.isConfirmed) {
									this.props.deleteAuditoria(auditoria.id);
									Swal.fire("Saved!", "", "success");
								} else if (result.isDenied) {
									Swal.fire("Changes are not saved", "", "info");
								}
							});
							//props.deletePregunta(pregunta.id)
						}}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
				</div>
			) : graphOrWarn;

		moment.locale(bText[lang].locale);
		// console.log(moment.locale("es"))
		const date = auditoria.fecha_fin ? (
			<p className="grey-text">
				{bText[lang].auditorias.tarjetaAuditoria.fecha_limite}:{" "}
				{moment(auditoria.fecha_fin.toDate()).fromNow()}
			</p>
		) : null;
		
		

		const content = (
			<div className="">
				{/* {console.log(audit.auditoria.length)} */}
				<div className="">
					{/* card-title */}
					<span className="">
						{auditoria.auditoria.length > 18
							? auditoria.auditoria.substr(0, 18) + "..."
							: auditoria.auditoria}
					</span>

				</div>

				{bText[lang].auditorias.tarjetaAuditoria.auditor}: {findUser && findUser.map(u => {
					return u ? (u.firstName[0] + ". " + u.lastName) : "";
				}).join(" & ")}
				
				<p>{findArea && findProceso ? findProceso.proceso + ", " + findArea.area : null}</p>

				{date}
			</div>
		);

		const linked = alreadyDone ? (
			content
		) : (
			<Link to={refLink + "/" + auditoria.id}>{content}</Link>
		);


		const contentParent = (userLevel === 0) ? (
			<div style={style} className="tarjeta-auditoría">
				<div className="tarjeta-auditoría-half1">
					{content}
					{/* <p>{findArea && findProceso ? findProceso.proceso + ", " + findArea.area : null}</p> */}
					<p>{bText[lang].auditorias.tarjetaAuditoria.password}: {auditoria.password}</p>
					{/* <p>CreatedAt: {moment(auditoria.createdAt.toDate()).fromNow()}</p> */}
					
				</div>
				<div className="tarjeta-auditoría-half2">
					{botones}
				</div>
			</div>
		) : (
			<Link 
				className="tarjeta-auditoría"
				style={style}
				to={path.responder_auditoria + "/" + auditoria.id}
			>
				<div className="tarjeta-auditoría-half1">
					{content}
				</div>
				<div className="tarjeta-auditoría-half2">
					{botones}
				</div>
			</Link>
		);

		return contentParent;
	}
}

const mapStateToProps = (state) => {
	// console.log(state)
	return {
		lang: state.firebase.profile.lang,
		areas: state.firestore.ordered.areas,
		procesos: state.firestore.ordered.procesos,
		// users: state.firestore.ordered.users,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		deleteAuditoria: (id) => dispatch(deleteAuditoria(id)),
		editAuditoria: (id, pregunta) => dispatch(editAuditoria(id, pregunta)),
	};
};

// export default connect(mapStateToProps, mapDispatchtoProps)(TarjetaAuditoria)

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "areas" }, { collection: "procesos" }])
)(TarjetaAuditoria);