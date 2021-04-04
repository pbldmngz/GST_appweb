import React from 'react';
import '../style/Navbar.css';
import { Link, NavLink } from 'react-router-dom'

const Navbar = ({defaultFilter, changeParams}) => {
    console.log("defaultFilter:", defaultFilter)
    return (
        <nav>
            <div className="nav-container">
                <ul className="nav">
                    <li key="1"><NavLink to='/areas' onClick={() => { changeParams(defaultFilter)}}>Areas</NavLink></li>
                    <li key="2"><NavLink to='/auditorias'>Auditorias</NavLink></li>
                    <li key="3">Volver</li>
                    <li key="4"><Link className="nav-header" to="/">GST-APP</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar