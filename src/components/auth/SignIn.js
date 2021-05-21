import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import { Redirect } from 'react-router';
import Logo_GST from '../../styles/imgs/Logo-GST.png'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)




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
    
    render() {
        const {authError, auth} = this.props;

        const lang = "spanish"

        const bText = require('../../config/language');

        if (auth.uid) return <Redirect to="/" />
        
        return (
            
            <div className="">
                <div className="padre-titulo">
                    <div className="titulo">
                        {/* <Volver /> */}
                    </div>
                    <div className="titulo">
                        {/* <h2 className="titulo">##########</h2> */}
                        <img className="logo" src={Logo_GST} alt="gst logo"></img>
                    </div>

                </div>
                <div className="form-1 white">
                    <div className="form-2">
                        <form className="" onSubmit={this.handleSubmit}>

                            <div className="input-field">
                                <label className="uname" htmlFor="email"></label>
                                <input type="email" id='email' placeholder={bText[lang].auth.signIn.correo} onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password"></label>
                                <input type="password" id='password' placeholder={bText[lang].auth.signIn.contrasena} onChange={this.handleChange} />
                            </div>

                        </form>
                        <div className="footer-single">
                            <button className="add-question" onClick={this.handleSubmit}>{bText[lang].auth.signIn.iniciar_sesion}</button>
                        </div>
                        <div className="footer-single">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </div>

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