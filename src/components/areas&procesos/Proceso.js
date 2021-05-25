import React, { Component } from 'react'

import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slide from "@material-ui/core/Slide";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


import { createProceso } from "../../store/actions/procesoActions";
// import { createArea } from "../../store/actions/areaActions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class Proceso extends Component {

    state = {
		proceso: "",
		preguntas: [],
		openB: false,
		valueB: "",
	};

	handleCancel = () => {
		this.props.history.push("/profile");
	};

	handleSubmit = (e) => {
		e.preventDefault();

		// console.log("Pasa por es submit", this.state)

		this.props.createProceso({
			proceso: this.state.proceso,
			// Hacer lo mismo que en crear auditorias
			preguntas: this.state.preguntas.map((pre) => {
				return pre.id;
			}),
			minCategory: Math.max(
				...this.state.preguntas.map((pre) => {
					return pre.category;
				})
			),
		})
		

		this.props.history.push("/profile"); //Esto se cambiará según el contexto
	};

	handleChange = (e) => {
		// console.log("This is E", e)
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleChangeSelectProceso = (e) => {
		// console.log("This is E", e)
		this.setState({
			proceso: e.target.value,
		});
	};

	handleChangeAutocomplete = (e, newValue) => {
		// console.log("This is E and nV", e, newValue)
		//Tengo que conseguir el ID
		this.setState({
			valueB: newValue,
		});
	};

	handleChangeSelectUrgencia = (e) => {
		// console.log("This is E", e)
		this.setState({
			urgencia: e.target.value,
		});
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

	cantSend = () => {
		return !(this.state.preguntas && (this.state.preguntas.length >= 5) && (this.state.preguntas.length <= 15));
	}

	handleCloseSave = (e) => {
		// console.log("Y aquí debo de sacar una forma de registrar una pregunta nueva", e)
		this.setState((prevState) => ({
			openB: false,
			preguntas: [...new Set([...prevState.preguntas, this.state.valueB])],
		}));
	};

	Seguro = (e) => {
		if (this.cantSend()) return null;
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

    render() {
		var { path, pathName } = require("../../config/config");
		const bText = require("../../config/language");
		const { auth, userLevel, lang, procesos } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		if (!lang) return null;

		if (userLevel != 0) return <Redirect to="/" />;

		// console.log(this.props)
		return (
			<div className="">
				<div className="padre-titulo mobile">
					<div className="titulo destroy-on-mobile">
						<Volver where="/profile"/>
					</div>
					<div className="titulo">
						<h2 className="">
							{/* {text[lang].auditorias.crearAuditoria.crear_auditoria} */}
							{bText[lang].area_proceso.crear} {bText[lang].area_proceso.proceso}
						</h2>
					</div>
				</div>
				
                <div className="form-1">
                    <div className="">
                        <form className="" onSubmit={this.Seguro}>
                            
                            <div className="form-2">
                                <div className="input-field">
                                    <input
                                        type="text"
                                        id="proceso"
                                        placeholder={bText[lang].area_proceso.Proceso}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
				
				<div className="">
					<div className="">
						<div className="margin-bottom">
							{this.state.preguntas &&
								this.state.preguntas.map((pregunta, index) => {
									return (
										<div className="form-1 overwrite-margin" key={index}>
											<div className="nueva-pregunta">
												<div className="nueva-pregunta-index">
													{index + 1}.
												</div>

												<div className="nueva-pregunta-main">
													{pregunta[lang]}
												</div>

												<div
													className="nueva-pregunta-delete"
													onClick={() => {
														this.handleDelete(pregunta.id);
													}}
												>
													<FontAwesomeIcon icon={faTrashAlt} />
												</div>
											</div>
										</div>
									);
								})}
						</div>
						
						<Dialog
							open={this.state.openB}
							onClose={this.handleClose}
							aria-labelledby="form-dialog-title"
							TransitionComponent={Transition}
						>
							<DialogTitle id="form-dialog-title">
								{bText[lang].auditorias.crearAuditoria.seleccionar_pregunta}
							</DialogTitle>
							<DialogContent>
								<DialogContentText>
									{bText[lang].auditorias.crearAuditoria.text1}
									<Link
										to="/crear-pregunta"
										target="_blank"
										rel="noopener noreferrer"
										className="red-text"
									>
										{bText[lang].auditorias.crearAuditoria.text2}
									</Link>
									{bText[lang].auditorias.crearAuditoria.text3}
								</DialogContentText>
								<Autocomplete
									id="valueB"
									name="valueB"
									options={this.props.preguntas}
									onChange={this.handleChangeAutocomplete}
									getOptionLabel={(option) => option[lang]}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Preguntas"
											variant="outlined"
										/>
									)}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={this.handleCloseSave} color="primary">
									{bText[lang].auditorias.crearAuditoria.agregar}
								</Button>
								<Button onClick={this.handleClose} color="secondary">
									{bText[lang].auditorias.crearAuditoria.cancelar}
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</div>


				<div className="footer-single">
					<button className="add-question" onClick={this.handleClickOpen}>Agregar pregunta##</button>
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
		procesos: state.firestore.ordered.procesos,
		preguntas: state.firestore.ordered.preguntas,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		createProceso: (proceso) => dispatch(createProceso(proceso)),
		// createArea: (area) => dispatch(createArea(area)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "procesos" }, { collection: "preguntas" }])
)(Proceso);

// export default connect(mapStateToProps, mapDispatchtoProps)(AreaProceso)