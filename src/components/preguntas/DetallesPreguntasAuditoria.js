import React, { Component } from 'react'
import { preguntasAuditoriaVoting } from '../../store/actions/auditoriaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import "react-datepicker/dist/react-datepicker.css";
import DetallesPregunta from './DetallesPregunta';
import Volver from '../util/Volver'

import { bText } from "../../config/language";


class DetallesPreguntasAuditoria extends Component {
    
    state = {
        preguntas: [],
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
    return {
        auth: state.firebase.auth,
        lang: state.firebase.profile.lang,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        preguntasAuditoriaVoting: (auditoria) => dispatch(preguntasAuditoriaVoting(auditoria)),
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(DetallesPreguntasAuditoria)