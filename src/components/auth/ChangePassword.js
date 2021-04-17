import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'
import firebase from 'firebase'
import { timeSaturday } from 'plotly.js-basic-dist';
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
        
        const {auth} = this.props

        // console.log("Rednder State", this.state)

        if (!auth.uid) return <Redirect to="/signin" />

        return (
            <div className="container extra-margin">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Cambiar contraseña</h5>
                    <div className="input-field">
                        <label htmlFor="currentPassword">Contraseña actual</label>
                        <input type="password" id='currentPassword' name='currentPassword' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="newPassword">Contraseña nueva</label>
                        <input type="password" id='newPassword' name='newPassword' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="newPasswordConfirm">Repite la contraseña nueva</label>
                        <input type="password" id='newPasswordConfirm' name='newPasswordConfirm' onChange={this.handleChange} />
                    </div>

                    <button className="btn blue lighten-1 z-depth-0">Aceptar</button>
                    <div className="center red-text">
                        {this.state.authError ? <p>{this.state.authError.message}</p> : null}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}


export default connect(mapStateToProps)(ChangePassword)