import React from 'react';
import PropTypes from 'prop-types';

const AuthPage = ({ children }) => (
  <section className="auth-page">{children}</section>
);

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPage;
