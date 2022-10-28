import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Button = ({ className, content, onClick, disabled = false }) => (
  <button
    className={className ? `${className} button` : 'button'}
    onClick={onClick}
    disabled={disabled}
  >
    {content}
  </button>
);

Button.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
