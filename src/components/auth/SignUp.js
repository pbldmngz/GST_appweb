import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { signUp } from '../../store/actions/authActions'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Logo_GST from '../../styles/imgs/Logo-GST.png'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        level: 5,
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
        const { auth, authError, userLevel } = this.props;

        if (!auth.uid) return <Redirect to="/" />
        if (userLevel && userLevel !==0) return <Redirect to="/" />


        return (
            
            <div className="container extra-margin">
                <img className="logo"src = {Logo_GST} alt= "gst logo"></img>
                <form className="white" onSubmit={this.handleSubmit}>
                    <div className="email">
                
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    <div className="passing">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div className="fname">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id='firstName' onChange={this.handleChange} />
                    </div>
                    <i class="lname"></i>
                    <div className="lastname">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id='lastName' onChange={this.handleChange} />
                    </div>
                    <div className="Level">
                        <InputLabel id="select-level">Level</InputLabel>
                        <Select labelId="select-level" id="level" value={this.state.level} onChange={this.handleChangeSelect}>
                            <MenuItem value={4}>D</MenuItem>
                            <MenuItem value={3}>C</MenuItem>
                            <MenuItem value={2}>B</MenuItem>
                            <MenuItem value={1}>A</MenuItem>
                            <MenuItem value={0}>Admin</MenuItem>
                        </Select>
                    </div>
                    <button className="Sign">Sign Up</button>
                    <div className="center red-text">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        userLevel: state.firebase.profile.userLevel,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
