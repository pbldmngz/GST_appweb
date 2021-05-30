import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TarjetaAgregarAuditoria from '../auditorias/TarjetaAgregarAuditoria'
import Volver from '../util/Volver'
import PieChart from '../util/gráficas/PieChart';

import { faTrashAlt, faEdit, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import { deleteArea } from "../../store/actions/areaActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class DashboardAreas extends Component {

    state = {
        open: false,
        count: [
            { id: "no", label: "no", value: 35 },
            { id: "yes", label: "yes", value: 123 }
        ],
    }

    handleClickOpen = (area) => {
        this.setState({
            open: true,
        }, this.preguntaChart(area))

        
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };

    preguntaChart = (area) => {
        var count = {
            yes: 0,
            no: 0,
        }

        console.log("Respuestas:", this.props)

        this.props.respuestas.filter(p => p.area === area).forEach(res => {
            if (res.respuesta === "Sí") {
                count.yes += 1;
            } else if (res.respuesta === "No") {
                count.no += 1;
            }
        });

        this.setState({
            count: [
                { id: "no", label: "no", value: count["no"] },
                { id: "yes", label: "yes", value: count["yes"] }
            ],
            actualText: Math.round((count.no/(count.yes + count.no))*100),
        })
    }

    render() {

        const {areas, userLevel, lang, auth} = this.props

        const bText = require("../../config/language");

        if (!auth.uid) return <Redirect to="signin"/>

        if (userLevel !== 0) return <Redirect to="/"/>

        if (!lang) return null;

        // console.log(this.props.match.params.proceso)

        const procesoFilt = this.props.match.params.proceso

        const avalAreas = (areas && procesoFilt) ? [...areas].filter(a => a.proceso === procesoFilt) : [...areas]

        const whereToGo = (procesoFilt) ? "/procesos" : "/profile";

        // console.log(this.props.match.url)
        const createWProps = (procesoFilt) ? ("/crear-area-props/" + procesoFilt): ("/crear-area");



        



        return (
            <div className="padre-padre-titulo">
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                        <Volver where={whereToGo}/>
                    </div>
                    <div className="titulo">
                        <h2>{bText[lang].area_proceso.areas}</h2>
                    </div>
                </div>
                <div className="arroz-chino">
                    <TarjetaAgregarAuditoria where={createWProps}/>
                    {/* <div className="graph-align">
                        <PieChart data={this.state.count} radius={0.5} innerText={this.state.actualText + "%"} />
                    </div> */}
                    
                    {avalAreas && avalAreas.map(area => {
                        return (
                            <div
                                className="tarjeta-auditoría"
                                key={area.id}
                            >
                                <Link to={"/auditorias/" + (procesoFilt ? procesoFilt + "/" : " /") + area.id} className="tarjeta-proceso-half1">
                                    {area.area}
                                </Link>
                                <div className="tarjeta-auditoría-half2">
                                    <div className="button hover-cursor" onClick={() => this.handleClickOpen(area.id)}>
                                        <FontAwesomeIcon icon={faChartBar} />
                                    </div>
                                    <Link to={"/crear-area/" + area.id} className="button">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <div className="button hover-cursor" onClick={() => {
                                        Swal.fire({
                                            title: "Do you want to save the changes?",
                                            showDenyButton: true,
                                            showConfirmButton: true,
                                            denyButtonText: "Don't save",
                                            confirmButtonText: "Save",
                                        }).then((result) => {
                                            //  Read more about isConfirmed, isDenied below
                                            if (result.isConfirmed) {
                                                this.props.deleteArea(area.id);
                                                Swal.fire("Saved!", "", "success");
                                            } else if (result.isDenied) {
                                                Swal.fire("Changes are not saved", "", "info");
                                            }
                                        });
                                    }}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                

                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" className="popup-title">{"Gráfica global##"}</DialogTitle>
                    <DialogContent className="graph-align-popup">
                        {/* Working1 */}
                        <PieChart data={this.state.count} radius={0.5} innerText={this.state.actualText + "%"} />
                        {/* Working2 */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
    )
    }
}


const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		userLevel: state.firebase.profile.userLevel,
		lang: state.firebase.profile.lang,
		// procesos: state.firestore.ordered.procesos,
        areas: state.firestore.ordered.areas,
        respuestas: state.firestore.ordered.respuestas,
	};
};

const mapDispatchtoProps = (dispatch) => {
    return {
        deleteArea: (id) => dispatch(deleteArea(id)),
    };
};

export default compose(
	connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([{ collection: "areas" }, { collection: "respuestas" }])
)(DashboardAreas);