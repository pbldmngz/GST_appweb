import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
//<div className=""> ==> <div className="container"> to center

const Navbar = (props) => {
    const {auth, profile} = props
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    const initials = auth.uid ? profile.initials : "";

    return (
        
        <nav className="navbar">
            <div className="topnav">
                <li><a><Link to="/" className="">
                    <button className="perfil">{initials}</button>
                </Link></a></li>
                <li><a><div className="right-container">{links}</div></a></li>
            </div>
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