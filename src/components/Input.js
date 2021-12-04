import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, testId, onChange, value, classN, classL } = this.props;
    return (
      <label className={ classL } htmlFor={ name }>
        { label }
        <input
          type={ type }
          className={ classN }
          name={ name }
          id={ name }
          data-testid={ testId }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classN: PropTypes.string.isRequired,
  classL: PropTypes.string.isRequired,
  testId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

Input.defaultProps = {
  testId: null,
};

export default Input;
