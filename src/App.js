import Navbar from './components/layout/Navbar';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './components/layout/Dashboard'
import ResponderAuditoria from './components/auditorias/ResponderAuditoria'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CrearAuditoria from './components/auditorias/CrearAuditoria'

class App extends Component {
  render() {
    var { path } = require('./config/config');

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={path.areas} component={Dashboard}/>
            <Route path={path.respoder_auditorias} component={ResponderAuditoria} />
            <Route path={path.sign_in} component={SignIn} />
            <Route path={path.sign_up} component={SignUp} />
            <Route path={path.crear_auditoria} component={CrearAuditoria} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
