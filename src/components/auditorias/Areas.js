import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CambiarIdioma from '../util/CambiarIdioma'

export default function Preguntas(props) {
    var { path, pathName } = require('../../config/config');
    const text = require('../../config/language');

    const { userLevel, lang } = props

    return (
        <div className="width">
        <div className="cabecera">
                <div className="titulo">
                    <h2>Areas</h2>
                </div>

        </div>
        <div class="container">
        <div className="boxs"><a  href="#">Cutting</a></div>
        <div className="boxs"><a  href="#">Cutting</a></div>
        <div className="boxs"><a  href="#">Cutting</a></div>
        </div>
        </div>
    )
}