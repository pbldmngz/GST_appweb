import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import { directions } from "../../config/config"
import { bText } from "../../config/language";

import CambiarIdioma from './CambiarIdioma'
import Volver from '../util/Volver'


class Profile extends Component {

    render() {

        const {userLevel, lang, auth} = this.props

        const { path } = directions

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
                            
                            {(userLevel === 0) ? (
                                <div className="extra-margin">
                                    <Link
                                        className="form-1 overwrite-margin center-box default-height"
                                        to="/procesos">{bText[lang].opciones.procesos}
                                    </Link>

                                    <Link
                                        className="form-1 overwrite-margin center-box default-height"
                                        to={path.preguntas}>{bText[lang].opciones.preguntas}
                                    </Link>
                                    
                                    <Link
                                        className="form-1 overwrite-margin center-box default-height"
                                        to={path.sign_up}>{bText[lang].opciones.registrar_auditor}
                                    </Link>
                                </div>
                                
                            ) : null}

                            <Link
                                className="form-1 overwrite-margin center-box default-height"
                                to={path.change_password}>{bText[lang].opciones.cambiar_contrasena}
                            </Link>

                            <div className="form-1 overwrite-margin center-box default-height">
                                {bText[lang].opciones.idioma + ":"} <CambiarIdioma />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.firebase.profile.lang,
        userLevel: state.firebase.profile.userLevel,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Profile)