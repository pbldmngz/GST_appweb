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

        if (auth.uid) return <Redirect to="/" />
        
        return (
            
            <div className="container">
                <div className="login-container">
                    <img className="logo" src={Logo_GST} alt="gst logo"></img>

                    <form className="upl" onSubmit={this.handleSubmit}>

                        <div className="username">
                            <label className="uname" htmlFor="email"></label>
                            <input type="email" id='email' placeholder="Email" onChange={this.handleChange} />
                        </div>
                        <div className="password">
                            <label htmlFor="password"></label>
                            <input type="password" id='password' placeholder="Password" onChange={this.handleChange} />
                        </div>
                        <div className="Login">
                            <button className="Log">Login</button>
                            <i class="boton2"></i>
                            <div className="center red-text">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div>
                    </form>
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