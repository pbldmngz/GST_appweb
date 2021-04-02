import './style/Tarjeta.scss';
import React from 'react';

const Tarjeta = ({props}) => {
    //Warning: Each child in a list should have a unique "key" prop.
    return (
        <div className="Tarjeta" key={ props.id }>
            <div className="Tarjeta-superior">
                <div className="Tarjeta-superior-izq">{ props.titulo }</div>
                <div className="Tarjeta-superior-der">{ props.alerta }</div>
            </div>
            <div className="Tarjeta-inferior">
                <div className="Tarjeta-inferior-auditor"> Auditor: { props.auditor }</div>
                <div className="Tarjeta-inferior-fecha">Fecha: { props.fecha }</div>
            </div>
        </div>
    );
}

export default Tarjeta;
