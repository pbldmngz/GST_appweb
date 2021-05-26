import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import CambiarIdioma from './CambiarIdioma'
import Volver from '../util/Volver'


class Profile extends Component {
    render() {
        const {profile, userLevel, lang, auth} = this.props
        const bText = require("../../config/language");
        var { path } = require('../../config/config');
        // console.log("This is profile:", profile)
        if (!auth.uid) return <Redirect to="/signin"/>

        if (!lang) return null;

        return (
            <div>
                <div className="box">
                    <div className="padre-titulo mobile">
                        <div className="titulo destroy-on-mobile">
                            <Volver/>
                        </div>
                        <div className="titulo">
                            <h2>{bText[lang].opciones.opciones}</h2>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <div className="form-1 overwrite-margin center-box default-height">
                                {bText[lang].opciones.idioma + ":"} <CambiarIdioma/>
                            </div>
                            <Link
                                className="form-1 overwrite-margin center-box default-height" 
                                to={path.change_password}>{bText[lang].opciones.cambiar_contrasena}
                            </Link>
                            {(userLevel === 0) ? (
                                <div>
                                        <Link
                                            className="form-1 overwrite-margin center-box default-height"
                                            to={path.sign_up}>{bText[lang].opciones.registrar_auditor}
                                        </Link>
                                        <Link
                                            className="form-1 overwrite-margin center-box default-height" 
                                            to={path.preguntas}>{bText[lang].opciones.preguntas}
                                        </Link>
                                        {/* <Link
                                            className="form-1 overwrite-margin center-box default-height" 
                                            to="/crear-area">{bText[lang].area_proceso.crear_area}
                                        </Link> */}
                                        <Link
                                            className="form-1 overwrite-margin center-box default-height" 
                                            to="/procesos">Procesos##
                                        </Link>
                                        <Link
                                            className="form-1 overwrite-margin center-box default-height"
                                            to="/areas">Areas##
                                        </Link>
                                </div>
                                
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        profile: state.firebase.profile,
        lang: state.firebase.profile.lang,
        userLevel: state.firebase.profile.userLevel,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Profile)