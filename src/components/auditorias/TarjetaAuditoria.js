import {
	deleteAuditoria,
	editAuditoria,
} from "../../store/actions/auditoriaActions";

import React, { Component } from "react";
import moment from "moment/min/moment-with-locales";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

import { faTrashAlt, faEdit, faChartBar, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { bText } from "../../config/language";
import { directions } from "../../config/config"

import QRCode from 'qrcode.react';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class TarjetaAuditoria extends Component {

	state = {
		open: false,
	}

	handleClickOpen = () => {
		this.setState({
			open: true,
		})
	};

	handleClose = () => {
		this.setState({
			open: false,
		})
	};

	render() {

		var { path } = directions

		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};

		const { auditoria, userLevel, alreadyDone, lang, users, areas, procesos } = this.props;

		if (!lang) return null;
		if (!users) return null;
		if (!areas) return null;
		if (!procesos) return null;

		var color = "white";
		var text = "";

		const findUser = [...auditoria.auditor].map(u => {
			return users.find(e => e.id === u)
		})

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

		var style = {};

		if (alreadyDone) {
			color = "grey";
			text = "D";
			style = { backgroundColor: "#D5D8DC" };
		}

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
			(userLevel === 0) ? (
				<div className="button-group">
					{graphOrWarn}
					<div className="boton extra-margin-botones" onClick={this.handleClickOpen}>
						<FontAwesomeIcon icon={faQrcode} />
					</div>
					<Link to={path.crear_auditoria + "/" + auditoria.id}>
						<div className="boton extra-margin-botones">
							<FontAwesomeIcon icon={faEdit} />
						</div>
					</Link>
					<div
						className="boton extra-margin-botones"
						onClick={() => {
							Swal.fire({
								title: bText[lang].swal.title,
								showDenyButton: true,
								showConfirmButton: true,
								denyButtonText: bText[lang].swal.cancel,
								confirmButtonText: bText[lang].swal.save,
							}).then((result) => {
								if (result.isConfirmed) {
									this.props.deleteAuditoria(auditoria.id);
									Swal.fire(bText[lang].swal.saved, "", "success");
								} else if (result.isDenied) {
									Swal.fire(bText[lang].swal.not_saved, "", "info");
								}
							});
						}}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
				</div>
			) : graphOrWarn;

		moment.locale(bText[lang].locale);

		const date = auditoria.fecha_fin ? (
			<p className="grey-text">
				{bText[lang].auditorias.tarjetaAuditoria.fecha_limite}:{" "}
				{moment(auditoria.fecha_fin.toDate()).fromNow()}
			</p>
		) : null;
		
		

		const content = (
			<div className="">
				<div className="">
					<span className="">
						{auditoria.auditoria.length > 18
							? auditoria.auditoria.substr(0, 18) + "..."
							: auditoria.auditoria}
					</span>
				</div>

				{(userLevel === 0) ? (
					<div>
						{ bText[lang].auditorias.tarjetaAuditoria.auditor}: { findUser && findUser.map(u => {
							return u ? (u.firstName[0] + ". " + u.lastName) : "";
						}).join(" & ")}
					</div>
				) : null}

				{(userLevel !== 0) ? (
					findArea && findProceso ? findProceso.proceso + ", " + findArea.area : null
				) : (
					<p>{findArea && findProceso ? findProceso.proceso + ", " + findArea.area : null}</p>
				)}

				{date}

				{(userLevel !== 0) ? (
					<p>{bText[lang].auditorias.tarjetaAuditoria.assignedBy}: {auditoria.createdBy}, {moment(auditoria.createdAt.toDate()).fromNow()}</p>
				) : null}

			</div>
		);

		const dialog = (
			<Dialog
				open={this.state.open}
				TransitionComponent={Transition}
				onClose={this.handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogContent className="center-box">

					<QRCode value={auditoria.password} size={256}/>

				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">
						{bText[lang].aceptar}
					</Button>
				</DialogActions>
			</Dialog>
		)

		const contentParent = (userLevel === 0) ? (
			<div style={style} className="tarjeta-auditoría">
				<div className="tarjeta-auditoría-half1">
					{content}
				</div>
				<div className="tarjeta-auditoría-half2">
					{botones}
				</div>
				{dialog}
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
				{dialog}
			</Link>
		);

		return contentParent;
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.firebase.profile.lang,
		areas: state.firestore.ordered.areas,
		procesos: state.firestore.ordered.procesos,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		deleteAuditoria: (id) => dispatch(deleteAuditoria(id)),
		editAuditoria: (id, pregunta) => dispatch(editAuditoria(id, pregunta)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "areas" }, { collection: "procesos" }])
)(TarjetaAuditoria);