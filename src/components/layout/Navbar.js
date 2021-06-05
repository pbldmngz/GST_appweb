import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';

import {signOut} from '../../store/actions/authActions'

import { faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {directions} from "../../config/config"


const Navbar = (props) => {
    var { path } = directions
    const {auth} = props

    return (
        auth.uid ? (
            <div className="padre-titulo nav">
                <div className="titulo">
                    <div className="perfil">
                        <Link to={path.profile} className="center-box">
                            <FontAwesomeIcon icon={faCog} />
                        </Link>
                    </div>
                </div>

                <div className="titulo">
                    <div className="">
                        <NavLink to={path.auditorias} className="">
                            <b>Global Safety Textiles</b>
                        </NavLink>
                    </div>
                </div>
                
                <div className="titulo">
                    <div className="imout hover-cursor" onClick={() => {

                        props.signOut();
                        if (props.history) {
                            props.history.push("/signin")
                        }
                        
                    }}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                </div>
            </div>
        ) : null
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);