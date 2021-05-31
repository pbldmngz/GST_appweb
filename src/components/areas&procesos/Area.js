import React, { Component } from 'react'

import { connect } from "react-redux";
import { Redirect } from "react-router";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { createArea, editArea, getArea } from "../../store/actions/areaActions";

import {bText} from "../../config/language";
// import { directions } from "../../config/config"

class Area extends Component {

    state = {
		proceso: "",
		urgencia: "",
		area: "",
	};

	handleCancel = () => {
		var whereToGo = (this.props.match.params.proceso) ? "/areas/" + this.props.match.params.proceso : "/profile";

		const id = this.props.match.params.id

		whereToGo = (id) ? "/areas/" + this.state.proceso : whereToGo;

		this.props.history.push(whereToGo);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		var whereToGo = (this.props.match.params.proceso) ? "/areas/" + this.props.match.params.proceso : "/profile";
				
		const id = this.props.match.params.id

		whereToGo = (id) ? "/areas/" + this.state.proceso : whereToGo;

		if (!id) {
			this.props.createArea(this.state)
		} else {
			this.props.editArea(id, this.state)
		}
		
		this.props.history.push(whereToGo); //Esto se cambiará según el contexto
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

	componentDidMount() {
		if (this.props.match.params.proceso) {
			this.setState({
				proceso: this.props.match.params.proceso,
			})
		} else {
			const id = this.props.match.params.id

			if (!id) return null;

			this.props.getArea(id).then((res) => {
				// console.log(res)
				this.setState({...res})
			})
		}
	}

    render() {
		// var { path, pathName } = require("../../config/config");
		// const bText = require();
		const { auth, userLevel, lang, procesos } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		if (!lang) return null;

		if (userLevel !== 0) return <Redirect to="/" />;

		// const tipo = this.props.match.params.tipo

		// console.log(this.props.match)

		const whereToGo = (this.props.match.params.proceso) ? "/areas/" + this.props.match.params.proceso : "/profile";

		return (
			<div className="">
				<div className="padre-titulo mobile">
					<div className="titulo destroy-on-mobile">
						<Volver where={whereToGo}/>
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
										value={this.state.area}
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
								{bText[lang].area_proceso.crear_area}
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
		editArea: (id, area) => dispatch(editArea(id, area)),
		getArea: (id) => dispatch(getArea(id)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
	firestoreConnect([{ collection: "procesos" }, { collection: "areas" }])
)(Area);

// export default connect(mapStateToProps, mapDispatchtoProps)(AreaProceso)