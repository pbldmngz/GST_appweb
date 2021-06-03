import React, { Component } from "react";
import {
  createAuditoria,
  preguntasAuditoria,
  getAuditoria,
} from "../../store/actions/auditoriaActions";
import { respuestaPregunta } from "../../store/actions/preguntaActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import Volver from '../util/Volver'
//import DatePicker from 'react-datepicker/dist/react-datepicker'
import { bText } from "../../config/language";

//Esta madre no sirve, adáptenlo
import QrReader from 'modern-react-qr-reader'
import "react-datepicker/dist/react-datepicker.css";

class ResponderAuditoria extends Component {

  // state = {
  //   password: "<NOPASS>",
  //   pass:"",
  //   preguntas: [],
  //   auditoria: "",
  //   area: "",
  //   _mounted: false,
  // };

  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      password: "<NOPASS>",
      pass: "",
      preguntas: [],
      auditoria: "",
      area: "",
      _mounted: false,
    }

    this.handleScan = this.handleScan.bind(this)
  }

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

    // Quiero crear un arr de objetos tal que así:
    // [{id: ###, justification:######, respuesta:##}]

    //const keyCeption = key
    const validKN = ["just-", "resp-"];
    var keys = {};

    for (let k of key) {
      var header_base = k.substring(5, 25);
      // console.log(header.length)
      if (header_base.length === 20) {
        keys[header_base] = true;
      }
    }

    keys = Object.keys(keys);
    var results = [];
    for (let ks of keys) {
      //ks es la ID
      var dict = { pregunta: ks, auditoria: this.props.match.params.id, area: this.state.area };
      dict["auditoria_pregunta"] = this.props.match.params.id + "_" + ks;
      // var id, just, resp;
      for (let k of key) {
        var header = k.substring(0, 5);
        var cont = k.substring(5, 25);
        // Esto es para poder hacer búsquedas, firebase es moleto para filtrar
        // console.log("pre-if", validKN.includes(header), header)
        // console.log("pre-if-2", cont === ks, cont, ks)
        if (validKN.includes(header) && cont === ks) {
          if (header === "just-") {
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

    this.props.getAuditoria(id).then((res) => {
      this.setState({
        area: res.area,
        pass: res.password,
      })
    })

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
    // const bText = require("../../config/language");
    const { lang } = this.props
    // console.log(this.cantSend())
    // if (this.cantSend()) return null;
    // console.log(e)
    e.preventDefault();
    Swal.fire({
      title: bText[lang].swal.title,
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: bText[lang].swal.cancel,
      confirmButtonText: bText[lang].swal.save,
    }).then((result) => {
      //  Read more about isConfirmed, isDenied below
      if (result.isConfirmed) {
        this.handleSubmit(e);
        Swal.fire(bText[lang].swal.saved, "", "success");
      } else if (result.isDenied) {
        Swal.fire(bText[lang].swal.not_saved, "", "info");
      }
    });
  };

  handleScan(data) {
    // console.log("HandleScan", data)
    if (data !== null) {
      this.setState({
        password: data,
      })
    }
    
  }
  handleError(err) {
    console.error(err)
  }

  render() {
    const { auth, proceed, lang, userLevel } = this.props;
    // const bText = require("../../config/language");

    // console.log("Status", this.state)
    // console.log(this.props)
    if (!auth.uid) return <Redirect to="/signin" />;
    if (!lang) return null;
    
    // console.log("Mounted?", this.state._mounted, "Proceed?", !proceed)
    if (this.state._mounted && !proceed) return <Redirect to="/" />;

    // console.log("Password: ", this.state.password)
    // console.log("Pass: ", this.state.pass)

    //Se tiene que buscar preguntas por ID,
    // estas ID están en auditorias.preguntas en un array

    // const pregID = preguntasID.preguntas
    // console.log(pregID)
    //const pre = this.props.preguntasAuditoria({ id: id })

    //Esto ya sirve pero se buclea
    // const id = this.props.match.params.id

    const react_plan = {
      0: bText[lang].preguntas.crearPregunta.fix,
      1: bText[lang].preguntas.crearPregunta.contramedidas_temporales,
      2: bText[lang].preguntas.crearPregunta.parar_produccion,
    }

    // const pregID = this.props.preguntasAuditoria({ id: id }).then((res) => {
    //     this.setState({
    //         preguntas: res
    //     })
    // })
    // console.log("estas son las preguntas", this.state.preguntas)
    if (this.state.pass !== this.state.password) {
      // const previewStyle = {
      //   height: 150,
      //   width: 250,
      // }

      const previewStyle = {
        // height: 173,
        width: "90%",
      }

      return (
        <div>
          <div className="padre-titulo mobile">
            <div className="titulo destroy-on-mobile">
              <Volver />
            </div>
            <div className="titulo">
              <h2>{bText[lang].auditorias.responderAuditoria.scan_qr}</h2>
            </div>
            <div className="titulo">

            </div>
          </div>
          
          <center>
            <QrReader
              delay={300}
              facingMode={"environment"}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </center>
          
        </div>
        
      )
    }

    return (
      <div className="">
        <div className="test">
          {/* {pregID && pregID.map(pregunta => { 
                        console.log(pregunta)
                        return <p>{pregunta}</p>})} */}
        </div>
        <div className="card x-depth-0">
          <div className="padre-titulo mobile">
            <div className="titulo destroy-on-mobile">
                <Volver/>
            </div>
            <div className="titulo">
                <h2>{bText[lang].auditorias.responderAuditoria.responder_auditoria}</h2>
            </div>
            <div className="titulo">

            </div>
          </div>

          <form className="white section" onSubmit={this.Seguro}>
            
            {/* Esto se puede convertir a un operador ? : para que muestre un cargando o algo así */}
            {/* {console.log("esto es preguntaSSS", this.state.preguntas)} */}

            {/* Ponganle una animación al height para que en el momento que cargue vaya de 0% a 100%*/}
            {this.state.preguntas &&
              this.state.preguntas.filter(p => p.category >= userLevel).map((pregunta, index) => {
                return (
                  <div className="form-1 extra-padding-form" key={pregunta.id}>
                    {/* card x-depth-0 para ver los limites fácilmente*/}
                    {/* <FormControl className="width100" component="fieldset"> */}
                      {/* {console.log("antes de que truene, esto es pregunta", pregunta)} */}
                      <FormLabel
                        className="legend-pregunta grey-text text-darken-3"
                        component="legend"
                      >
                        <h3>{index + 1}. {pregunta[lang]}</h3>
                      <p className="justify-text">{pregunta.description}</p>
                      </FormLabel>
                      <div className="campos extra-margin">
                        
                        {/* {console.log("Este es un intento: ", "radio-" + pregunta.id)} */}
                        <RadioGroup
                          className="radio-group"
                          row
                          aria-label="gender"
                          name={"resp-" + pregunta.id}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel
                            className="radio-button grey-text text-darken-3"
                            value="Sí"
                            control={<Radio />}
                            label={bText[lang].auditorias.responderAuditoria.si}
                          />
                          <FormControlLabel
                            className="radio-button grey-text text-darken-3"
                            value="No"
                            control={<Radio />}
                            label={bText[lang].auditorias.responderAuditoria.no}
                          />
                        </RadioGroup>

                        {(this.state["resp-" + pregunta.id]) ? (
                          ((this.state["resp-" + pregunta.id]) === "No") ? (
                            <div>
                            <center>{bText[lang].preguntas.detallesPregunta.plan_reaccion}: <b>{react_plan[pregunta.reaction_plan]}</b></center>
                              <TextField
                                label={
                                  bText[lang].auditorias.responderAuditoria
                                    .justificacion
                                }
                                className="label70"
                                name={"just-" + pregunta.id}
                                onChange={this.handleChange}
                              />
                            </div>
                            
                          ) : null
                          
                        ) : null}

                        
                      </div>
                    {/* </FormControl> */}
                  </div>
                );
              })}
            <div className="center-box">
              <button
                id="Enviar"
                className="aceptar"
              >
                {bText[lang].auditorias.responderAuditoria.enviar}
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
    userLevel: state.firebase.profile.userLevel,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria)),
    preguntasAuditoria: (auditoria) => dispatch(preguntasAuditoria(auditoria)),
    respuestaPregunta: (pregunta) => dispatch(respuestaPregunta(pregunta)),
    getAuditoria: (id) => dispatch(getAuditoria(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([
    { collection: "respuestas", orderBy: ["answeredAt", "asc"] },
  ])
)(ResponderAuditoria);
