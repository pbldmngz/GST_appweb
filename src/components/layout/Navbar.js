import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//<div className=""> ==> <div className="container"> to center
const Navbar = (props) => {
    var { path } = require('../../config/config');
    const {auth, profile} = props
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    const initials = auth.uid ? profile.initials : "GST";
    //<Link to="/" className="brand-logo"> para centrarlo

    return (
        <nav className="navbar">
            <ul>
                <div className="navbar-list">
                    <div className="perfil">
                        <Link to={path.profile} className="center-box">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </div>
                    
                    <div className="options"><li>{links}</li></div>
                </div>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);