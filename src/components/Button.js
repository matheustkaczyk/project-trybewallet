import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { itemName, onClick, disabled, testId, classN } = this.props;
    return (
      <button
        type="button"
        className={ classN }
        disabled={ disabled }
        onClick={ onClick }
        data-TestId={ testId }
      >
        {itemName}
      </button>
    );
  }
}

Button.propTypes = {
  itemName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classN: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  testId: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  testId: '',
};

export default Button;
