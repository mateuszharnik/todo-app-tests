import React, { Component, Suspense } from 'react';
import PropTypes, { shape } from 'prop-types';
import {
  Redirect, Route, Switch, Link,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Dahsboard from '../Dahsboard';
import setTitle from '../../helpers/title';
import { decodeToken, getToken, removeToken } from '../../helpers/token';
import { fetchAndSetUser } from '../../store/user/actions';
import Spinner from '../../components/Spinner';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    setTitle('Tablice');

    this.redirectToSignInPage();

    const token = getToken();

    if (token) {
      this.fetchUser(token);
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  async fetchUser(token = '') {
    const { handleFetchAndSetUser } = this.props;

    const { id = '' } = decodeToken(token);

    try {
      await handleFetchAndSetUser({ id, token });
    } catch (error) {
      removeToken();
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  redirectToSignInPage() {
    const { history = {} } = this.props;

    if (!getToken()) {
      removeToken();

      history.push('/zaloguj');
    }
  }

  render() {
    const { isLoading } = this.state;
    const { user } = this.props;

    return (
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {user ? `Witaj ${user.username}!` : 'Home Page'}
            <ul>
              <li>
                <Link to="/">Strona główna</Link>
              </li>
              <li>
                <Link to="/404">404</Link>
              </li>
              <li>
                <Link to="/zaloguj">Zaloguj się</Link>
              </li>
              <li>
                <Link to="/rejestracja">Rejestracja</Link>
              </li>
            </ul>
            <Suspense fallback={<div />}>
              <Switch>
                <Route path="/" exact component={Dahsboard} />
                <Redirect from="*" to="/404" />
              </Switch>
            </Suspense>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    deleted_at: PropTypes.number,
  }),
  history: shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleFetchAndSetUser: PropTypes.func.isRequired,
};

Home.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleFetchAndSetUser: (id = '', token = '') => {
    dispatch(fetchAndSetUser({ id, token }));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
