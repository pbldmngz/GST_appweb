import React from 'react';
import { Link } from "react-router-dom";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TarjetaAgregarAuditoria = () => {
	return (
		<Link to="/crear-auditoria" className="tarjeta-auditoría center-box">
			<div className="add-symbol">
				<FontAwesomeIcon size='5x' icon={faPlus} />
			</div>
		</Link>
	);
}

export default TarjetaAgregarAuditoria;
