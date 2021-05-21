import React, { Component, useState } from 'react'
import { createAuditoria, preguntasAuditoria, preguntasAuditoriaVoting } from '../../store/actions/auditoriaActions'
import { respuestaPregunta,  } from '../../store/actions/preguntaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import DatePicker from "react-datepicker";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";
import DetallesPregunta from './DetallesPregunta';
import Volver from '../util/Volver'

class DetallesPreguntasAuditoria extends Component {
    state = {
        preguntas: [], // Añadir el pCount a esto con un map
        auditoria: ""
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({
            auditoria: id
        })

        this.props.preguntasAuditoriaVoting({ id: id }).then((res) => {
            this.setState({
                preguntas: res
            })
        })


    }

    render() {
        const { auth, lang } = this.props;
        const bText = require('../../config/language');
        

        // console.log(this.props)

        if (!auth.uid) return <Redirect to="/signin" />
        if (!lang) return null;
        
        return (
            <div className="">
                <div className="padre-titulo">
                    <div className="titulo">
                        <Volver/>
                    </div>
                    <div className="titulo">
                        <h2 className="">
                            {bText[lang].preguntas.detallesPreguntasAuditoria.respuestas_auditoria}
                        </h2>
                    </div>
                </div>
                <div className="form-1 white">
                    <div className="form-2">
                        {this.state.preguntas && this.state.preguntas.map(pregunta => {
                            return (
                                <div className="" key={pregunta.id}>
                                    {/* {console.log("login pregunta", pregunta)} */}
                                    <DetallesPregunta pregunta={pregunta} lang={lang}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        lang: state.firebase.profile.lang,
        // preguntas: state.firestore.ordered.preguntas,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        // createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria)),
        preguntasAuditoriaVoting: (auditoria) => dispatch(preguntasAuditoriaVoting(auditoria)),
        // respuestaPregunta: (pregunta) => dispatch(respuestaPregunta(pregunta))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    // firestoreConnect([{ collection: "preguntas", orderBy: ["createdAt", "asc"] }])
)(DetallesPreguntasAuditoria)