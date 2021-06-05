import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { bText } from "../../config/language";

import PieChart from '../util/gráficas/PieChart';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DetallesPregunta = (props) => {

    const { pregunta, lang } = props

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var count = {
        yes: 0,
        no: 0
    }

    pregunta.respuestas.forEach(res => {
        if (res.respuesta === "Sí") {
            count.yes += 1;
        } else if (res.respuesta === "No") {
            count.no += 1;
        }
    });

    count = [
        { id: "no", label: "no", value: count["no"] },
        { id: "yes", label: "yes", value: count["yes"] }
    ]

    const actualText = ((count[0]["value"] + count[1]["value"]) !== 0) ? (
        Math.round((count[0]["value"]/(count[0]["value"] + count[1]["value"]))*100)
    ) : (0);

    const justificaciones = pregunta.respuestas.map(pregunta => {
        return (
            <DialogContentText>{pregunta.justificacion}</DialogContentText>
        )
    })

    const categoria = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
    }

    const reaction = (lang) ? ([
        bText[lang].preguntas.crearPregunta.fix,
        bText[lang].preguntas.crearPregunta.contramedidas_temporales,
        bText[lang].preguntas.crearPregunta.parar_produccion,
    ]) : ([
        "###", "###", "###",
    ]);

    if (pregunta.createdAt) {
        return (
            <div className="new-class">
                <div className="tarjeta-pregunta">
                    <div className="arroz-chino only2row">
                        <div className="new-class new-class-2">
                            <p className="card-title"><b>{pregunta[lang]}</b></p>
                            <p className="card-title justify-text "><b>{bText[lang].preguntas.detallesPregunta.descripcion}: </b>{pregunta.description}</p>
                            <p className="card-title"><b>{bText[lang].preguntas.detallesPregunta.categoria}: </b>{categoria[pregunta.category]}</p>
                            <p className="card-title"><b>{bText[lang].preguntas.detallesPregunta.plan_reaccion}: </b>{reaction[pregunta.reaction_plan]}</p>
                        </div>
                        <div className="new-parent">
                            <div className="graph-align">
                                <PieChart data={count ? count : []} radius={0.5} innerText={actualText + "%"}/>
                            </div>
                            <div className="new-class-3">
                                    <button className="aceptar responder" onClick={handleClickOpen}>
                                        {bText[lang].preguntas.detallesPregunta.ver_respuestas}
                                    </button>
                            </div>
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
                    <DialogTitle id="alert-dialog-slide-title">{"Justificaciones a esta pregunta"}</DialogTitle>
                    <DialogContent>
                        {justificaciones}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Cargando...</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // pregunta: pregunta,
        auth: state.firebase.auth,
        lang: state.firebase.profile.lang,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "preguntas" }
    ])
)(DetallesPregunta)