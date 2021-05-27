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
import EditarAuditoria from './components/auditorias/EditarAuditoria';
// import MainProceso from './components/auditorias/MainProceso';
// import Areas from './components/auditorias/Areas';
import Area from './components/areas&procesos/Area'
import Proceso from './components/areas&procesos/Proceso'
import DashboardProcesos from './components/areas&procesos/DashboardProcesos'
import DashboardAreas from './components/areas&procesos/DashboardAreas'
import SelectorHerramientas from './components/herramientas/SelectorHerramientas';


class App extends Component {
  render() {
    var { path } = require('./config/config');

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/herramientas" component={SelectorHerramientas} />
            <Route exact path={path.auditorias} component={DashboardAuditorias} />
            <Route exact path={"/auditorias/:proceso/:area"} component={DashboardAuditorias} />
            {/* <Route path={path.mainproceso} component={MainProceso}/>
            <Route path={path.areas} component={Areas}/> */}
            <Route path={path.auditoria} component={DetallesAuditoria} />
            <Route path={path.profile} component={Profile} />
            <Route path={path.sign_in} component={SignIn} />
            <Route path={path.sign_up} component={SignUp} />
            <Route path={path.responder_auditoria_redirect} component={ResponderAuditoria} />
            <Route exact path={path.crear_auditoria} component={CrearAuditoria} />
            {/* <Route exact path={path.crear_auditoria + "/:proceso/:area"} component={CrearAuditoria} /> */}
            <Route path={path.crear_auditoria + "/:id"} component={CrearAuditoria} />
            <Route path={"/crear-auditoria-props/:proceso/:area"} component={CrearAuditoria} />
            <Route path={path.preguntas} component={DashboardPreguntas} />
            <Route path={path.crear_pregunta} component={CrearPregunta} />
            <Route path={path.preguntas_detalles_redirect} component={DetallesPregunta} />
            <Route path={path.detalles_preguntas_auditoria_redirect} component={DetallesPreguntasAuditoria} />
            <Route path={path.editar_pregunta_redirect} component={EditarPregunta} />
            <Route path={path.detalles_pregunta_auditoria_redirect} component={DetallesPreguntaIndividual} />
            <Route path={path.change_password} component={ChangePassword} />
            <Route path={path.editar_auditoria_redirect} component={EditarAuditoria} />
            <Route exact path="/crear-area" component={Area} />
            <Route exact path="/crear-area-props/:proceso" component={Area} />
            <Route path="/crear-area/:id" component={Area} />
            <Route exact path="/crear-proceso" component={Proceso} />
            <Route path="/crear-proceso/:id" component={Proceso} />
            <Route path="/procesos" component={DashboardProcesos} />
            <Route exact path="/areas" component={DashboardAreas} />
            <Route path="/areas/:proceso" component={DashboardAreas} />
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
