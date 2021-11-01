import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import Boards from '../Boards';
import Spinner from '../../components/Spinner';
import Navbar from '../../components/Navbar';
import { decodeToken, getToken, removeToken } from '../../helpers/token';
import { fetchUserAction } from '../../store/user/actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const token = getToken();

    if (!token) {
      this.redirectToSignInPage();

      return;
    }

    this.handleFetchUser({ token });
  }

  async handleFetchUser({ token = '' }) {
    const { fetchUser } = this.props;
    const { id = '' } = decodeToken({ token });

    try {
      const { status = 0 } = await fetchUser({ id, token });

      if (status !== 200) {
        removeToken();

        this.redirectToSignInPage();

        return;
      }

      this.setState({
        isLoading: false,
      });
    } catch (error) {
      removeToken();

      this.redirectToSignInPage();
    }
  }

  redirectToSignInPage() {
    const { history = {} } = this.props;

    history.push('/zaloguj');
  }

  render() {
    const { isLoading = true } = this.state;

    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Navbar />
            <div role="main" className="top-space">
              <Suspense fallback={<div />}>
                <Switch>
                  <Route path="/" exact component={Boards} />
                  <Redirect from="*" to="/404" />
                </Switch>
              </Suspense>
            </div>
          </>
        )}
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: ({ id = '', token = '' }) => dispatch(fetchUserAction({ id, token })),
});

export default withRouter(connect(null, mapDispatchToProps)(Home));
