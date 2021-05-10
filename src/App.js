import Navbar from './components/layout/Navbar';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DashboardAuditorias from './components/auditorias/DashboardAuditorias'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CrearAuditoria from './components/auditorias/CrearAuditoria'
import DashboardPreguntas from './components/preguntas/DashboardPreguntas'
import CrearPregunta from './components/preguntas/CrearPregunta'
import DetallesPregunta from './components/preguntas/DetallesPregunta';
import DetallesAuditoria from './components/auditorias/DetallesAuditoria';
import ResponderAuditoria from './components/auditorias/ResponderAuditoria';
import DetallesPreguntasAuditoria from './components/preguntas/DetallesPreguntasAuditoria';
import EditarPregunta from './components/preguntas/EditarPregunta';
import DetallesPreguntaIndividual from './components/preguntas/DetallesPreguntaIndividual';
import ChangePassword from './components/auth/ChangePassword';
import Profile from './components/util/Profile';

class App extends Component {
  render() {
    var { path } = require('./config/config');

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={path.auditorias} component={DashboardAuditorias}/>
            <Route path={path.auditoria} component={DetallesAuditoria} />
            <Route path={path.profile} component={Profile} />
            <Route path={path.sign_in} component={SignIn} />
            <Route path={path.sign_up} component={SignUp} />
            <Route path={path.responder_auditoria_redirect} component={ResponderAuditoria} />
            <Route path={path.crear_auditoria} component={CrearAuditoria} />
            <Route path={path.preguntas} component={DashboardPreguntas} />
            <Route path={path.crear_pregunta} component={CrearPregunta} />
            <Route path={path.preguntas_detalles_redirect} component={DetallesPregunta} />
            <Route path={path.detalles_preguntas_auditoria_redirect} component={DetallesPreguntasAuditoria} />
            <Route path={path.editar_pregunta_redirect} component={EditarPregunta} />
            <Route path={path.detalles_pregunta_auditoria_redirect} component={DetallesPreguntaIndividual} />
            <Route path={path.change_password} component={ChangePassword} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
