import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';

import {signOut} from '../../store/actions/authActions'

import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//<div className=""> ==> <div className="container"> to center
const Navbar = (props) => {
    var { path } = require('../../config/config');
    const {auth, profile} = props
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    const initials = auth.uid ? profile.initials : "GST";

    return (
        auth.uid ? (
            <div className="padre-titulo nav">
            {/* <ul> */}
                <div className="titulo">
                    <div className="perfil">
                        <Link to={path.profile} className="center-box">
                            <FontAwesomeIcon icon={faUser} />
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
                    }}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                </div>
            </div>
        ) : null
    )
}

{/* <nav className="navbar">
            <ul>
                        
                <div className="navbar-links">
                    <div className="navbar-list">
                        
                        

                        <div className="options"><li>{links}</li></div>

                    </div>
                </div>
            </ul>
        </nav> */}

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