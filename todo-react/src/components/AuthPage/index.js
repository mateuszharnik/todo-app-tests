import React from 'react';
import PropTypes from 'prop-types';
import { StyledAuthPage } from '../../styles/AuthPage';

const AuthPage = ({ children }) => (
  <StyledAuthPage>{children}</StyledAuthPage>
);

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPage;
