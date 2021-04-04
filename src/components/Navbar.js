import React from 'react';
import '../style/Navbar.css';
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <ul className="nav">
                    <li><NavLink to='/areas'>Areas</NavLink></li>
                    <li><NavLink to='/auditorias'>Auditorias</NavLink></li>
                    <li>Volver</li>
                    <li><Link className="nav-header" to="/">GST-APP</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar