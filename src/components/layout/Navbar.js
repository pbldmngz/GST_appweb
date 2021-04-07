import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
//<div className=""> ==> <div className="container"> to center
const Navbar = (props) => {
    const {auth, profile} = props
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    const initials = auth.uid ? profile.initials : "GST";

    return (
        <nav className="nav-wrapper blue darken-3">
            <div className="">
                <Link to="/" className="brand-logo">
                    <button className="btn-floating btn-large waves-effect waves-light blue gst-logo">{initials}</button>
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