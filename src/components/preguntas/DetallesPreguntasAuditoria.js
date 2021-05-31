import React, { Component } from 'react'
import { preguntasAuditoriaVoting } from '../../store/actions/auditoriaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { compose } from 'redux'
import "react-datepicker/dist/react-datepicker.css";
import DetallesPregunta from './DetallesPregunta';
import Volver from '../util/Volver'

import { bText } from "../../config/language";

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
        // const bText = require('../../config/language');
        

        // console.log(this.props)

        if (!auth.uid) return <Redirect to="/signin" />
        if (!lang) return null;
        
        return (
            <div className="">
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                        <Volver/>
                    </div>
                    <div className="titulo">
                        <h2 className="">
                            {bText[lang].preguntas.detallesPreguntasAuditoria.respuestas_auditoria}
                        </h2>
                    </div>
                </div>
                <div className="">
                    <div className="">
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