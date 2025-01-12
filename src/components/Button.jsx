// Button.jsx
//eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";

const Button = ({ style, text, onClick }) => {
  return (
    <button className={`${style} px-4 py-2 rounded text-sm`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  style: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
