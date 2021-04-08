import React, { Component, useState } from 'react'
import { createPregunta } from '../../store/actions/preguntaActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'


class CrearPregunta extends Component {
    state = {
        category: "",
        description: "",
        action_plan: "",
        english: "",
        spanish: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
                        <label htmlFor="category">Categoría</label>
                        {/* Hagan esto un menú, así se pueden pasar letras a números */}
                        <input type="text" id='category' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text" id='description' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="action_plan">Plan de acción</label>
                        <input type="text" id='action_plan' onChange={this.handleChange} />
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
