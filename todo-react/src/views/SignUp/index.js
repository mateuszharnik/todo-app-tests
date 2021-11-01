import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import AuthWrapper from '../../components/AuthWrapper';
import AuthPage from '../../components/AuthPage';
import Alert from '../../components/Alert';
import {
  StyledAuthPageWrapper,
  StyledAuthPageTitle,
} from '../../styles/AuthPage';
import setTitle from '../../helpers/title';
import { getToken } from '../../helpers/token';
import { signUpSchema } from '../../helpers/schemas';
import { signUpUserAction } from '../../store/auth/actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responseMessage: '',
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    const title = 'Zarejestruj się';
    const token = getToken();

    setTitle({ title });

    if (token) {
      this.redirectToHomePage();
    }
  }

  async handleSubmitForm(value = {}, { setSubmitting }) {
    const { signUpUser } = this.props;

    setSubmitting(true);

    try {
      await signUpUser({ data: value });

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

  redirectToHomePage() {
    const { history = {} } = this.props;

    history.push('/');
  }

  render() {
    const { responseMessage } = this.state;

    return (
      <AuthWrapper>
        <header className="hide">
          <h2>Strona rejestracji nowego konta</h2>
        </header>
        <AuthPage>
          <StyledAuthPageWrapper className="container">
            <header className="row">
              <StyledAuthPageTitle className="col s12 center-align">
                Zarejestruj się
              </StyledAuthPageTitle>
            </header>
            <div className="row">
              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirm_password: '',
                  gender: '',
                  terms_of_use_accepted: false,
                }}
                validationSchema={signUpSchema}
                onSubmit={this.handleSubmitForm}
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
                          type="email"
                          className={`${
                            errors.email && touched.email ? 'invalid' : ''
                          }`}
                          id="email"
                          name="email"
                        />
                        <label htmlFor="email">Adres email</label>
                        <ErrorMessage
                          component="span"
                          name="email"
                          className="helper-text helper-text__error"
                        />
                        <span className="helper-text">
                          Spokojnie, ten adres email nie musi nawet istnieć.
                        </span>
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
                      <div className="input-field col s12">
                        <Field
                          type="password"
                          className={`${
                            errors.confirm_password && touched.confirm_password
                              ? 'invalid'
                              : ''
                          }`}
                          id="confirm_password"
                          name="confirm_password"
                        />
                        <label htmlFor="confirm_password">Powtórz hasło</label>
                        <ErrorMessage
                          component="span"
                          name="confirm_password"
                          className="helper-text helper-text__error"
                        />
                      </div>
                      <div className="radio-field col s12 center-align">
                        <span className=" mr-4">
                          <label htmlFor="male">
                            <Field
                              type="radio"
                              className={`with-gap${
                                errors.gender && touched.gender
                                  ? ' invalid'
                                  : ''
                              }`}
                              name="gender"
                              value="male"
                              id="male"
                            />
                            <span>Mężczyzna</span>
                          </label>
                        </span>
                        <span>
                          <label htmlFor="female">
                            <Field
                              type="radio"
                              className={`with-gap${
                                errors.gender && touched.gender
                                  ? ' invalid'
                                  : ''
                              }`}
                              name="gender"
                              value="female"
                              id="female"
                            />
                            <span>Kobieta</span>
                          </label>
                        </span>
                        <ErrorMessage
                          component="div"
                          name="gender"
                          className="helper-text helper-text__error"
                        />
                      </div>
                      <div className="checkbox-field col s12 center-align">
                        <label htmlFor="terms_of_use_accepted">
                          <Field
                            type="checkbox"
                            className={`filled-in${
                              errors.terms_of_use_accepted
                              && touched.terms_of_use_accepted
                                ? ' invalid'
                                : ''
                            }`}
                            id="terms_of_use_accepted"
                            name="terms_of_use_accepted"
                          />
                          <span className="mb-2">Akceptuję regulamin</span>
                        </label>
                        <ErrorMessage
                          component="div"
                          name="terms_of_use_accepted"
                          className="helper-text helper-text__error"
                        />
                      </div>
                      <div className="col s12 center-align">
                        <button
                          className="waves-effect waves-light btn"
                          type="submit"
                          disabled={isSubmitting}
                          title={
                            isSubmitting
                              ? 'Rejestracja w toku'
                              : 'Zarejestruj się'
                          }
                        >
                          <span className="mr-2">
                            {isSubmitting ? 'Rejestrowanie' : 'Zarejestruj'}
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
                Masz już konto?
                {' '}
                <Link to="/zaloguj">Zaloguj się</Link>
                .
              </div>
            </div>
          </StyledAuthPageWrapper>
        </AuthPage>
      </AuthWrapper>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signUpUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signUpUser: ({ data }) => dispatch(signUpUserAction({ data })),
});

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
