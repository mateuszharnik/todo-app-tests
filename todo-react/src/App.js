import React, { Component, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './views/Home';
import M from '../node_modules/materialize-css/dist/js/materialize.min';

M.AutoInit();

const NotFoundPage = lazy(() => import('./views/NotFound'));
const SignInPage = lazy(() => import('./views/SignIn'));
const SignUpPage = lazy(() => import('./views/SignUp'));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <h1 className="hide">ToDo App</h1>
        <Router>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/rejestracja" exact component={SignUpPage} />
              <Route path="/zaloguj" exact component={SignInPage} />
              <Route path="/404" exact component={NotFoundPage} />
              <Route path="/" component={HomePage} />
              <Redirect from="*" to="/404" />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
