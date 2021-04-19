import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
//<div className=""> ==> <div className="container"> to center
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Jost&display=swap" rel="stylesheet"></link>
</link>

const Navbar = (props) => {
    const {auth, profile} = props
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    const initials = auth.uid ? profile.initials : "";

    return (
        <nav className="nav-wrapper">
            <div className="nav-bar">
                <Link to="/" className="brand-logo">
                <img src="profile-user.png"></img>
                    <button className="perfil">{initials}</button>
                </Link>
                <div className="right-container">{links}</div>
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