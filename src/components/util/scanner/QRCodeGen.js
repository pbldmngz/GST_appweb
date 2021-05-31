import React, { Component } from 'react'
var QRCode = require('qrcode.react');


export default class QRCodeGen extends Component {
    render() {
        return (
            <div>
                <QRCode value="procesos" />
            </div>
        )
    }
}
