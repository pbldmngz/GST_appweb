import React, { Component } from 'react'
import Preguntas from '../preguntas/Preguntas'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router'
import { deletePregunta, editPregunta } from '../../store/actions/preguntaActions'

import Volver from '../util/Volver'

import { bText } from "../../config/language";
// CSS class "container" centers content

// Para cuando se esté creado una auditoría debería 
// crear un componente para buscar la pregunta por texto

// Por algún motivo, al hacer click en una pregunta 
// no me lleva al componente específico pero si cambia el link

class DashboardPreguntas extends Component {
    render() {
        const { preguntas, auth, userLevel, lang } = this.props
        // console.log(userLevel)
        // const bText = require("../../config/language");

        if (!auth.uid) return <Redirect to="/signin" />
        if (userLevel !== 0) return <Redirect to="/" />

        if (!lang) return null;

        if (preguntas){
            return (
                <div className="padre-padre-titulo">
                    <div className="padre-titulo mobile">
                        <div className="titulo destroy-on-mobile">
                            <Volver where="/profile"/>
                        </div>
                        <div className="titulo">
                            <h2>{bText[lang].preguntas.dashboardPreguntas.creacion_preguntas}</h2>
                        </div>
                        {/* <div className="titulo">
                            <NavLink to={path.crear_pregunta}>
                                <button className="boton-arriba">New Question</button>
                            </NavLink>
                        </div> */}
                    </div>
                    <div className="">
                        <Preguntas 
                            preguntas={preguntas} 
                            editPregunta={this.props.editPregunta} 
                            deletePregunta={this.props.deletePregunta}
                            userLevel={userLevel}
                            lang={lang}
                        />
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Cargando...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        preguntas: state.firestore.ordered.preguntas,
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel,
        lang: state.firebase.profile.lang,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        deletePregunta: (id) => dispatch(deletePregunta(id)),
        editPregunta: (pregunta) => dispatch(editPregunta(pregunta)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([{ collection: "preguntas", orderBy: ["createdAt", "desc"]}])
)(DashboardPreguntas)
