import React, { Component, useState } from 'react'
import { editAuditoria, getAuditoria } from '../../store/actions/auditoriaActions'
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
import Swal from 'sweetalert2';
//import DatePicker from 'react-datepicker/dist/react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class EditarAuditoria extends Component {
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
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeSelect = (e) => {
        // console.log(e)
        this.setState({
            category: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("se supone que se envió", this.state)
        this.props.editAuditoria(this.props.match.params.id, this.state)
        this.props.history.push("/auditorias"); //Esto se cambiará según el contexto
    }

    UNSAFE_componentWillMount() {
        const id = this.props.match.params.id
        this.props.getAuditoria(id).then((res) => {
            // console.log("RES is working", res)
            this.setState({
                auditoria: res.auditoria,
                auditor: res.auditor,
                area: res.area,
                fecha_inicio: res.fecha_inicio,
                fecha_fin: res.fecha_fin,
                preguntas:res.preguntas,
                openB:res.openB,
                valueB:res.valueB,
            })
            // console.log("This is Res", res)
        })
        // console.log("Falta que el texto de los inputs se cambie a lo del state", this.state)
        //Checa el state en la consola, no sale nada

    }
    Seguro = (e) => {
        // console.log(e)
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Save',
            denyButtonText: "Don't save",
            }).then((result) => {
            //  Read more about isConfirmed, isDenied below
            if (result.isConfirmed) {
                this.handleSubmit(e)
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
            })
    }
    render() {
        var { path, pathName } = require('../../config/config');
        const text = require('../../config/language');

        const {auth, userLevel, lang} = this.props;
        if (!lang) return null;

        // console.log("this is lang: ", lang)

        if (!auth.uid) return <Redirect to="/signin" />
        if (userLevel != 0) return <Redirect to="/" />

        console.log(this.state.preguntas)
        
        return (
            <div className="">
                <div className="cabecera">
                    <h2 className="">{text[lang].auditorias.crearAuditoria.crear_auditoria}</h2>
                </div>
                <div className="box">
                    <div className="crear-auditoria-views card">
                        <form className="white" onSubmit={this.Seguro}>
                            <h5 className="grey-text text-darken-3">{text[lang].auditorias.crearAuditoria.crear_auditoria}</h5>
                            <div className="input-field">
                                <input type="text" id='auditoria' placeholder={text[lang].auditorias.crearAuditoria.nombre_auditoria} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <input type="text" id='auditor' placeholder={text[lang].auditorias.crearAuditoria.auditor} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <input type="text" id='area' placeholder={text[lang].auditorias.crearAuditoria.area} onChange={this.handleChange} />
                            </div>
                            <div className="date-field">

                                <div className="date-container">
                                    <div className="date">
                                        <span className="" placeholder={text[lang].auditorias.crearAuditoria.termina_el}> y termina el </span>
                                        <DatePicker id="fecha_fin" selected={this.state.fecha_fin} onChange={(date) => this.setState({
                                            fecha_fin: date
                                        })} />
                                    </div>
                                    <div className="date">
                                        <span className="grey-text">{text[lang].auditorias.crearAuditoria.inicia_el}</span>
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
                                                {index + 1}. {pregunta[lang]}
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
                            <Dialog 
                                open={this.state.openB} 
                                onClose={this.handleClose} 
                                aria-labelledby="form-dialog-title"
                                TransitionComponent={Transition}
                                >
                                <DialogTitle id="form-dialog-title">{text[lang].auditorias.crearAuditoria.seleccionar_pregunta}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {text[lang].auditorias.crearAuditoria.text1}
                                        <Link to="/crear-pregunta" target="_blank" rel="noopener noreferrer">{text[lang].auditorias.crearAuditoria.text2}</Link>
                                        {text[lang].auditorias.crearAuditoria.text3}
                                    </DialogContentText>
                                    <Autocomplete
                                        id="valueB"
                                        name="valueB"
                                        options={this.props.preguntas}
                                        onChange={this.handleChangeAutocomplete}
                                        getOptionLabel={(option) => option[lang]}
                                        
                                        renderInput={(params) => <TextField {...params} label="Preguntas" variant="outlined" />}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseSave} color="primary">{text[lang].auditorias.crearAuditoria.agregar}</Button>
                                    <Button onClick={this.handleClose} color="secondary">{text[lang].auditorias.crearAuditoria.cancelar}</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    
                </div>
                
                <div className="botones">
                    <button className="cancel" onClick={this.handleCancel}>{text[lang].auditorias.crearAuditoria.cancelar}</button>
                    <button className="aceptar" onClick={this.Seguro}>{text[lang].auditorias.crearAuditoria.crear}</button>
                </div>
                
                <button className="regreso"><a href="/">{text[lang].return}</a></button>
                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        lang: state.firebase.profile.lang,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        editAuditoria: (id, auditoria) => dispatch(editAuditoria(id, auditoria)),
        getAuditoria: (id) => dispatch(getAuditoria(id))
    }
}

export default compose(connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([{ collection: "preguntas"}]))
    (EditarAuditoria)
