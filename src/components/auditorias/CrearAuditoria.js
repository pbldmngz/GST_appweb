import React, { Component, useState } from 'react'
import {createAuditoria} from '../../store/actions/auditoriaActions'
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import DatePicker from "react-datepicker";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Slide from '@material-ui/core/Slide';
//import DatePicker from 'react-datepicker/dist/react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class CrearAuditoria extends Component {
    state = {
        auditoria: "",
        auditor: "",
        area: "",
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        preguntas: [],
        openB: false,
        valueB: "",
    }
    handleChange = (e) => {
        // console.log("This is E", e)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeAutocomplete = (e, newValue) => {
        // console.log("This is E and nV", e, newValue)
        //Tengo que conseguir el ID
        this.setState({
            valueB: newValue
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.createAuditoria({
            auditoria: this.state.auditoria,
            auditor: this.state.auditor,
            area: this.state.area,
            fecha_inicio: this.state.fecha_inicio,
            fecha_fin: this.state.fecha_fin,
            preguntas: this.state.preguntas.map((pre) => {
                return pre.id
            }),
            minCategory: Math.max(...this.state.preguntas.map((pre) => {
                return pre.category
            })),
        })
        
        this.props.history.push("/"); //Esto se cambiará según el contexto
    }

    handleClickOpen = () => {
        this.setState({
            openB: true
        })
    };
    handleCancel = () => {
        this.props.history.push("/");
    }
    handleDelete = (id) => {
        const newPreguntas = this.state.preguntas.filter(pregunta => pregunta.id !== id)
        this.setState({
            preguntas: newPreguntas
        })
    }
    handleClose = () => {
        this.setState({
            openB: false
        })
    };
    handleCloseSave = (e) => {
        // console.log("Y aquí debo de sacar una forma de registrar una pregunta nueva", e)
        this.setState(prevState => ({
            openB: false,
            preguntas: [...new Set([...prevState.preguntas, this.state.valueB])]
        }))
    };

    render() {
        var { path, pathName } = require('../../config/config');
        const {auth, userLevel} = this.props;
        if (!auth.uid) return <Redirect to="/signin" />
        if (userLevel != 0) return <Redirect to="/" />

        console.log(this.state.preguntas)
        return (
            <div className="">
                <div className="cabecera">
                <h2 className="">Crear auditoria</h2>
                </div>
                <div className="box">
                    <div className="crear-auditoria-views card">
                        <form className="white" onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <input type="text" id='auditoria' placeholder="Auditor" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <input type="text" id='auditor' placeholder="Priority" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <input type="text" id='area' placeholder="Area" onChange={this.handleChange} />
                            </div>
                            <div className="date-field">

                                <div className="date-container">
                                    <div className="date">
                                        <span className="" placeholder="Start"> y termina el </span>
                                        <DatePicker id="fecha_fin" selected={this.state.fecha_fin} onChange={(date) => this.setState({
                                            fecha_fin: date
                                        })} />
                                    </div>
                                    <div className="date">
                                        <span className="">Inicia el </span>
                                        <DatePicker id="fecha_inicio" selected={this.state.fecha_inicio} onChange={(date) => this.setState({
                                            fecha_inicio: date
                                        })} />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="botones">
                    <button className="cancel" onClick={this.handleSubmit}>Cancelar</button>
                    <button className="aceptar" onClick={this.handleCancel}>Create</button>
                </div>
                
                <button className="regreso">Return</button>
                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel,
        preguntas: state.firestore.ordered.preguntas
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria))
    }
}

export default compose(connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([{ collection: "preguntas"}]))
    (CrearAuditoria)
