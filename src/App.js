import Navbar from './components/layout/Navbar';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './components/layout/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ResponderAuditoria from './components/auditorias/ResponderAuditoria'
import CrearAuditoria from './components/auditorias/CrearAuditoria'
import DashboardPreguntas from './components/preguntas/DashboardPreguntas'
import CrearPregunta from './components/preguntas/CrearPregunta'
import DetallesPregunta from './components/preguntas/DetallesPregunta';

class App extends Component {
  render() {
    var { path } = require('./config/config');

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={path.auditorias} component={Dashboard}/>
            <Route path={path.auditoria} component={ResponderAuditoria} />
            <Route path={path.sign_in} component={SignIn} />
            <Route path={path.sign_up} component={SignUp} />
            <Route path={path.crear_auditoria} component={CrearAuditoria} />
            <Route path={path.preguntas} component={DashboardPreguntas} />
            <Route path={path.crear_pregunta} component={CrearPregunta} />
            <Route path={path.pregunta_detalles} component={DetallesPregunta} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
