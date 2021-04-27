import React, { Component } from 'react'
import Auditorias from './Auditorias'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// CSS class "container" centers content

class DashboardAuditorias extends Component {
    state = {
        filter: 0
    }

    handleChangeSelect = (e) => {
        // console.log(e)
        this.setState({
            filter: e.target.value
        })
    }

    getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    render() {
        // console.log(this.props)
        
        const { auditorias, respuestas, auth, userLevel } = this.props

        if (!auth.uid) return <Redirect to="/signin"/>
        // if (userLevel != 0) return <Redirect to="/" />
        // console.log("userLevel: ", userLevel)
        // console.log("respuestas", respuestas)


        // ---> Con esto los usuarios no ven las que ya respondieron <---
        // Se podría mejorar mandando un prop de que ya está resuelta
        // hacia la tarjeta, pero se me hace mucha bronca porque luego se tendrían
        // Que mandar al fondo. En todo caso puedo hacer una vista de auditorias YA HECHAS
        var filteredAuditorias = auditorias;

        if (userLevel != 0 && respuestas) {
            // console.log("0", this.state.filter, respuestas)
            const filtRespuestas = respuestas.filter(res => auth.uid === res.answeredById)

            // console.log("After Filter", this.state.filter, filtRespuestas)
            
            var filtID = {}
            for (let fA in filtRespuestas){
                // console.log("fA", filtRespuestas[fA])
                filtID[filtRespuestas[fA].auditoria] = true
            }
            
            // console.log("2", filtID)

            const alreadyDone = Object.keys(filtID)

            // console.log("3", alreadyDone)

            filteredAuditorias = (this.state.filter === 2) ? (
                auditorias.filter(aud => alreadyDone.includes(aud.id))
            ) : (
                auditorias.filter(aud => !alreadyDone.includes(aud.id))
            );
        }
        var { path, pathName } = require('../../config/config');

        const menuItems = (userLevel === 0) ? (
            <Select labelId="select-filter" id="filter" value={this.state.filter} onChange={this.handleChangeSelect}>
                <MenuItem value={0}>Ordenar por fecha</MenuItem>
                <MenuItem value={1}>Agrupar por áreas</MenuItem>
            </Select>
        ) : (
                <Select labelId="select-filter" id="filter" value={this.state.filter} onChange={this.handleChangeSelect}>
                    <MenuItem value={0}>Ordenar por fecha</MenuItem>
                    <MenuItem value={2}>Mostrar realizados</MenuItem>
                </Select>
        );
        const botonReturn = (userLevel === 0) ? (
            <div className="dashboard-extra-space">Return?</div>
        ): null;

        if (filteredAuditorias) {
            return (
                <div className="dashboard container">
                    <div className="second-navbar">
                        <div className="filter">
                            <InputLabel id="select-filter">Vista</InputLabel>
                            {menuItems}
                        </div>
                        <div className="dashboard-title">
                            {pathName[this.getKeyByValue(path, this.props.match.path)]}
                        </div>
                        {botonReturn}
                    </div>
                    <Auditorias 
                        auditorias={filteredAuditorias} 
                        userLevel={userLevel} 
                        alreadyDone={(this.state.filter === 2)}
                    />
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
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        auditorias: state.firestore.ordered.auditorias,
        respuestas: state.firestore.ordered.respuestas,
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "auditorias", orderBy: ["fecha_fin", "asc"]}, {collection:"respuestas"}])
)(DashboardAuditorias)
