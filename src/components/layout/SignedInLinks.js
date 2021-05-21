import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    var { path, pathName } = require('../../config/config');
    
    
    return (
        <ul className="">
            <li></li>
            {/* <li><NavLink to={path.crear_auditoria} className="">{pathName.crear_auditoria}</NavLink></li> */}
            {/* <li><NavLink to={path.preguntas} className="">{pathName.preguntas}</NavLink></li> */}
            {/* <li><NavLink to={path.change_password} className="">{pathName.change_password}</NavLink></li> */}
            {/* <li><NavLink to={path.sign_up} className="">{pathName.sign_up}</NavLink></li> */}
            <li><a onClick={() => {
                props.signOut();
                // props.history.push("/")
            }}>Log Out</a></li>
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