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
import { bText } from "../../config/language";


class DashboardAuditorias extends Component {

    state = {
        filter: 0
    }

    handleChangeSelect = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    render() {
        console.log("This app was developed by this guy: https://github.com/pbldmngz")
        console.log("For any further changes, please send an e-mail to pablo@dominguez.contact")
        
        const { auditorias, respuestas, auth, userLevel, lang, users } = this.props

        if (!auth.uid) return <Redirect to="/signin"/>
        if (!lang) return null;

        const sortByKey = (array, key) => {
            return array.sort(function (a, b) {
                var x = a[key].toString(); var y = b[key].toString();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        const rightNow = new Date();

        var whatAuditorias = auditorias ? (
            (userLevel === 0) ? [...auditorias] : [...auditorias].filter(a => a.fecha_fin.toDate() > rightNow)
        ) : []

        if (this.props.match.params.proceso && this.props.match.params.proceso !== " ") {
            whatAuditorias = whatAuditorias.filter(a => a.proceso === this.props.match.params.proceso)
        }

        if (this.props.match.params.area) {
            whatAuditorias = whatAuditorias.filter(a => a.area === this.props.match.params.area)
        }
    
        var orderedAudit = whatAuditorias ? [...whatAuditorias] : [];

        var filter_value = "fecha_fin";

        switch (this.state.filter) {
            case 0:
                filter_value = "fecha_fin";
                break;
            case 1:
                this.props.history.push("/procesos")
                break;
            case 3:
                filter_value = "createdAt";
                break;
            case 4:
                filter_value = "area";
                break;
            case 5:
                filter_value = "proceso";
                break;
            case 6:
                filter_value = "auditor";
                break;
            case 7:
                filter_value = "fecha_inicio";
                break;
            default:
                filter_value = "fecha_fin";
                break;
        }
    
        orderedAudit = sortByKey(orderedAudit, filter_value)
        

        var filteredAuditorias = orderedAudit;

        if (this.state.filter === 3) {
            filteredAuditorias = filteredAuditorias.reverse()
        }

        if (auditorias && userLevel !== 0 && respuestas) {

            const filtRespuestas = respuestas.filter(res => auth.uid === res.answeredById)
            
            var filtID = {}
            for (let fA in filtRespuestas){
                filtID[filtRespuestas[fA].auditoria] = true
            }

            const alreadyDone = Object.keys(filtID)

            filteredAuditorias = (this.state.filter === 2) ? (
                orderedAudit && orderedAudit.filter(aud => alreadyDone.includes(aud.id))
            ) : (
                orderedAudit && orderedAudit.filter(aud => !alreadyDone.includes(aud.id))
            );

        }
        
        const menuItems = (userLevel === 0) ? (
            <Select labelId="select-filter" id="filter" value={this.state.filter} onChange={this.handleChangeSelect}>
                <MenuItem value={7}>{bText[lang].auditorias.dashboardAuditorias.fecha_inicio}</MenuItem>
                <MenuItem value={0}>{bText[lang].auditorias.dashboardAuditorias.fecha_expiracion}</MenuItem>
                <MenuItem value={3}>{bText[lang].auditorias.dashboardAuditorias.fecha_creacion}</MenuItem>
                <MenuItem value={4}>{bText[lang].auditorias.dashboardAuditorias.area}</MenuItem>
                <MenuItem value={5}>{bText[lang].auditorias.dashboardAuditorias.proceso}</MenuItem>
                <MenuItem value={6}>{bText[lang].auditorias.dashboardAuditorias.auditor}</MenuItem>
                <MenuItem value={1}>{bText[lang].auditorias.dashboardAuditorias.agrupar_areas}</MenuItem>
            </Select>
        ) : (
                <Select labelId="select-filter" id="filter" value={this.state.filter} onChange={this.handleChangeSelect}>
                    <MenuItem value={0}>{bText[lang].auditorias.dashboardAuditorias.ordenar_fecha}</MenuItem>
                    <MenuItem value={2}>{bText[lang].auditorias.dashboardAuditorias.mostrar_realizados}</MenuItem>
                </Select>
        );

        const whereToGo = this.props.match.params.proceso ? "/areas/" + this.props.match.params.proceso : "/";

        if (filteredAuditorias) {
            return (
                <div className="padre-padre-titulo">
                    <div className="padre-titulo mobile">
                        <div className="titulo destroy-on-mobile">
                            {(this.props.match.params.proceso) ? (
                                <Volver where={whereToGo} />
                            ) : (null)}
                            
                        </div>
                        <div className="titulo">
                            <h2>{bText[lang].auditorias.dashboardAuditorias.auditorias}</h2>
                        </div>
                        <div className="titulo">
                            <InputLabel id="select-filter">{bText[lang].auditorias.dashboardAuditorias.vista}</InputLabel>
                            {menuItems}
                        </div>
                    </div>
                    <div className="">
                        <Auditorias
                            auditorias={filteredAuditorias}
                            userLevel={userLevel}
                            alreadyDone={(this.state.filter === 2)}
                            lang={lang}
                            uid={auth.uid}
                            users={users}
                            hasTrace={(this.props.match.params.proceso) ? this.props.match.params : null}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>{bText[lang].cargando}</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auditorias: state.firestore.ordered.auditorias,
        respuestas: state.firestore.ordered.respuestas,
        users: state.firestore.ordered.users,
        lang: state.firebase.profile.lang,
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "auditorias", orderBy: ["fecha_fin", "asc"]}, {collection:"respuestas"}, {collection:"users"}])
)(DashboardAuditorias)
