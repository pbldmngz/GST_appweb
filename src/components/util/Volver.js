import { withRouter } from "react-router";
import { connect } from 'react-redux'

import React, { Component } from 'react'

class Volver extends Component {

    move = () => {
        if (this.props.where) {
            this.props.history.push(this.props.where)
        } else {
            this.props.history.push("/")
        }
    }

    render() {
        const {lang} = this.props
        const text = require('../../config/language');


        return lang ? (
            <button 
                className="return" 
                onClick={() => {this.move()}}
            >
                {text[lang].return}
            </button>
        ) : null
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.firebase.profile.lang,
    }
}

export default connect(mapStateToProps)(withRouter(Volver));