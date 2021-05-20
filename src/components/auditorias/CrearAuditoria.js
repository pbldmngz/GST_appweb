import React, { Component, useState } from "react";
import { createAuditoria } from "../../store/actions/auditoriaActions";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slide from "@material-ui/core/Slide";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
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
  };
  handleChange = (e) => {
    // console.log("This is E", e)
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleChangeAutocomplete = (e, newValue) => {
    // console.log("This is E and nV", e, newValue)
    //Tengo que conseguir el ID
    this.setState({
      valueB: newValue,
    });
  };
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
        return pre.id;
      }),
      minCategory: Math.max(
        ...this.state.preguntas.map((pre) => {
          return pre.category;
        })
      ),
    });

    this.props.history.push("/"); //Esto se cambiará según el contexto
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
  handleCloseSave = (e) => {
    // console.log("Y aquí debo de sacar una forma de registrar una pregunta nueva", e)
    this.setState((prevState) => ({
      openB: false,
      preguntas: [...new Set([...prevState.preguntas, this.state.valueB])],
    }));
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
    const text = require("../../config/language");
    const { auth, userLevel, lang } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    if (!lang) return null;

    if (userLevel != 0) return <Redirect to="/" />;

    // console.log(this.state.preguntas)

    return (
      <div className="padre-padre-titulo">
        <div className="padre-titulo">
        <div className="titulo">
          <Volver/>
        </div>
        <div className="titulo">
          <h2 className="">
            {text[lang].auditorias.crearAuditoria.crear_auditoria}
          </h2>
        </div>
          
        </div>
        <div className="">
          <div className="tarjeta-crear-auditoría">
            <div className="center-box">
              <form className="" onSubmit={this.Seguro}>
                
                <div className="date-field">
                  <div className="input-field">
                    <input
                      type="text"
                      id="auditor"
                      placeholder={text[lang].auditorias.crearAuditoria.auditor}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      id="area"
                      placeholder={text[lang].auditorias.crearAuditoria.area}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      id="proceso"
                      placeholder={text[lang].auditorias.crearAuditoria.proceso}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="date-container">

                        <span className="fecha">
                          {text[lang].auditorias.crearAuditoria.inicia_el}
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
                        />
                        </div>
                  
                      <span className="fecha">
                        {text[lang].auditorias.crearAuditoria.termina_el}
                        {console.log(text[lang].auditorias.crearAuditoria.termina_el)}
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
                      />
                      </div>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="center-box">
            <div className="">
              <div className="">
                {this.state.preguntas &&
                  this.state.preguntas.map((pregunta, index) => {
                    return (
                      <div className="" key={index}>
                        <div className="">
                          {index + 1}. {pregunta[lang]}
                        </div>
                        <div
                          className=""
                          onClick={() => {
                            this.handleDelete(pregunta.id);
                          }}
                        >
                          <i className="material-icons">Delete</i>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <button className="add-question" onClick={this.handleClickOpen}>Agregar pregunta</button>
              <Dialog
                open={this.state.openB}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}
              >
                <DialogTitle id="form-dialog-title">
                  {text[lang].auditorias.crearAuditoria.seleccionar_pregunta}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {text[lang].auditorias.crearAuditoria.text1}
                    <Link
                      to="/crear-pregunta"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text[lang].auditorias.crearAuditoria.text2}
                    </Link>
                    {text[lang].auditorias.crearAuditoria.text3}
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
                    {text[lang].auditorias.crearAuditoria.agregar}
                  </Button>
                  <Button onClick={this.handleClose} color="secondary">
                    {text[lang].auditorias.crearAuditoria.cancelar}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      <div>

                <div className="footer">
                    <div className="center-box">
                      <button className="cancelar" onClick={this.handleCancel}>
                        {text[lang].auditorias.crearAuditoria.cancelar}
                      </button>
                    </div>
                    <div className="center-box">
                      <button className="aceptar" onClick={this.Seguro}>
                        {text[lang].auditorias.crearAuditoria.crear}
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
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([{ collection: "preguntas" }])
)(CrearAuditoria);
