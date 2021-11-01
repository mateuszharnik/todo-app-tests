import React from 'react';
import PropTypes from 'prop-types';
import StyledAuthWrapper from '../../styles/AuthWrapper';

const AuthWrapper = ({ children }) => (
  <StyledAuthWrapper>{children}</StyledAuthWrapper>
);

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
