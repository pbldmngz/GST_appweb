import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { directions } from "../../config/config"
import { bText } from "../../config/language";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TarjetaPregunta(props) {
	var { path } = directions
	// Se tienen que añadir:
	// - Añadir botones para borrar/editar una pregunta, con un "¿estás seguro?"
	// Pueden hacerlo haciendo unos divs | ----- | - | flex, no soy el experto
	const { pregunta, userLevel, lang } = props;

	// if (!lang) return null;

	// const bText = require("../../config/language");

	// console.log("userLevel on tarjeta", userLevel)

	// En cierto modo, ni siquiera tiene caso esto, los usuarios normales no llegarían aquí
	const botones =
		userLevel === 0 ? (
			<div className="button-group">
				<Link to={path.editar_pregunta + "/" + pregunta.id}>
					<div className="boton">
						<FontAwesomeIcon icon={faEdit} />
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
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
				</Link>
			</div>
		) : null;

		const categoria = {
			1: "A",
			2: "B",
			3: "C",
			4: "D",
		}

		const react_plan = {
			0: bText[lang].preguntas.crearPregunta.fix,
			1: bText[lang].preguntas.crearPregunta.contramedidas_temporales,
			2: bText[lang].preguntas.crearPregunta.parar_produccion,
		}

		const [open, setOpen] = React.useState(false);

		const handleClickOpen = () => {
			setOpen(true);
		};

		const handleClose = () => {
			setOpen(false);
		};

		const maxQuestionLength = 60;

	return (
		<div className="">
			<div className="tarjeta-pregunta" key={pregunta.id}>

				<div className="tarjeta-pregunta-half1 hover-cursor" onClick={handleClickOpen}>

					<span className="">
						{pregunta[lang].length > maxQuestionLength
							? pregunta[lang].substr(0, maxQuestionLength) + "..."
							: pregunta[lang]}
					</span>
					<p className="">
						{pregunta.description.length > maxQuestionLength*2
							? pregunta.description.substr(0, maxQuestionLength*2) + "..."
							: pregunta.description}
					</p>
					<p className="">
						{react_plan[pregunta.reaction_plan]}
					</p>

				</div>
				<div className="tarjeta-pregunta-half2">
					<div className="center-box">
						{botones}
					</div>

				</div>

			</div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{"Justificaciones a esta pregunta####"}</DialogTitle>
				<DialogContent className="dialog-content">
					<DialogContentText>
					{pregunta.english}###
					</DialogContentText>
					<DialogContentText>
						<span className="dialog-span">
							Descripción: 
						</span>
						<p className="dialog-p">
							{pregunta.description}###EEEEEEEEEEEEEEEEEEEEEEE##########
						</p>
					</DialogContentText>
					<DialogContentText>
						<span className="dialog-span">
							Capa:
						</span>
						<p className="dialog-p">
							{categoria[pregunta.category]}
						</p>
					</DialogContentText>
					<DialogContentText>
						<span className="dialog-span">
							Plan de reacción: 
						</span>
						<p className="dialog-p">
							{pregunta.reaction_plan}
						</p>
					</DialogContentText>
					<DialogContentText>
						<span className="dialog-span">
							Creado por:
						</span>
						<p className="dialog-p">
							{pregunta.createdBy}
						</p>
					</DialogContentText>
					<DialogContentText>
						<span className="dialog-span">
							Creado:
						</span>
						<p className="dialog-p">
							{moment(pregunta.createdAt.toDate()).fromNow()}
						</p>
					</DialogContentText>
				</DialogContent>
				

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Aceptar###
            		</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
