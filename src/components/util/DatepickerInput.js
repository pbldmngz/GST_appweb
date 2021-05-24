// import React from 'react';

// const DatepickerInput = ({ ...props }) => {
//     return (
//         <input type="text" {...props} readOnly />
//     );
// }

// export default DatepickerInput;


import React, { Component } from 'react'

export default class DatepickerInput extends Component {
    render() {
        return (
            <input type="text" {...this.props} readOnly />
        )
    }
}
