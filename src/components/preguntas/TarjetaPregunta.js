import React from "react";
import moment from "moment";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function TarjetaPregunta(props) {
  var { path, pathName } = require("../../config/config");
  // Se tienen que añadir:
  // - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
  // Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
  const { pregunta, userLevel, lang } = props;

  // console.log("userLevel on tarjeta", userLevel)

  // En cierto modo, ni siquiera tiene caso esto, los usuarios normales no llegarían aquí
  const botones =
    userLevel == 0 ? (
      <div className="button-group">
        <Link to={path.editar_pregunta + "/" + pregunta.id}>
          <div className="boton">
            <i className="material-icons">edit</i>
          </div>
        </Link>
        <Link to={path.preguntas}>
          <div
            className="boton"
            onClick={() => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showConfirmButton: true,
                denyButtonText: "Don't save",
                confirmButtonText: "Save",
                confirmButtonColor:'#002D73',
                denyButtonColor:'#707070',
              }).then((result) => {
                //  Read more about isConfirmed, isDenied below
                if (result.isConfirmed) {
                  props.deletePregunta(pregunta.id);
                  Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
              //props.deletePregunta(pregunta.id)
            }}
          >
            <i className="material-icons">delete</i>
          </div>
        </Link>
      </div>
    ) : null;

  return (
    <div className="center-box">
      <div className="box" key={pregunta.id}>
        <div className="">
          <Link to={path.detalles_pregunta_auditoria + "/" + pregunta.id}>
            <div className="">
              <span className="">{pregunta[lang]}</span>
              <p>{pregunta.description}</p>
              <p>{pregunta.reaction_plan}</p>
            </div>
          </Link>
          <div className="">{botones}</div>
        </div>
      </div>
    </div>
  );
}
