import React, { Component } from 'react'

import { connect } from "react-redux";
import { Redirect } from "react-router";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { createArea } from "../../store/actions/areaActions";

class Area extends Component {

    state = {
		proceso: "",
		urgencia: "",
	};

	handleCancel = () => {
		this.props.history.push("/profile");
	};

	handleSubmit = (e) => {
		e.preventDefault();
		
		this.props.createArea(this.state)
		
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

	handleChangeSelectUrgencia = (e) => {
		// console.log("This is E", e)
		this.setState({
			urgencia: e.target.value,
		});
	};

	Seguro = (e) => {
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

		// const tipo = this.props.match.params.tipo

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
							{bText[lang].area_proceso.crear} {bText[lang].area_proceso.area}
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
                                        id="area"
                                        placeholder={bText[lang].area_proceso.Area}
                                        onChange={this.handleChange}
                                    />
                                </div>
								
								<div className="limit-width">
									{/* <span className="center-box">
										{bText[lang].area_proceso.proceso_corresponde}
									</span> */}
									<Select
										labelId="select-filter"
										id="urgencia"
										value={this.state.urgencia}
										onChange={this.handleChangeSelectUrgencia}
										// style={{width: `${100}%`}}
										className="this-is-also-input"
										displayEmpty
										disableUnderline
										// placeholder={<p>bText[lang].area_proceso.proceso_corresponde</p>}
									>
										<MenuItem value="" disabled>
											<div className="placeholder-color">
												{bText[lang].area_proceso.urgencia}
											</div>
										</MenuItem>
										
										<MenuItem value={0}>{bText[lang].area_proceso.regular}</MenuItem>
										<MenuItem value={1}>{bText[lang].area_proceso.media}</MenuItem>
										<MenuItem value={2}>{bText[lang].area_proceso.prioridad}</MenuItem>
										<MenuItem value={3}>{bText[lang].area_proceso.alta_prioridad}</MenuItem>
									</Select>
								</div>

								<div className="limit-width">
									{/* <span className="center-box">
										{bText[lang].area_proceso.proceso_corresponde}
									</span> */}
									<Select
										labelId="select-filter"
										id="filter"
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
												{bText[lang].area_proceso.proceso_corresponde}
											</div>
										</MenuItem>
										{procesos && procesos.map(p => {
											return <MenuItem className="text-color" key={p.id} value={p.id}>{p.proceso}</MenuItem>
										})}
										{/* <MenuItem value={"english"}>English</MenuItem>
										<MenuItem value={"spanish"}>Español</MenuItem> */}
									</Select>
								</div>
                            </div>
                        </form>
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
		procesos: state.firestore.ordered.procesos,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		// createProceso: (proceso) => dispatch(createProceso(proceso)),
		createArea: (area) => dispatch(createArea(area)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "procesos" }])
)(Area);

// export default connect(mapStateToProps, mapDispatchtoProps)(AreaProceso)