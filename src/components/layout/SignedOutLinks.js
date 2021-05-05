import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    var { path, pathName } = require('../../config/config');
    
    return (
        <ul className="right">
            <li><NavLink to={path.sign_in} className="">{pathName.sign_in}</NavLink></li>
            <li><NavLink to={path.sign_up} className="">{pathName.sign_up}</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;