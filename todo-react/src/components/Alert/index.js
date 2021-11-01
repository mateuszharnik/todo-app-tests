import React from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from '../../styles/Alert';

const Alert = ({ children, type = 'danger' }) => (
  <StyledAlert type={type} className="center-align">
    {children}
  </StyledAlert>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'danger',
};

export default Alert;
