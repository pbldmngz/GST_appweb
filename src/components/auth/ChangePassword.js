import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'
import firebase from 'firebase'
import { timeSaturday } from 'plotly.js-basic-dist';
import Volver from '../util/Volver'

require('firebase/auth')

class ChangePassword extends Component {

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    changePassword = (currentPassword, newPassword) => {
        // Y no olvides el CSV
        // https://www.npmjs.com/package/react-csv-reader
        // https://www.npmjs.com/package/react-csv

        this.reauthenticate(currentPassword)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    console.log("Password updated!");
                    this.props.history.push('/')
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
        console.log(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            // console.log("todo bien, bracias bro", this.state)
            this.changePassword(this.state.currentPassword, this.state.newPassword)
        }
        else {
            // console.log("constraseñas no coinciden")
            this.setState({
                authError: {
                    code: "password missmatch",
                    message: "Las contraseñas no coinciden, cámbielas y pruebe otra vez"
                }
            })
            // console.log("se tiró un error", this.state.authError)
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
        const bText = require('../../config/language');
        if (!auth.uid) return <Redirect to="/signin" />

        if (!lang) return null;

        // console.log("Rednder State", this.state)



        return (
            <div className="">
                <div className="padre-titulo">
                    <div className="titulo">
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
                            this.props.history.push("/")
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