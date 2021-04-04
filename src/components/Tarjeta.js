import '../style/Tarjeta.scss';
import React from 'react';

const Tarjeta = ({ props, changeParams}) => {
    //Warning: Each child in a list should have a unique "key" prop.
    //console.log(props.area)

    //Aparentemente por el padding de la tarjeta, se desnivela a cada linea de texto que entra
    //Pero en realidad no importa porque no se planea mezclarlas
    if (props.area){
        console.log("Creando tarjeta de Área");
        return (
            <div onClick={() => {
                console.log("Clicked on ID:", props._id);
                changeParams({
                    collection: "auditorias",
                    filter: {
                        "_id": {
                            "$in": props.auditorias
                        }
                    }
            })}} className="Tarjeta" key={props.id}>
                <div className="TarjetaArea">{props.area}</div>
            </div>
        );
    } else {
        console.log("Creando tarjeta de Auditoría");
        return (
            <div className="Tarjeta" key={props._id}>
                <div className="Tarjeta-superior">
                    <div className="Tarjeta-superior-izq">{props.auditoria}</div>
                    <div className="Tarjeta-superior-der">#</div>
                </div>
                <div className="Tarjeta-inferior">
                    <div className="Tarjeta-inferior-auditor"> Auditor: {props.auditor}</div>
                    <div className="Tarjeta-inferior-fecha">Fecha: {props.fecha_fin}</div>
                </div>
            </div>
        );
    }
}

export default Tarjeta;
