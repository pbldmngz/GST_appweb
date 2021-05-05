import React, { Component, useState } from 'react'
import { createPregunta } from '../../store/actions/preguntaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


class CrearPregunta extends Component {
    state = {
        category: 4,
        description: "",
        reaction_plan: "",
        english: "",
        spanish: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeSelect = (e) => {
        // console.log(e)
        this.setState({
            category: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.createPregunta(this.state)
        this.props.history.push("/preguntas"); //Esto se cambiará según el contexto
    }
    render() {
        const { auth, lang } = this.props;
        const bText = require('../../config/language');
        if (!lang) return null;

        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="">{bText[lang].preguntas.crearPregunta.crear_pregunta}</h5>
                    <div className="input-field">
                        <label htmlFor="lang.english">{bText[lang].preguntas.crearPregunta.pregunta}[EN]</label>
                        <input type="text" id='english' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lang.english">{bText[lang].preguntas.crearPregunta.pregunta}[ES]</label>
                        <input type="text" id='spanish' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="descripcion">{bText[lang].preguntas.crearPregunta.descripcion}</label>
                        <input type="text" id='description' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="action_plan">{bText[lang].preguntas.crearPregunta.plan_reaccion}</label>
                        <input type="text" id='reaction_plan' onChange={this.handleChange} />
                    </div>
                    <div className="">
                        <InputLabel id="select-level">{bText[lang].preguntas.crearPregunta.categoria}</InputLabel>
                        <Select labelId="select-level" id="level" value={this.state.category} onChange={this.handleChangeSelect}>
                            <MenuItem value={4}>D</MenuItem>
                            <MenuItem value={3}>C</MenuItem>
                            <MenuItem value={2}>B</MenuItem>
                            <MenuItem value={1}>A</MenuItem>
                        </Select>
                    </div>

                    <button className="">{bText[lang].preguntas.crearPregunta.crear}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Status", state)
    return {
        auth: state.firebase.auth,
        lang: state.firebase.profile.lang,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        createPregunta: (pregunta) => dispatch(createPregunta(pregunta))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CrearPregunta)
