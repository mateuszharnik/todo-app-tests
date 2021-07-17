import React from 'react';
import PropTypes from 'prop-types';

const AuthWrapper = ({ children }) => (
  <div className="auth-wrapper">{children}</div>
);

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
