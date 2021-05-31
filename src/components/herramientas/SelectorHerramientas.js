import React, { Component } from 'react'

import { Link } from "react-router-dom";

export default class SelectorHerramientas extends Component {
    render() {
        return (
            <div>
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                        {/* <Volver where={whereToGo} /> */}
                    </div>
                    <div className="titulo">
                        <h2 className="">
                            {/* {text[lang].auditorias.crearAuditoria.crear_auditoria} */}
                            Herramientas##
                        </h2>
                    </div>
                </div>
                <div className="arroz-chino only2row">
                    <Link className="tarjeta-auditoría center-box">
                        Auditorías###
                    </Link>

                    <Link className="tarjeta-auditoría center-box">
                        Auditores###
                    </Link>

                    <Link className="tarjeta-auditoría center-box">
                        Preguntas###
                    </Link>

                    <Link className="tarjeta-auditoría center-box">
                        Procesos###
                    </Link>
                </div>
            </div>
            
        )
    }
}
