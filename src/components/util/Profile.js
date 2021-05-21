import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import CambiarIdioma from './CambiarIdioma'
import Volver from '../util/Volver'


class Profile extends Component {
    render() {
        const {profile, lang, auth} = this.props
        const bText = require("../../config/language");
        var { path } = require('../../config/config');
        // console.log("This is profile:", profile)
        if (!auth.uid) return <Redirect to="/signin"/>

        return (
            <div>
                <div className="box">
                    <div className="padre-titulo">
                        <div className="titulo">
                            <Volver/>
                        </div>
                        <div className="titulo">
                            <h2>{profile.firstName + " " + profile.lastName}</h2>
                        </div>
                    </div>

                    <div className="form-1">
                        <div className="form-2">
                            <div className="input-field center-box">
                                Idioma###: <CambiarIdioma/>
                            </div>
                            <div className="input-field center-box">
                                <Link to={path.change_password}>Cambiar contraseña###</Link>
                            </div>
                            <div className="input-field center-box">
                                <Link to={path.sign_up}>Registrar auditor###</Link>
                            </div>
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
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Profile)