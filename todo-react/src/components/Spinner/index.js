import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import StyledSpinner from '../../styles/Spinner';

const Spinner = ({ size, center }) => {
  const spinnerClass = center ? 'center' : '';

  return (
    <StyledSpinner className={spinnerClass}>
      <FontAwesomeIcon icon={faCircleNotch} size={size} spin />
    </StyledSpinner>
  );
};

Spinner.propTypes = {
  size: PropTypes.string,
  center: PropTypes.bool,
};

Spinner.defaultProps = {
  size: '3x',
  center: true,
};

export default Spinner;
