import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import AuthWrapper from '../../components/AuthWrapper';
import AuthPage from '../../components/AuthPage';
import Alert from '../../components/Alert';
import setTitle from '../../helpers/title';
import { getToken, setToken } from '../../helpers/token';
import { signInSchema } from '../../helpers/schemas';
import { signInUser } from '../../helpers/api/auth';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responseMessage: '',
    };

    this.sendForm = this.sendForm.bind(this);
  }

  componentDidMount() {
    setTitle('Zaloguj się');

    if (getToken()) {
      this.redirectToHomePage();
    }
  }

  redirectToHomePage() {
    const { history = {} } = this.props;

    history.push('/');
  }

  async sendForm(value = {}, { setSubmitting }) {
    setSubmitting(true);

    try {
      const { data } = await signInUser({ data: value });

      if (data) {
        setToken(data.token);
      }

      this.redirectToHomePage();
    } catch (error) {
      const { response = {} } = error || {};
      const { data = {} } = response;
      const { message: responseMessage = 'Błąd połączenia z serwerem.' } = data;

      this.setState({
        responseMessage,
      });
    }
  }

  render() {
    const { responseMessage } = this.state;

    return (
      <AuthWrapper>
        <header className="hide">
          <h2>Strona logowania</h2>
        </header>
        <AuthPage>
          <div className="auth-page__wrapper container">
            <header className="row">
              <h4 className="col s12 auth-page__title center-align">
                Zaloguj się
              </h4>
            </header>
            <div className="row">
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={signInSchema}
                onSubmit={this.sendForm}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="col s12">
                    <div className="row mb-0">
                      <div className="input-field col s12">
                        <Field
                          type="text"
                          className={`${
                            errors.username && touched.username ? 'invalid' : ''
                          }`}
                          id="username"
                          name="username"
                        />
                        <label htmlFor="username">Nazwa użytkownika</label>
                        <ErrorMessage
                          component="span"
                          name="username"
                          className="helper-text helper-text__error"
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          type="password"
                          className={`${
                            errors.password && touched.password ? 'invalid' : ''
                          }`}
                          id="password"
                          name="password"
                        />
                        <label htmlFor="password">Hasło</label>
                        <ErrorMessage
                          component="span"
                          name="password"
                          className="helper-text helper-text__error"
                        />
                      </div>
                      <div className="center-align col s12">
                        <button
                          className="waves-effect waves-light btn"
                          type="submit"
                          disabled={isSubmitting}
                          title={
                            isSubmitting ? 'Logowanie do konta' : 'Zaloguj się'
                          }
                        >
                          <span className="mr-2">
                            {isSubmitting ? 'Logowanie' : 'Zaloguj'}
                          </span>
                          <FontAwesomeIcon
                            icon={isSubmitting ? faCircleNotch : faPaperPlane}
                            spin={isSubmitting}
                          />
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            {responseMessage && (
              <div className="row">
                <div className="col s12">
                  <Alert>{responseMessage}</Alert>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col s12 center-align">
                Nie posiadasz konta?
                {' '}
                <Link to="/rejestracja">Utwórz konto</Link>
                .
              </div>
            </div>
          </div>
        </AuthPage>
      </AuthWrapper>
    );
  }
}

SignIn.propTypes = {
  history: shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SignIn);
