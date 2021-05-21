import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { signUp } from '../../store/actions/authActions'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Logo_GST from '../../styles/imgs/Logo-GST.png'
import Volver from '../util/Volver'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        level: 4,
        lang: "spanish",
    }
    handleChange = (e) => {
        // console.log(e)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChangeSelect = (e) => {
        // console.log(e)
        this.setState({
            level: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

    render() {
        const { auth, authError, lang, userLevel } = this.props;
        

        if (!auth.uid) return <Redirect to="/signin" />
        if (userLevel && userLevel !==0) return <Redirect to="/" />

        const bText = require('../../config/language');

        return (
            <div className="">
                <div className="padre-titulo">
                    <div className="titulo">
                        <Volver where="/profile"/>
                    </div>
                    <div className="titulo">
                        <h2 className="titulo">{bText[lang].auth.signUp.registrar_auditor}</h2>
                    </div>

                </div>
                <div className="form-1">
                    <div className="form-2">
                        <form className="" onSubmit={this.handleSubmit}>
                            <div className="date-container">
                                <div className="input-field-1-2">
                                    <label htmlFor="firstName"></label>
                                    <input type="text" id='firstName' placeholder={bText[lang].auth.signUp.nombre} onChange={this.handleChange} />
                                </div>
                                {/* <i class="lname"></i> */}
                                <div className="input-field-3-4">
                                    <label htmlFor="lastName"></label>
                                    <input type="text" id='lastName' placeholder={bText[lang].auth.signUp.apellido} onChange={this.handleChange} />
                                </div>
                            </div>
                            
                            <div className="input-field">
                                <label htmlFor="email"></label>
                                <input type="email" id='email' placeholder={bText[lang].auth.signUp.correo} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password"></label>
                                <input type="password" id='password' placeholder={bText[lang].auth.signUp.contrasena} onChange={this.handleChange} />
                            </div>
                            <div className="center-box">
                                <div className="footer-single-flex">
                                    <InputLabel id="select-level">{bText[lang].auth.signUp.capa}</InputLabel>
                                    <Select
                                        labelId="select-level"
                                        id="level"
                                        value={this.state.level}
                                        onChange={this.handleChangeSelect}
                                        style={{width: `${100}px`}}
                                    >
                                        <MenuItem value={4}>A</MenuItem>
                                        <MenuItem value={3}>B</MenuItem>
                                        <MenuItem value={2}>C</MenuItem>
                                        <MenuItem value={1}>D</MenuItem>
                                        <MenuItem value={0}>Admin</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer-single">
                    <button className="add-question">{bText[lang].auth.signUp.registrar}</button>
                </div>
                <div className="footer-single">
                    {authError ? <p>{authError}</p> : null}
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel,
        authError: state.auth.authError,
        lang: state.firebase.profile.lang,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
