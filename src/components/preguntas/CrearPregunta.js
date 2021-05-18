import React, { Component, useState } from "react";
import { createPregunta } from "../../store/actions/preguntaActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Swal from "sweetalert2";
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
    // console.log(e)
    this.setState({
      category: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state)
    this.props.createPregunta(this.state);
    this.props.history.push("/preguntas"); //Esto se cambiará según el contexto
  };
  Seguro = (e) => {
    console.log(e)
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
    const { auth, lang } = this.props;
    const bText = require("../../config/language");

    if (!auth.uid) return <Redirect to="/signin" />;

    if (!lang) return null;

    

    return (
      <div>
        <div className="padre-titulo">
          <h2 className="titulo">Crear Pregunta</h2>
        </div>
        <div className="tarjeta-crear-pregunta">
          <div className="center-box">
            <form className="" onSubmit={this.Seguro}>
              <div className="input-field">
                <input type="text" id="english" placeholder="Pregunta en inglés [EN]" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <input type="text" id="spanish" placeholder="Pregunta en español [ES]" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <input type="text" id="description" placeholder="Descripción" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id="reaction_plan"
                  placeholder="Plan de reacción"
                  onChange={this.handleChange}
                />
              </div>
              <div className="">
                <InputLabel id="select-level">
                  {bText[lang].preguntas.crearPregunta.categoria}
                </InputLabel>
                <Select
                  labelId="select-level"
                  id="level"
                  value={this.state.category}
                  onChange={this.handleChangeSelect}
                >
                  <MenuItem value={4}>D</MenuItem>
                  <MenuItem value={3}>C</MenuItem>
                  <MenuItem value={2}>B</MenuItem>
                  <MenuItem value={1}>A</MenuItem>
                </Select>
                </div>
            </form>
          </div>
        </div>
            <div className="center-box">
          <button className="crear" onClick={this.Seguro}>
                    {bText[lang].preguntas.crearPregunta.crear}
                  </button>
                </div>
        <button className="return" onClick={() => { this.props.history.push("/") }}>{bText[lang].return}</button>
              
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("Status", state)
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
