import React, { Component } from "react";
import { createPregunta } from "../../store/actions/preguntaActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Swal from "sweetalert2";
import Volver from '../util/Volver'

import { bText } from "../../config/language";


class CrearPregunta extends Component {

	state = {
		category: 4,
		description: "",
		reaction_plan: "",
		english: "",
		spanish: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleChangeSelect = (e) => {
		this.setState({
			category: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.createPregunta(this.state);
		this.props.history.push("/preguntas");
	};

	Seguro = (e) => {

		const { lang } = this.props

		e.preventDefault();
		Swal.fire({
			title: bText[lang].swal.title,
			showDenyButton: true,
			showConfirmButton: true,
			denyButtonText: bText[lang].swal.cancel,
			confirmButtonText: bText[lang].swal.save,
		}).then((result) => {
			if (result.isConfirmed) {
				this.handleSubmit(e);
				Swal.fire(bText[lang].swal.saved, "", "success");
			} else if (result.isDenied) {
				Swal.fire(bText[lang].swal.not_saved, "", "info");
			}
		});
	};

	handleChangeSelectRP = (e) => {
		this.setState({
			reaction_plan: e.target.value,
		});
	};

	render() {

		const { auth, lang } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		if (!lang) return null;

		return (
			<div>
				<div className="padre-titulo mobile">
					<div className="titulo destroy-on-mobile">
						<Volver where="/preguntas"/>
					</div>
					<div className="titulo">
						<h2 className="titulo">
							{bText[lang].preguntas.crearPregunta.crear_pregunta}
						</h2>
					</div>

				</div>
				<div className="form-1">
					<div className="">
						<form className="" onSubmit={this.Seguro}>
							<div className="form-2">
								<div className="input-field">
									<input type="text" id="english" placeholder={bText[lang].preguntas.crearPregunta.crear_pregunta + " [EN]"} onChange={this.handleChange} />
								</div>
								<div className="input-field">
									<input type="text" id="spanish" placeholder={bText[lang].preguntas.crearPregunta.crear_pregunta + " [ES]"} onChange={this.handleChange} />
								</div>
								<div className="input-field">
									<input type="text" id="description" placeholder={bText[lang].preguntas.crearPregunta.descripcion} onChange={this.handleChange} />
								</div>
								<div className="limit-width">
									<Select
										labelId="select-filter"
										id="reaction_plan"
										value={this.state.reaction_plan}
										onChange={this.handleChangeSelectRP}
										className="this-is-also-input"
										displayEmpty
										disableUnderline
									>
										<MenuItem value="" disabled>
											<div className="placeholder-color">
												{bText[lang].preguntas.crearPregunta.plan_reaccion}
											</div>
										</MenuItem>
										
										<MenuItem value={0}>{bText[lang].preguntas.crearPregunta.fix}</MenuItem>
										<MenuItem value={1}>{bText[lang].preguntas.crearPregunta.contramedidas_temporales}</MenuItem>
										<MenuItem value={2}>{bText[lang].preguntas.crearPregunta.parar_produccion}</MenuItem>
									</Select>
								</div>
								<div className="center-box">
									<div className="footer-single-flex">
										<InputLabel id="select-level">
											{bText[lang].preguntas.crearPregunta.categoria}
										</InputLabel>
										<Select
											labelId="select-level"
											id="level"
											value={this.state.category}
											onChange={this.handleChangeSelect}
											style={{width: `${100}px`}}
										>
											<MenuItem value={4}>A</MenuItem>
											<MenuItem value={3}>B</MenuItem>
											<MenuItem value={2}>C</MenuItem>
											<MenuItem value={1}>D</MenuItem>
										</Select>
									</div>
								</div>
								
							</div>
							
						</form>
					</div>
				</div>
				<div className="footer-single">
					<button className="aceptar" onClick={this.Seguro}>
						{bText[lang].preguntas.crearPregunta.crear}
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		lang: state.firebase.profile.lang,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		createPregunta: (pregunta) => dispatch(createPregunta(pregunta)),
	};
};

export default connect(mapStateToProps, mapDispatchtoProps)(CrearPregunta);
