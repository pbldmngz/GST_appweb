import React, { Component } from 'react'
import Auditorias from './Auditorias'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Volver from '../util/Volver'

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
        
        const { auditorias, respuestas, auth, userLevel, lang } = this.props
        const text = require('../../config/language');
        

        if (!auth.uid) return <Redirect to="/signin"/>
        if (!lang) return null;
        // if (userLevel != 0) return <Redirect to="/" />
        // console.log("userLevel: ", userLevel)
        // console.log("respuestas", respuestas)
        // if (!lang) return null;


        // ---> Con esto los usuarios no ven las que ya respondieron <---
        // Se podría mejorar mandando un prop de que ya está resuelta
        // hacia la tarjeta, pero se me hace mucha bronca porque luego se tendrían
        // Que mandar al fondo. En todo caso puedo hacer una vista de auditorias YA HECHAS
        var filteredAuditorias = auditorias;

        if (auditorias && userLevel != 0 && respuestas) {
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
                auditorias && auditorias.filter(aud => alreadyDone.includes(aud.id))
            ) : (
                auditorias && auditorias.filter(aud => !alreadyDone.includes(aud.id))
            );

            filteredAuditorias = filteredAuditorias.filter(aud => aud.minCategory >= userLevel)
        }
        var { path, pathName } = require('../../config/config');
        
        const menuItems = (userLevel === 0) ? (
            <Select labelId="select-filter" id="filter" value={this.state.filter} onChange={this.handleChangeSelect}>
                <MenuItem value={0}>{text[lang].auditorias.dashboardAuditorias.ordenar_fecha}</MenuItem>
                <MenuItem value={1}>{text[lang].auditorias.dashboardAuditorias.agrupar_areas}</MenuItem>
            </Select>
        ) : (
                <Select labelId="select-filter" id="filter" value={this.state.filter} onChange={this.handleChangeSelect}>
                    <MenuItem value={0}>{text[lang].auditorias.dashboardAuditorias.ordenar_fecha}</MenuItem>
                    <MenuItem value={2}>{text[lang].auditorias.dashboardAuditorias.mostrar_realizados}</MenuItem>
                </Select>
        );
        // const botonReturn = (userLevel === 0) ? (
        //     <div className="dashboard-extra-space">{text[lang].return}</div>
        // ): null;

        if (filteredAuditorias) {
            return (
                <div className="padre-padre-titulo">
                    <div className="padre-titulo mobile">
                        <div className="titulo destroy-on-mobile">
                            <Volver/>
                        </div>
                        <div className="titulo">
                            <h2>{text[lang].auditorias.dashboardAuditorias.auditorias}</h2>
                        </div>
                        <div className="titulo">
                            <InputLabel id="select-filter">{text[lang].auditorias.dashboardAuditorias.vista}</InputLabel>
                            {menuItems}
                        </div>
                    </div>
                    <div className="">
                        <Auditorias
                            auditorias={filteredAuditorias}
                            userLevel={userLevel}
                            alreadyDone={(this.state.filter === 2)}
                            lang={lang}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>{text[lang].cargando}</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    // console.log("Status", state)
    return {
        auditorias: state.firestore.ordered.auditorias,
        respuestas: state.firestore.ordered.respuestas,
        lang: state.firebase.profile.lang,
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "auditorias", orderBy: ["fecha_fin", "asc"]}, {collection:"respuestas"}])
)(DashboardAuditorias)
