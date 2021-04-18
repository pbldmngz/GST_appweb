import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router';
import PreguntaGrafica from './PreguntaGrafica'
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DetallesPregunta = (props) => {
    // const id = "igwDVTQR3LedpGldpPe8";
    // console.log("Esto es ID", id)
    //Esto puede servir de filtro para la búsqueda de preguntas
    // if (!auth.uid) return <Redirect to="/signin" />
    const { pregunta } = props

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const count = {
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

    const justificaciones = pregunta.respuestas.map(pregunta => {
        return (
            <DialogContentText>{pregunta.justificacion}</DialogContentText>
        )
    })

    

    // console.log("Esto son la respuestas:", justificaciones)
    // const pregunta = {}
    // const preguntaRespuestas = [] //Array de diccionarios
    console.log("count:", open)
    // { console.log("login pregunta --> DePre", pregunta) }
    if (pregunta) {
        return (
            <div className="container">
                <div className=" card x-depth-0 detalles-pregunta destroy-overflow">
                    <div className="card-content-custom grey-text text-darken-3 main-container ">
                        <div className="">
                            <span className="card-title">{pregunta.english}</span>
                            <p><b>Descripción: </b>{pregunta.description}</p>
                            <p><b>Categoría: </b>{pregunta.category}</p>
                            <p><b>Plan de reacción: </b>{pregunta.reaction_plan}</p>
                            <p><b>Creado por: </b>{pregunta.createdBy}</p>
                            <p><b>Creado: </b>{moment(pregunta.createdAt.toDate()).fromNow()}</p>
                        </div>
                        <div className="graph">
                            <PreguntaGrafica count={count} />
                            <div className="ver-respuestas">
                                <button className="btn  blue lighten-1 z-depth-0" onClick={handleClickOpen}>Ver respuestas</button>
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
    // const id = ownProps.match.params.id;
    // const preguntas = state.firestore.data.preguntas;
    // const pregunta = preguntas ? preguntas[id] : null;
    return {
        // pregunta: pregunta,
        auth: state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "preguntas" }
    ])
)(DetallesPregunta)