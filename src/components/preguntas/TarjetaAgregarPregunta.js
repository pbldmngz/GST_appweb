import React from 'react';
import { Link } from "react-router-dom";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TarjetaAgregarPregunta = () => {
	return (
		<Link to="/crear-pregunta" className="tarjeta-pregunta center-box">
			<div className="add-symbol">
				<FontAwesomeIcon size='5x' icon={faPlus} />
			</div>
		</Link>
	);
}

export default TarjetaAgregarPregunta;
