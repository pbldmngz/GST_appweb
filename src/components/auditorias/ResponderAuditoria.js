import React, { Component, useState } from "react";
import {
  createAuditoria,
  preguntasAuditoria,
} from "../../store/actions/auditoriaActions";
import { respuestaPregunta } from "../../store/actions/preguntaActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DatePicker from "react-datepicker";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";

//import DatePicker from 'react-datepicker/dist/react-datepicker'

//Esta madre no sirve, adáptenlo

import "react-datepicker/dist/react-datepicker.css";

class ResponderAuditoria extends Component {
  state = {
    preguntas: [],
    auditoria: "",
    _mounted: false,
  };
  handleChange = (e) => {
    // console.log("this is E", e)

    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const key = Object.keys(this.state);
    // console.log(key)

    var arrID = [];
    var arrJU = [];
    var arrRE = [];

    // Quiero crear un arr de objetos tal que así:
    // [{id: ###, justification:######, respuesta:##}]

    //const keyCeption = key
    const validKN = ["just-", "resp-"];
    var keys = {};

    for (let k of key) {
      var header = k.substring(5, 25);
      // console.log(header.length)
      if (header.length === 20) {
        keys[header] = true;
      }
    }

    keys = Object.keys(keys);
    var results = [];
    for (let ks of keys) {
      //ks es la ID
      var dict = { pregunta: ks, auditoria: this.props.match.params.id };
      dict["auditoria_pregunta"] = this.props.match.params.id + "_" + ks;
      // var id, just, resp;
      for (let k of key) {
        var header = k.substring(0, 5);
        var cont = k.substring(5, 25);
        // Esto es para poder hacer búsquedas, firebase es moleto para filtrar
        // console.log("pre-if", validKN.includes(header), header)
        // console.log("pre-if-2", cont === ks, cont, ks)
        if (validKN.includes(header) && cont === ks) {
          if (header == "just-") {
            dict["justificacion"] = this.state[k];
          } else {
            dict["respuesta"] = this.state[k];
          }

          // console.log("this is dict-header", dict[header])
        }
      }
      results.push(dict);
    }

    // console.log(results)

    // if (validKN.includes(header)) {

    // }
    // console.log("Props:", this.props)
    this.props.respuestaPregunta(results);
    this.props.history.push("/"); //Esto se cambiará según el contexto
  };
  componentDidMount() {
    console.log("Mounted!");
    // this._ismounted = true
    const id = this.props.match.params.id;
    // this.setState({
    //     auditoria: id,
    // })

    this.props.preguntasAuditoria({ id: id }).then((res) => {
      this.setState(
        {
          preguntas: res.filter((r) => r),
          auditoria: id,
          _mounted: true,
        },
        console.log("Updated!")
      );
    });
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
      confirmButtonColor:'#002D73',
      denyButtonColor:'#707070',

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
    const { auth, preguntas, proceed, lang } = this.props;
    const text = require("../../config/language");

    // console.log("Status", this.state)
    // console.log(this.props)
    if (!lang) return null;
    if (!auth.uid) return <Redirect to="/signin" />;
    // console.log("Mounted?", this.state._mounted, "Proceed?", !proceed)
    if (this.state._mounted && !proceed) return <Redirect to="/" />;

    //Se tiene que buscar preguntas por ID,
    // estas ID están en auditorias.preguntas en un array

    // const pregID = preguntasID.preguntas
    // console.log(pregID)
    //const pre = this.props.preguntasAuditoria({ id: id })

    //Esto ya sirve pero se buclea
    // const id = this.props.match.params.id

    // const pregID = this.props.preguntasAuditoria({ id: id }).then((res) => {
    //     this.setState({
    //         preguntas: res
    //     })
    // })
    // console.log("estas son las preguntas", this.state.preguntas)

    return (
      <div className="container">
        <div className="test">
          {/* {pregID && pregID.map(pregunta => { 
                        console.log(pregunta)
                        return <p>{pregunta}</p>})} */}
        </div>
        <div className="card x-depth-0">
          <form className="white section" onSubmit={this.Seguro}>
            <h5 className="grey-text text-darken-3 center">
              {text[lang].auditorias.responderAuditoria.responder_auditoria}
            </h5>
            {/* Esto se puede convertir a un operador ? : para que muestre un cargando o algo así */}
            {/* {console.log("esto es preguntaSSS", this.state.preguntas)} */}

            {/* Ponganle una animación al height para que en el momento que cargue vaya de 0% a 100%*/}
            {this.state.preguntas &&
              this.state.preguntas.map((pregunta) => {
                return (
                  <div className="myspan pregunta container" key={pregunta.id}>
                    {/* card x-depth-0 para ver los limites fácilmente*/}
                    <FormControl className="width100" component="fieldset">
                      {/* {console.log("antes de que truene, esto es pregunta", pregunta)} */}
                      <FormLabel
                        className="legend-pregunta grey-text text-darken-3"
                        component="legend"
                      >
                        {pregunta[lang]}
                      </FormLabel>
                      <div className="campos">
                        <TextField
                          label={
                            text[lang].auditorias.responderAuditoria
                              .justificacion
                          }
                          className="date label70"
                          name={"just-" + pregunta.id}
                          onChange={this.handleChange}
                        />
                        {/* {console.log("Este es un intento: ", "radio-" + pregunta.id)} */}
                        <RadioGroup
                          className="radio-group date"
                          row
                          aria-label="gender"
                          name={"resp-" + pregunta.id}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel
                            className="radio-button grey-text text-darken-3"
                            value="Sí"
                            control={<Radio />}
                            label={text[lang].auditorias.responderAuditoria.si}
                          />
                          <FormControlLabel
                            className="radio-button grey-text text-darken-3"
                            value="No"
                            control={<Radio />}
                            label={text[lang].auditorias.responderAuditoria.no}
                          />
                        </RadioGroup>
                      </div>
                    </FormControl>
                  </div>
                );
              })}
            <div className="center">
              <button
                id="Enviar"
                className="btn blue lighten-1 z-depth-0 big-button"
              >
                {text[lang].auditorias.responderAuditoria.enviar}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    lang: state.firebase.profile.lang,
    proceed:
      (state.firestore.ordered.respuestas &&
        state.firestore.ordered.respuestas.filter(
          (res) =>
            res.answeredById === state.firebase.auth.uid &&
            res.auditoria === ownProps.match.params.id
        ).length) > 0
        ? false
        : true,
    preguntas: state.firestore.ordered.preguntas,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria)),
    preguntasAuditoria: (auditoria) => dispatch(preguntasAuditoria(auditoria)),
    respuestaPregunta: (pregunta) => dispatch(respuestaPregunta(pregunta)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([
    { collection: "respuestas", orderBy: ["answeredAt", "asc"] },
  ])
)(ResponderAuditoria);
