import React, { Component, useState } from 'react'
import { createAuditoria } from '../../store/actions/auditoriaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import DatePicker from "react-datepicker";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import DatePicker from 'react-datepicker/dist/react-datepicker'

//Esta madre no sirve, adáptenlo

import "react-datepicker/dist/react-datepicker.css";

class ResponderAuditoria extends Component {
    state = {
        auditoria: "",
        auditor: "",
        area: "",
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        preguntas: []
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.createAuditoria(this.state)
        this.props.history.push("/"); //Esto se cambiará según el contexto
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />


        //Se tiene que buscar preguntas por ID, 
        // estas ID están en auditorias.preguntas en un array
        const pre = [
            {
                english: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident?",
                id: "1"
            },
            {
                english: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                id: "2"
            }
        ]

        return (
            <div className="container">
                <div className="card x-depth-0">
                    <form className="white section" onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Responder auditoria</h5>
                        {pre && pre.map(pregunta => {
                            return (
                                <div className="pregunta">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">{pregunta.english}</FormLabel>

                                        <RadioGroup className="radio-group" row aria-label="gender" name="gender1" id={"radio-" + pregunta.id} onChange={this.handleChange}>
                                            <FormControlLabel className="radio-button" value="Sí" control={<Radio />} label="Sí" />
                                            <FormControlLabel className="radio-button" value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )
                        })}
                        <button className="btn blue lighten-1 z-depth-0 ">Crear</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ResponderAuditoria)
