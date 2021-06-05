import React, { Component } from 'react'

import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Swal from "sweetalert2";
import Volver from '../util/Volver'

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

import { createProceso, getProceso, editProceso } from "../../store/actions/procesoActions";
import { bText } from "../../config/language";

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

		const id = this.props.match.params.id

		const proceso = {
			proceso: this.state.proceso,
			preguntas: this.state.preguntas.map((pre) => {
				return pre.id;
			}),
			minCategory: Math.max(
				...this.state.preguntas.map((pre) => {
					return pre.category;
				})
			),
		}
		
		if (!id) {
			this.props.createProceso(proceso)
		} else {
			this.props.editProceso(id, proceso)
		}

		this.props.history.push("/procesos");
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleChangeSelectProceso = (e) => {
		this.setState({
			proceso: e.target.value,
		});
	};

	handleChangeAutocomplete = (e, newValue) => {
		this.setState({
			valueB: newValue,
		});
	};

	handleChangeSelectUrgencia = (e) => {
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
		this.props.history.push("/procesos");
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
		const isBlank = this.state.proceso === "";
		return !(this.state.preguntas && (this.state.preguntas.length >= 5) && (this.state.preguntas.length <= 15) && !isBlank);
	}

	handleCloseSave = (e) => {

		this.setState((prevState) => ({
			openB: false,
			preguntas: [...new Set([...prevState.preguntas, this.state.valueB])],
			valueB: "",
		}));

	};

	Seguro = (e) => {

		const { lang } = this.props

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

	componentDidMount() {
		const id = this.props.match.params.id
		
		if (!id) return null;

		this.props.getProceso(id).then((res) => {
			this.setState({
				preguntas: res.preguntas.map(id => {
					return this.props.preguntas.find(pre => pre.id === id)
				}),
				proceso: res.proceso,
			})
		})
	}

    render() {

		const { auth, userLevel, lang } = this.props;

		const layerName = ["Admin", "D", "C", "B", "A"]

		if (!auth.uid) return <Redirect to="/signin" />;

		if (!lang) return null;

		if (userLevel !== 0) return <Redirect to="/" />;

		return (
			<div className="">
				<div className="padre-titulo mobile">
					<div className="titulo destroy-on-mobile">
						<Volver where="/procesos"/>
					</div>
					<div className="titulo">
						<h2 className="">
							{!this.props.match.params.id ? bText[lang].area_proceso.crear : bText[lang].area_proceso.editar} {bText[lang].area_proceso.proceso}
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
										value={this.state.proceso}
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

												<div className="nueva-pregunta-layer">
													{layerName[pregunta.category]}
												</div>

												<div
													className="nueva-pregunta-delete hover-cursor"
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
								<Button onClick={this.handleCloseSave} disabled={this.state.valueB === ""} color="primary">
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
					<button className="add-question" onClick={this.handleClickOpen}>{bText[lang].area_proceso.agregar_pregunta}</button>
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
								{bText[lang].area_proceso.crear_proceso}
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
		getProceso: (id) => dispatch(getProceso(id)),
		editProceso: (id, proceso) => dispatch(editProceso(id, proceso)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "procesos" }, { collection: "preguntas" }])
)(Proceso);