import React, { Component, useState } from "react";
import { editPregunta, getPregunta } from "../../store/actions/preguntaActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Swal from "sweetalert2";

class EditarPregunta extends Component {
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
    // console.log("se supone que se envió", this.state)
    this.props.editPregunta(this.props.match.params.id, this.state);
    this.props.history.push("/preguntas"); //Esto se cambiará según el contexto
  };

  UNSAFE_componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getPregunta(id).then((res) => {
      // console.log("RES is working", res)
      this.setState({
        category: res.category,
        description: res.description,
        reaction_plan: res.reaction_plan,
        english: res.english,
        spanish: res.spanish,
      });
      // console.log("This is Res", res)
    });
    // console.log("Falta que el texto de los inputs se cambie a lo del state", this.state)
    //Checa el state en la consola, no sale nada
  }
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
    // console.log(this.state)
    const { auth, lang } = this.props;
    const bText = require("../../config/language");
    if (!lang) return null;

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form className="white" onSubmit={this.Seguro}>
          <h5 className="grey-text text-darken-3">
            {bText[lang].preguntas.editarPregunta.editar_pregunta}
          </h5>
          <div className="">
            <label htmlFor="lang.english">
              {bText[lang].preguntas.editarPregunta.pregunta}[EN]
            </label>
            <input
              type="text"
              id="english"
              value={this.state.english}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="lang.english">
              {bText[lang].preguntas.editarPregunta.pregunta}[ES]
            </label>
            <input
              type="text"
              id="english"
              value={this.state.spanish}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="descripcion">
              {bText[lang].preguntas.editarPregunta.descripcion}
            </label>
            <input
              type="text"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="action_plan">
              {bText[lang].preguntas.editarPregunta.plan_reaccion}
            </label>
            <input
              type="text"
              id="reaction_plan"
              value={this.state.reaction_plan}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <InputLabel id="select-level">
              {bText[lang].preguntas.editarPregunta.categoria}
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

          <button className="btn blue lighten-1 z-depth-0">
            {bText[lang].preguntas.editarPregunta.editar}
          </button>
        </form>
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
    editPregunta: (id, pregunta) => dispatch(editPregunta(id, pregunta)),
    getPregunta: (id) => dispatch(getPregunta(id)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(EditarPregunta);
