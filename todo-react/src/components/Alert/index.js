import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ children, type = 'danger' }) => (
  <div className={`center-align alert alert__${type}`}>{children}</div>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'danger',
};

export default Alert;
