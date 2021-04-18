import React, { Component, useState } from 'react'
import { createPregunta } from '../../store/actions/preguntaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


class CrearPregunta extends Component {
    state = {
        category: 5,
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
        console.log(e)
        this.setState({
            category: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.createPregunta(this.state)
        this.props.history.push("/preguntas"); //Esto se cambiará según el contexto
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Crear pregunta</h5>
                    <div className="input-field">
                        <label htmlFor="lang.english">Pregunta</label>
                        <input type="text" id='english' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text" id='description' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="action_plan">Plan de reacción</label>
                        <input type="text" id='reaction_plan' onChange={this.handleChange} />
                    </div>
                    <div className="">
                        <InputLabel id="select-level">Categoría</InputLabel>
                        <Select labelId="select-level" id="level" value={this.state.category} onChange={this.handleChangeSelect}>
                            <MenuItem value={5}>E</MenuItem>
                            <MenuItem value={4}>D</MenuItem>
                            <MenuItem value={3}>C</MenuItem>
                            <MenuItem value={2}>B</MenuItem>
                            <MenuItem value={1}>A</MenuItem>
                        </Select>
                    </div>

                    <button className="btn blue lighten-1 z-depth-0">Crear</button>
                </form>
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
        createPregunta: (pregunta) => dispatch(createPregunta(pregunta))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CrearPregunta)
