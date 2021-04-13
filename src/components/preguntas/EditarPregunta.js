import React, { Component, useState } from 'react'
import { editPregunta, getPregunta } from '../../store/actions/preguntaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


class EditarPregunta extends Component {
    state = {
        category: 5,
        description: "",
        reaction_plan: "",
        english: "",
        spanish: "",
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
        // console.log("se supone que se envió", this.state)
        this.props.editPregunta(this.props.match.params.id, this.state)
        this.props.history.push("/preguntas"); //Esto se cambiará según el contexto
    }

    componentWillMount() {
        const id = this.props.match.params.id
        this.props.getPregunta(id).then((res) => {
            // console.log("RES is working", res)
            this.setState({
                category: res.category,
                description: res.description,
                reaction_plan: res.reaction_plan,
                english: res.english,
                spanish: res.spanish,
            })
            // console.log("This is Res", res)
        })
        // console.log("Falta que el texto de los inputs se cambie a lo del state", this.state)
        //Checa el state en la consola, no sale nada

    }

    render() {
        // console.log(this.state)
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Editar pregunta</h5>
                    <div className="">
                        <label htmlFor="lang.english">Pregunta</label>
                        <input type="text" id='english' value={this.state.english} onChange={this.handleChange} />
                    </div>
                    <div className="">
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text" id='description' value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <div className="">
                        <label htmlFor="action_plan">Plan de reacción</label>
                        <input type="text" id='reaction_plan' value={this.state.reaction_plan} onChange={this.handleChange} />
                    </div>
                    <div className="">
                        <InputLabel id="select-level">Categroría</InputLabel>
                        <Select labelId="select-level" id="level" value={this.state.category} onChange={this.handleChangeSelect}>
                            <MenuItem value={5}>E</MenuItem>
                            <MenuItem value={4}>D</MenuItem>
                            <MenuItem value={3}>C</MenuItem>
                            <MenuItem value={2}>B</MenuItem>
                            <MenuItem value={1}>A</MenuItem>
                        </Select>
                    </div>

                    <button className="btn blue lighten-1 z-depth-0">Editar</button>
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
        editPregunta: (id, pregunta) => dispatch(editPregunta(id, pregunta)),
        getPregunta: (id) => dispatch(getPregunta(id))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(EditarPregunta)
