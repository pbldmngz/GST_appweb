import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
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
                <div className="">
                    <div className="perfil">
                        <Link to={path.profile} className="center-box">
                            <li><div className="">{initials}</div></li>
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