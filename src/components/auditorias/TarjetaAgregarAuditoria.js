import React from 'react';
import { Link } from "react-router-dom";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TarjetaAgregarAuditoria = (props) => {

	const { where, hasTrace } = props

	var whereToGo = where ? where : "/crear-auditoria";

	if (hasTrace) {
		whereToGo = "/crear-auditoria-props/" + hasTrace.proceso + "/" + hasTrace.area
	}

	return (
		<Link to={whereToGo} className="tarjeta-auditoría center-box">
			<div className="add-symbol">
				<FontAwesomeIcon size='5x' icon={faPlus} />
			</div>
		</Link>
	);
}

export default TarjetaAgregarAuditoria;
