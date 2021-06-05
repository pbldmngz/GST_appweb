import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { editIdioma } from '../../store/actions/idiomaActions'


class CambiarIdioma extends Component {

    state = {
        lang: this.props.lang
    }

    handleChange = (event) => {
        this.setState({
            lang: event.target.value
        }, 
        this.props.editIdioma(this.props.auth.uid, event.target.value));
    };

    render() {

        return (
            <Select
                labelId="select-filter"
                id="filter"
                value={this.state.lang}
                onChange={this.handleChange}
                style={{marginLeft: `${10}px`}}
            >
                <MenuItem value={"english"}>English</MenuItem>
                <MenuItem value={"spanish"}>Español</MenuItem>
            </Select>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.firebase.profile.lang,
        auth: state.firebase.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        editIdioma: (uid, idioma) => dispatch(editIdioma(uid, idioma)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(CambiarIdioma))