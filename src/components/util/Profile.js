import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CambiarIdioma from './CambiarIdioma'

class Profile extends Component {
    render() {
        const {profile} = this.props
        var { path } = require('../../config/config');
        // console.log("This is profile:", profile)
        return (
            <div>
                <div className="box">
                    <center>
                        <h2>{profile.firstName + " " + profile.lastName}</h2>
                        <div>Idioma: <CambiarIdioma/></div>
                        <Link to={path.change_password}>Cambiar contraseña</Link>
                    </center>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Profile)