import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min';
import HomePage from './views/Home';
import Spinner from './components/Spinner';
import { fetchUserAction } from './store/user/actions';
import { decodeToken, getToken, removeToken } from './helpers/token';

M.AutoInit();

const NotFoundPage = lazy(() => import('./views/NotFound'));
const SignInPage = lazy(() => import('./views/SignIn'));
const SignUpPage = lazy(() => import('./views/SignUp'));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { fetchUser } = this.props;
    const token = getToken();

    if (!token) {
      this.setState({
        isLoading: false,
      });

      return;
    }

    const { id = '' } = decodeToken({ token });

    try {
      await fetchUser({ id, token });

      this.setState({
        isLoading: false,
      });
    } catch (error) {
      removeToken();

      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="app">
        <h1 className="hide">ToDo App</h1>
        {isLoading ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: ({ id, token }) => dispatch(fetchUserAction({ id, token })),
});

export default connect(null, mapDispatchToProps)(App);
