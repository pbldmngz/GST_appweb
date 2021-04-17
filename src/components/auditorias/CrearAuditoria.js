import React, { Component, useState } from 'react'
import {createAuditoria} from '../../store/actions/auditoriaActions'
import { NavLink } from 'react-router-dom';
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
//import DatePicker from 'react-datepicker/dist/react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

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
            })
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
            preguntas: [...prevState.preguntas, this.state.valueB]
        }))
    };

    render() {
        var { path, pathName } = require('../../config/config');
        const {auth, userLevel} = this.props;
        if (!auth.uid) return <Redirect to="/signin" />
        if (userLevel != 0) return <Redirect to="/" />

        console.log(this.state.preguntas)
        return (
            <div className="just-width-100 white">
                <div className="main-crear-auditoria container">
                    <div className="crear-auditoria-views card">
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
                        </form>
                    </div>
                    <div className="agregar-pregunta card crear-auditoria-views destroy-overflow">
                        <div className="white">
                            <h5 className="grey-text text-darken-3">Agregar preguntas</h5>
                            <div className="preguntas-creadas">
                                {
                                this.state.preguntas && this.state.preguntas.map((pregunta, index) => {
                                    return (
                                        <div className="grid-main" key={index}>
                                            <div className="grid-component-left card">
                                                {index + 1}. {pregunta.english}
                                            </div>
                                            <div className="grid-component-right card hover-click" onClick={() => {
                                                this.handleDelete(pregunta.id)
                                            }}>
                                                <i className="material-icons">delete</i>
                                            </div>
                                        </div>
                                        
                                        )
                                    })
                                }
                            </div>
                            <button className="btn-floating btn-small waves-effect waves-light blue button-margin" onClick={this.handleClickOpen}>
                                <i className="material-icons">add</i>
                            </button>
                            <Dialog open={this.state.openB} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Seleccionar pregunta</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Busca y selecciona las preguntas que desees añadir.
                                    </DialogContentText>
                                    <Autocomplete
                                        id="valueB"
                                        name="valueB"
                                        options={this.props.preguntas}
                                        onChange={this.handleChangeAutocomplete}
                                        getOptionLabel={(option) => option.english}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Preguntas" variant="outlined" />}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseSave} color="primary">Agregar</Button>
                                    <Button onClick={this.handleClose} color="primary">Cancelar</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    
                </div>
                
                <div className="final-button container">
                    <button className="btn blue lighten-1 z-depth-0" onClick={this.handleSubmit}>Crear auditoría</button>
                    <button className="btn lighten-1 z-depth-0" onClick={this.handleCancel}>Cancelar</button>
                </div>
                
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
