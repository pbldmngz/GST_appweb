import React, { Component } from 'react'
import {createAuditoria} from '../../store/actions/auditoriaActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'

class CrearAuditoria extends Component {
    state = {
        auditoria: "",
        auditor: "",
        fecha_inicio: "",
        fecha_fin: "",
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
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Crear auditoria</h5>
                    <div className="input-field">
                        <label htmlFor="auditoria">Nombre de la auditoria</label>
                        <input type="text" id='auditoria' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="auditor">Auditor</label>
                        <input type="text" id='auditor' onChange={this.handleChange} />
                    </div>

                    <button className="btn blue lighten-1 z-depth-0">Crear</button>
                    <div className="center red-text">
                        {/* {authError ? <p>{authError}</p> : null} */}
                    </div>
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
        createAuditoria: (auditoria) => dispatch(createAuditoria(auditoria))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CrearAuditoria)
