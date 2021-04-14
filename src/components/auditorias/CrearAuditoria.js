import React, { Component, useState } from 'react'
import {createAuditoria} from '../../store/actions/auditoriaActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import DatePicker from "react-datepicker";
//import DatePicker from 'react-datepicker/dist/react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

class CrearAuditoria extends Component {
    state = {
        auditoria: "",
        auditor: "",
        area: "",
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        preguntas: []
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.createAuditoria(this.state)
        this.props.history.push("/"); //Esto se cambiará según el contexto
    }
    render() {
        const {auth, userLevel} = this.props;
        if (!auth.uid) return <Redirect to="/signin" />
        if (userLevel != 0) return <Redirect to="/" />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Crear auditoria</h5>
                    <div className="input-field">
                        <label htmlFor="auditoria">Nombre de la auditoria</label>
                        <input type="text" id='auditoria' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="auditor">Auditor</label>
                        <input type="text" id='auditor' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="area">Area</label>
                        <input type="text" id='area' onChange={this.handleChange} />
                    </div>
                    <div className="date-field">
                        
                        <div className="date-container">
                            <div className="date">
                                <span className="grey-text"> y termina el </span>
                                <DatePicker id="fecha_fin" selected={this.state.fecha_fin} onChange={(date) => this.setState({
                                    fecha_fin: date
                                })} />
                            </div>
                            <div className="date">
                                <span className="grey-text">Inicia el </span>
                                <DatePicker id="fecha_inicio" selected={this.state.fecha_inicio} onChange={(date) => this.setState({
                                    fecha_inicio: date
                                })} />
                            </div>
                        </div>
                        
                    </div>

                    <button className="btn blue lighten-1 z-depth-0">Crear</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CrearAuditoria)
