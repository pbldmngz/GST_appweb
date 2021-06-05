import React, { Component } from 'react'


export default class DatepickerInput extends Component {
    render() {
        return (
            <input type="text" {...this.props} readOnly />
        )
    }
}
