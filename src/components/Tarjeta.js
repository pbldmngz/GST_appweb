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
    } else if (props.auditoria){
        console.log("Creando tarjeta de Auditoría");
        const urgencia = "#"; //Ve va a tener que calcular comparando las fechas de vencimiento y de hoy
        return (
            <div onClick={() => {
                console.log("Clicked on ID:", props._id);
                changeParams({
                    collection: "preguntas",
                    filter: {
                        "_id": {
                            "$in": props.preguntas
                        }
                    }
                })
            }} className="Tarjeta" key={props._id}>
                <div className="Tarjeta-superior">
                    <div className="Tarjeta-superior-izq">{props.auditoria}</div>
                    <div className="Tarjeta-superior-der">{urgencia}</div>
                </div>
                <div className="Tarjeta-inferior">
                    <div className="Tarjeta-inferior-auditor"> Auditor: {props.auditor}</div>
                    <div className="Tarjeta-inferior-fecha">Fecha: {props.fecha_fin}</div>
                </div>
            </div>
        );
    }
    //Probablemente serán ahora tarjetas de preguntas
    else if (props.lang) {
        console.log("Creando tarjeta de Pregunta");
        return (
            <div className="TarjetaPregunta" key={props._id}>
                <div className="TarjetaPregunta-container">
                    <div className="TarjetaPregunta-izq">
                        <div className="Tarjeta-superior">
                            <div className="Tarjeta-superior-izq">{props.lang.english}</div>
                            <div className="Tarjeta-superior-der">{props.category}</div>
                        </div>
                        <div className="Tarjeta-inferior">
                            <div className="Tarjeta-inferior-auditor"> Auditor: {props.descripción}</div>
                            <div className="Tarjeta-inferior-fecha">Fecha: {props.reaction_plan}</div>
                        </div>
                    </div>
                    <div className="TarjetaPregunta-der">
                        <div className="EditButton"><button onClick={
                            () => { console.log("Click en EDIT, pregunta con ID:", props._id) }
                        }>Edit</button></div>
                        <div className="DeleteButton"><button onClick={
                            () => { console.log("Click en DELETE, pregunta con ID:", props._id)}
                        }>Delete</button></div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}

export default Tarjeta;
