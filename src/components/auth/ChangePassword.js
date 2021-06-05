import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'
import firebase from 'firebase'
import Volver from '../util/Volver'

import { bText } from "../../config/language";

import Swal from "sweetalert2";

import 'firebase/auth';

class ChangePassword extends Component {

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    changePassword = (currentPassword, newPassword) => {

        const { lang } = this.props

        this.reauthenticate(currentPassword)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    console.log("Password updated!");
                    this.props.history.push('/')
                    Swal.fire(bText[lang].swal.saved)
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                this.setState({
                    authError: error
                })
            });
    }
    changeEmail = (currentPassword, newEmail) => {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {
                console.log("Email updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => {
            this.setState({
                authError: error
            })
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            this.changePassword(this.state.currentPassword, this.state.newPassword)
        }
        else {
            this.setState({
                authError: {
                    code: "password missmatch",
                    message: "Las contraseñas no coinciden, cámbielas y pruebe otra vez"
                }
            })
        }
    }

    componentWillMount() {
        this.setState({
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
            authError: null
        })
    }

    render() {

        const { auth, lang } = this.props

        if (!auth.uid) return <Redirect to="/signin" />

        if (!lang) return null;

        return (
            <div className="">
                <div className="padre-titulo mobile">
                    <div className="titulo destroy-on-mobile">
                        <Volver where="/profile"/>
                    </div>
                    <div className="titulo">
                        <h2 className="titulo">{bText[lang].auth.changePassword.cambiar_contrasena}</h2>
                    </div>

                </div>

                <div className="form-1">
                    <div className="">
                        <form className="" onSubmit={this.handleSubmit}>

                            <div className="form-2">
                                <div className="input-field">
                                    <input 
                                        type="password" 
                                        id='currentPassword' 
                                        name='currentPassword'
                                        placeholder={bText[lang].auth.changePassword.contrasena_actual}
                                        onChange={this.handleChange} 
                                    />
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        id='newPassword'
                                        name='newPassword'
                                        placeholder={bText[lang].auth.changePassword.contrasena_nueva}
                                        onChange={this.handleChange} 
                                    />
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        id='newPasswordConfirm'
                                        name='newPasswordConfirm'
                                        placeholder={bText[lang].auth.changePassword.repite_contrasena}
                                        onChange={this.handleChange} 
                                    />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="footer">
                    <div className="center-box">
                        <button className="cancelar" onClick={() => {
                            this.props.history.push("/profile")
                        }}>
                            {bText[lang].auth.changePassword.cancelar}
                        </button>
                    </div>
                    <div className="center-box">
                        <button className="aceptar" onClick={this.handleSubmit}>
                            {bText[lang].auth.changePassword.aceptar}
                        </button>
                    </div>
                </div>

                <div className="footer-single">
                    {this.state.authError ? <p>{this.state.authError.message}</p> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        lang: state.firebase.profile.lang,
    }
}

export default connect(mapStateToProps)(ChangePassword)