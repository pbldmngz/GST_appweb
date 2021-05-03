import React from 'react'
import TarjetaAuditoria from './TarjetaAuditoria'
import {Link} from 'react-router-dom'

export default function Auditorias(props) {
    const { userLevel, auditorias, alreadyDone } = props
    var { path } = require('../../config/config');

    const refLink = (userLevel === 0) ? path.detalles_preguntas_auditoria : path.responder_auditoria;

    return (
        
        <div className="box">
            {auditorias && auditorias.map(auditoria => {
                const retThis = (alreadyDone) ? (
                    <TarjetaAuditoria
                        auditoria={auditoria}
                        userLevel={userLevel}
                        alreadyDone={alreadyDone}
                    />
                ) : (
                    <Link to={refLink + "/" + auditoria.id} key={auditoria.id} >
                        <TarjetaAuditoria
                            auditoria={auditoria}
                            userLevel={userLevel}
                            alreadyDone={alreadyDone}
                        />
                    </Link>
                )
                return retThis
            })}

            <div className="width">
                <button className="regreso">Return</button>
            </div>
        </div>
    )
}
