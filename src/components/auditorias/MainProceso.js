import React from 'react'
import TarjetaPregunta from './TarjetaProceso'
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
                        <button className="boton-generico"><a  href="/crear-auditoria">Create Audit</a></button>
                </div>

                <div className="titulo">
                    <h2>Main Processes</h2>
                </div>

                <div className="titulo">
                        <button className="boton-generico"><a href="#">Add Auditor</a></button>
                </div>
        </div>
        <div class="container">
        <div className="boxs"><a  href="#">Cutting</a></div>
        <div className="boxs"><a  href="#">Warping</a></div>
        <div className="boxs"><a  href="#">Sizing</a></div>
        </div>
        <div class="container">
        <div className="boxs"><a  href="#">Weaving</a></div>
        <div className="boxs"><a  href="#">DryCan</a></div>
        <div className="boxs"><a  href="#">Scouring</a></div>
        </div>
        <div class="container">
        <div className="boxs"><a  href="#">Coating</a></div>
        <div className="boxs"><a  href="#">Laminating</a></div>
        <div className="boxs"><a  href="#">Printing</a></div>
        </div>
        <div class="container">
        <div className="boxs"><a  href="#">Separating</a></div>
        <div className="boxs"><a  href="#">Sewing</a></div>
        <div className="boxs"><a  href="#">Folding</a></div>
        </div>
        </div>
    )
}