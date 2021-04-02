import './style/App.css';
import TarjetasVista from './TarjetasVista'
import React, { Component } from 'react';

class App extends Component {
  state = {
    tarjetas: [
      {
        id: 0,
        titulo: "Morado",
        alerta: "!!",
        auditor: "Julio Iglesias",
        fecha: "20 de Marzo"
      },
      {
        id: 1,
        titulo: "Amarillo",
        alerta: "PW",
        auditor: "Peña Nieto",
        fecha: "5 de Noviembre"
      },
      {
        id: 2,
        titulo: "Rojo",
        alerta: "PW",
        auditor: "Red John",
        fecha: "6 de Junio"
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <TarjetasVista tarjetas={ this.state.tarjetas }/>
      </div>
    );
  }
}

export default App;
