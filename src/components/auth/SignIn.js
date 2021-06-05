import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import { Redirect } from 'react-router';
import Logo_GST from '../../styles/imgs/Logo-GST.png'

import { bText } from "../../config/language";


class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    listenEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleSubmit(event)
        }
    }
    
    render() {

        const {authError, auth} = this.props;

        console.log("This app was developed by this guy: https://github.com/pbldmngz")
        console.log("For any further changes, please send an e-mail to pablo@dominguez.contact")

        const lang = "spanish"

        if (auth.uid) return <Redirect to="/" />
        
        return (
            
            <div className="">
                <div className="padre-titulo">
                    <div className="titulo">

                    </div>
                    <div className="titulo">
                        <img className="logo" src={Logo_GST} alt="gst logo"></img>
                    </div>

                </div>

                <form className="" onSubmit={this.handleSubmit}>
                    <div className="form-1 white">
                        <div className="form-2">

                            <div className="input-field">
                                <label className="uname" htmlFor="email"></label>
                                <input onKeyDown={(e) => this.listenEnter(e)} type="email" id='email' placeholder={bText[lang].auth.signIn.correo} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password"></label>
                                <input onKeyDown={(e) => this.listenEnter(e)} type="password" id='password' placeholder={bText[lang].auth.signIn.contrasena} onChange={this.handleChange} />
                            </div>

                        </div>
                        <div className="footer-single">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                        <div className="footer-single">
                            <button 
                                className="add-question"
                                >{bText[lang].auth.signIn.iniciar_sesion}</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);