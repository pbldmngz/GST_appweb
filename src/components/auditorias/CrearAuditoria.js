import React, { Component } from "react";

import {
	createAuditoria,
	editAuditoria,
	getAuditoria,
} from "../../store/actions/auditoriaActions";

import { connect } from "react-redux";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import "react-datepicker/dist/react-datepicker.css";

import DatepickerInput from '../util/DatepickerInput'

import { bText } from "../../config/language";


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

		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleChangeAutocomplete = (e, newValue) => {

		this.setState({
			valueB: newValue,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const id = this.props.match.params.id;

		var toSend = {
			auditoria: this.state.auditoria,
			auditor: this.state.auditor.filter(a => a !== ""),
			area: this.state.area,
			proceso: this.state.proceso,
			fecha_inicio: this.state.fecha_inicio,
			fecha_fin: this.state.fecha_fin,
			preguntas: this.props.procesos.find(p => p.id === this.state.proceso).preguntas,
		}

		if (!id) {
			var generator = require('generate-password');

			var password = generator.generate({
				length: 8,
				numbers: true,
				uppercase: false,
				lowercase: false,
			});

			toSend.password = password
			this.props.createAuditoria(toSend);
		} else {
			toSend.password = this.state.password;

			this.props.editAuditoria(id, toSend);
		}

		const whereToGo = (this.props.match.params.proceso) ? ("/auditorias/" + this.props.match.params.proceso + "/" + this.props.match.params.area) : "/";
		
		this.props.history.push(whereToGo);
	};

	handleClickOpen = () => {
		this.setState({
			openB: true,
		});
	};
	handleCancel = () => {
		const whereToGo = (this.props.match.params.proceso) ? ("/auditorias/" + this.props.match.params.proceso + "/" + this.props.match.params.area) : "/";

		this.props.history.push(whereToGo);
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
		this.setState((prevState) => ({
			openB: false,
			preguntas: [...new Set([...prevState.preguntas, this.state.valueB])],
		}));
	};
	Seguro = (e) => {
		const {lang} = this.props
		if (this.cantSend()) return null;
		e.preventDefault();
		Swal.fire({
			title: bText[lang].swal.title,
			showDenyButton: true,
			showConfirmButton: true,
			denyButtonText: bText[lang].swal.cancel,
			confirmButtonText: bText[lang].swal.save,
		}).then((result) => {
			//  Read more about isConfirmed, isDenied below
			if (result.isConfirmed) {
				this.handleSubmit(e);
				Swal.fire(bText[lang].swal.saved, "", "success");
			} else if (result.isDenied) {
				Swal.fire(bText[lang].swal.not_saved, "", "info");
			}
		});
	};

	handleChangeSelectProceso = (e) => {
		this.setState({
			proceso: e.target.value,
		});
	};

	handleChangeSelectArea = (e) => {
		this.setState({
			area: e.target.value,
		});
	};

	handleChangeSelectAuditor = (e) => {
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
		return !((this.state.area !== "") && (this.state.proceso !== "") && (this.state.auditor.filter(a => a !== "").length))
	}

	componentDidMount() {

		if (this.props.match.params.proceso && this.props.match.params.proceso !== " ") {
			this.setState({
				proceso: this.props.match.params.proceso,
				area: this.props.match.params.area,
			})
		} else if (this.props.match.params.area) {
			this.setState({
				area: this.props.match.params.area,
			})
		}

		const id = this.props.match.params.id;

		if (id) {
			this.props.getAuditoria(id).then((res) => {
				this.setState({
					auditoria: res.auditoria,
					auditor: res.auditor,
					area: res.area,
					proceso: res.proceso,
					fecha_inicio: res.fecha_inicio.toDate(),
					fecha_fin: res.fecha_fin.toDate(),
					preguntas: res.preguntas.map((pre) => {
						return this.props.preguntas.filter((fil) => fil.id === pre)[0];
					}),
					password: res.password,
				});
			});
		}
	}

	render() {
		const { auth, userLevel, lang, procesos, areas, users } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		if (!lang) return null;

		if (userLevel !== 0) return <Redirect to="/" />;

		if (!users) return null;
		
		const filtUsers = this.sortByKey([...users], "lastName").filter(u => u.userLevel !== 0)

		const temp1 = [...areas].find(a => a.id === this.state.area)

		var auditorCount = ((this.state.area !== "" && areas) && [...areas].map((ar) => { return ar.id }).includes(this.state.area)) ? (temp1 ? temp1.urgencia : 0) : 0;

		switch (auditorCount) {
			case 0:
				auditorCount = [3, 4];
				break;
			case 1:
				auditorCount = [2, 3, 4];
				break;
			case 2:
				auditorCount = [1, 2, 3, 4];
				break;
			case 3:
				auditorCount = [1, 2, 3, 4];
				break;
			default:
				auditorCount = [3, 4];
				break;
		}

		const layerName = ["Admin", "D", "C", "B", "A"]

		const whereToGo = (this.props.match.params.proceso) ? ("/auditorias/" + this.props.match.params.proceso + "/" + this.props.match.params.area) : "/";

		return (
			<div className="">
				<div className="padre-titulo mobile">
					<div className="titulo destroy-on-mobile">
						<Volver where={whereToGo}/>
					</div>
					<div className="titulo">
						<h2 className="">
							{bText[lang].auditorias.crearAuditoria.crear_auditoria}
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
											className="this-is-also-input"
											displayEmpty
											disableUnderline
										>
											<MenuItem value="" disabled>
												<div className="placeholder-color">
													{bText[lang].auditorias.crearAuditoria.proceso}
												</div>
											</MenuItem>
											{procesos && this.sortByKey([...procesos], "proceso").map(p => {
												return <MenuItem className="text-color" key={p.id} value={p.id}>{p.proceso}</MenuItem>
											})}
										</Select>
									</div>


									<div className="limit-width">
										<Select
											labelId="select-filter"
											id="area"
											value={this.state.area ? this.state.area : ""}
											onChange={this.handleChangeSelectArea}
											className="this-is-also-input"
											displayEmpty
											disableUnderline
											disabled={this.state.proceso === ""}
										>
											<MenuItem value="" disabled>
												<div className="placeholder-color">
													{bText[lang].auditorias.crearAuditoria.area}
												</div>
											</MenuItem>
											{areas && this.sortByKey([...areas], "area").filter(a => a.proceso === this.state.proceso).map(a => {
												return <MenuItem className="text-color" key={a.id} value={a.id}>{a.area}</MenuItem>
											})}
										</Select>
									</div>

									{this.state.area !== "" ? (
										auditorCount && auditorCount.map(layer => {
											return (<div key={layer} className="limit-width">

														<Select
															labelId="select-filter"
															name={"auditor" + layer.toString()}
															value={this.state.auditor[layer - 1] ? this.state.auditor[layer - 1]: ""}
															onChange={this.handleChangeSelectAuditor}
															className="this-is-also-input"
															displayEmpty
															disableUnderline
														>
															<MenuItem value="" disabled>
																<div className="placeholder-color">
																	{bText[lang].auditorias.crearAuditoria.auditor} - {layerName[layer]}
																</div>
															</MenuItem>
															{filtUsers && filtUsers.filter(u => u.userLevel === layer).map(a => {
																return <MenuItem className="text-color" key={a.id} value={a.id}>{a.lastName}, {a.firstName}</MenuItem>
															})}
														</Select>
													</div>)
										})
									) : (null)}
									
									<div className="date-container">

										<span className="fecha">
											{bText[lang].auditorias.crearAuditoria.inicia_el}
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
											{bText[lang].auditorias.crearAuditoria.termina_el}
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
								{bText[lang].auditorias.crearAuditoria.cancelar}
							</button>
						</div>
						<div className="center-box">
							<button className="aceptar" onClick={this.Seguro}>
								{bText[lang].auditorias.crearAuditoria.crear}
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
		editAuditoria: (id, auditoria) => dispatch(editAuditoria(id, auditoria)),
		getAuditoria: (id) => dispatch(getAuditoria(id)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "preguntas" }, { collection: "areas" }, { collection: "procesos" }, { collection: "users" }])
)(CrearAuditoria);
