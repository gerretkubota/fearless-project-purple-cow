import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ content, onClick, disable }) => (
  <button onClick={onClick}>{content}</button>
);

Button.propTypes = {
  content: PropTypes.string,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
