import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    var { path, pathName } = require('../../config/config');
    
    
    return (
        <ul className="right">
            <li><NavLink to={path.auditorias} className="waves-effect waves-light">{pathName.auditorias}</NavLink></li>
            <li><NavLink to={path.crear_auditoria} className="waves-effect waves-light">{pathName.crear_auditoria}</NavLink></li>
            <li><NavLink to={path.preguntas} className="waves-effect waves-light">{pathName.preguntas}</NavLink></li>
            <li><NavLink to={path.change_password} className="waves-effect waves-light">{pathName.change_password}</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
        </ul>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         signOut: state.auth.signOut
//     }
// }
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(SignedInLinks);