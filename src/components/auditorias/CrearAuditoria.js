import React, { Component, useState } from "react";
import { createAuditoria } from "../../store/actions/auditoriaActions";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slide from "@material-ui/core/Slide";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import DatePicker from 'react-datepicker/dist/react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatepickerInput from '../util/DatepickerInput'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class CrearAuditoria extends Component {
	state = {
		auditoria: "",
		auditor: ["", "", "", ""],
		area: "",
		proceso: "",
		fecha_inicio: new Date(),
		fecha_fin: new Date(),
		preguntas: [],
		openB: false,
		valueB: "",
		password: "",
	};
	handleChange = (e) => {
		// console.log("This is E", e)
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleChangeAutocomplete = (e, newValue) => {
		// console.log("This is E and nV", e, newValue)
		//Tengo que conseguir el ID
		this.setState({
			valueB: newValue,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		var generator = require('generate-password');

		var password = generator.generate({
			length: 8,
			numbers: true,
			uppercase: false,
			lowercase: false,
		});

		// console.log(this.state)
		this.props.createAuditoria({
			auditoria: this.state.auditoria,
			auditor: this.state.auditor.filter(a => a !== ""),
			area: this.state.area,
			proceso: this.state.proceso,
			fecha_inicio: this.state.fecha_inicio,
			fecha_fin: this.state.fecha_fin,
			preguntas: this.props.procesos.find(p => p.id === this.state.proceso).preguntas,
			password: password,
		});

		this.props.history.push("/"); //Esto se cambiará según el contexto
	};

	handleClickOpen = () => {
		this.setState({
			openB: true,
		});
	};
	handleCancel = () => {
		this.props.history.push("/");
	};
	handleDelete = (id) => {
		const newPreguntas = this.state.preguntas.filter(
			(pregunta) => pregunta.id !== id
		);
		this.setState({
			preguntas: newPreguntas,
		});
	};
	handleClose = () => {
		this.setState({
			openB: false,
		});
	};
	handleCloseSave = (e) => {
		// console.log("Y aquí debo de sacar una forma de registrar una pregunta nueva", e)
		this.setState((prevState) => ({
			openB: false,
			preguntas: [...new Set([...prevState.preguntas, this.state.valueB])],
		}));
	};
	Seguro = (e) => {
		// console.log(this.cantSend())
		// if (this.cantSend()) return null;
		// console.log(e)
		e.preventDefault();
		Swal.fire({
			title: "Do you want to save the changes?",
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: "Save",
			denyButtonText: "Don't save",
		}).then((result) => {
			//  Read more about isConfirmed, isDenied below
			if (result.isConfirmed) {
				this.handleSubmit(e);
				Swal.fire("Saved!", "", "success");
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	handleChangeSelectProceso = (e) => {
		// console.log("This is E", e)
		this.setState({
			proceso: e.target.value,
		});
	};

	handleChangeSelectArea = (e) => {
		// console.log("This is E", e)
		this.setState({
			area: e.target.value,
		});
	};

	handleChangeSelectAuditor = (e) => {
		console.log("This is E", e.target)

		var newAuditor = [...this.state.auditor]

		switch (e.target.name) {
			case "auditor1":
				newAuditor[0] = e.target.value;
				break;

			case "auditor2":
				newAuditor[1] = e.target.value;
				break;

			case "auditor3":
				newAuditor[2] = e.target.value;
				break;

			case "auditor4":
				newAuditor[3] = e.target.value;
				break;
			
			default:
				break
		}

		this.setState({
			auditor: newAuditor,
		});
	};

	sortByKey = (array, key) => {
		return array.sort(function (a, b) {
			//Check if they are timestamp


			var x = a[key].toString(); var y = b[key].toString();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	cantSend = () => {
		return !(this.state.preguntas && (this.state.preguntas.length >= 5) && (this.state.preguntas.length <= 15));
	}

	render() {
		var { path, pathName } = require("../../config/config");
		const text = require("../../config/language");
		const { auth, userLevel, lang, procesos, areas, users } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		if (!lang) return null;

		if (userLevel != 0) return <Redirect to="/" />;

		if (!users) return null;

		// console.log("CrearAuditoriaUsers", users)

		const filtUsers = this.sortByKey([...users], "lastName").filter(u => u.userLevel !== 0)

		var auditorCount = (this.state.area !== "") ? ([...areas].find(a => a.id === this.state.area)).urgencia : 0;

		switch (auditorCount) {
			case 2:
				auditorCount = [1, 2, 3];
				break;
			case 3:
				auditorCount = [1, 2, 3, 4];
				break;
			default:
				auditorCount = [1, 2];
				break;
		}

		const layerName = ["Admin", "A", "B", "C", "D"]

		// console.log(this.state.preguntas)
		return (
			<div className="">
				<div className="padre-titulo mobile">
					<div className="titulo destroy-on-mobile">
						<Volver />
					</div>
					<div className="titulo">
						<h2 className="">
							{text[lang].auditorias.crearAuditoria.crear_auditoria}
						</h2>
					</div>
				</div>
				
				<div className="">
					<div className="form-1">
						<div className="">
							<form className="" onSubmit={this.Seguro}>
								
								<div className="form-2">
									
									<div className="limit-width">
										<Select
											labelId="select-filter"
											id="proceso"
											value={this.state.proceso}
											onChange={this.handleChangeSelectProceso}
											// style={{width: `${100}%`}}
											className="this-is-also-input"
											displayEmpty
											disableUnderline
											// placeholder={<p>bText[lang].area_proceso.proceso_corresponde</p>}
										>
											<MenuItem value="" disabled>
												<div className="placeholder-color">
													{text[lang].auditorias.crearAuditoria.proceso}
												</div>
											</MenuItem>
											{procesos && this.sortByKey([...procesos], "proceso").map(p => {
												return <MenuItem className="text-color" key={p.id} value={p.id}>{p.proceso}</MenuItem>
											})}
										</Select>
									</div>


									<div className="limit-width">
										{/* <span className="center-box">
											{bText[lang].area_proceso.proceso_corresponde}
										</span> */}
										<Select
											labelId="select-filter"
											id="area"
											value={this.state.area}
											onChange={this.handleChangeSelectArea}
											// style={{width: `${100}%`}}
											className="this-is-also-input"
											displayEmpty
											disableUnderline
											disabled={this.state.proceso === ""}
											// placeholder={<p>bText[lang].area_proceso.proceso_corresponde</p>}
										>
											<MenuItem value="" disabled>
												<div className="placeholder-color">
													{text[lang].auditorias.crearAuditoria.area}
												</div>
											</MenuItem>
											{areas && this.sortByKey([...areas], "area").filter(a => a.proceso === this.state.proceso).map(a => {
												return <MenuItem className="text-color" key={a.id} value={a.id}>{a.area}</MenuItem>
											})}
										</Select>
									</div>

									{/* {Aquí empieza lo nuevo} */}
									{this.state.area !== "" ? (
										auditorCount && auditorCount.map(layer => {
											return (<div key={layer} className="limit-width">
														{/* {console.log(auditorCount)}
														{} */}
														<Select
															labelId="select-filter"
															name={"auditor" + layer.toString()}
															value={this.state.auditor[layer-1]}
															onChange={this.handleChangeSelectAuditor}
															// style={{width: `${100}%`}}
															className="this-is-also-input"
															displayEmpty
															disableUnderline
															// placeholder={<p>bText[lang].area_proceso.proceso_corresponde</p>}
														>
															<MenuItem value="" disabled>
																<div className="placeholder-color">
																	{text[lang].auditorias.crearAuditoria.auditor} - {layerName[layer]}
																</div>
															</MenuItem>
															{filtUsers && filtUsers.filter(u => u.userLevel === layer).map(a => {
																return <MenuItem className="text-color" key={a.id} value={a.id}>{a.lastName}, {a.firstName}</MenuItem>
															})}
														</Select>
													</div>)
										})
									) : (null)}
									

									{/* {Aquí empieza lo nuevo} */}
									<div className="date-container">

										<span className="fecha">
											{text[lang].auditorias.crearAuditoria.inicia_el}
										</span>
										<div className="datePicker-container">
											<DatePicker
												id="fecha_inicio"
												selected={this.state.fecha_inicio}
												onChange={(date) =>
													this.setState({
														fecha_inicio: date,
													})
												}
												withPortal
												customInput={<DatepickerInput />}
											/>
										</div>

										<span className="fecha">
											{text[lang].auditorias.crearAuditoria.termina_el}
											{/* {console.log(text[lang].auditorias.crearAuditoria.termina_el)} */}
										</span>
										<div className="datePicker-container">
											<DatePicker
												id="fecha_fin"
												selected={this.state.fecha_fin}
												onChange={(date) =>
													this.setState({
														fecha_fin: date,
													})
												}
												withPortal
												customInput={<DatepickerInput />}
											/>
										</div>

									</div>
								</div>
							</form>
						</div>
					</div>

				</div>
				
				<div>

					<div className="footer">
						<div className="center-box">
							<button className="cancelar" onClick={this.handleCancel}>
								{text[lang].auditorias.crearAuditoria.cancelar}
							</button>
						</div>
						<div className="center-box">
							<button className="aceptar" onClick={this.Seguro}>
								{text[lang].auditorias.crearAuditoria.crear}
							</button>
						</div>
					</div>
				</div>



			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		userLevel: state.firebase.profile.userLevel,
		lang: state.firebase.profile.lang,
		preguntas: state.firestore.ordered.preguntas,
		areas: state.firestore.ordered.areas,
		procesos: state.firestore.ordered.procesos,
		users: state.firestore.ordered.users,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "preguntas" }, { collection: "areas" }, { collection: "procesos" }, { collection: "users" }])
)(CrearAuditoria);
