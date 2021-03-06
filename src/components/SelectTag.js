import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectTag extends Component {
  render() {
    const { tag, onChange, classL } = this.props;
    return (
      <label className={ classL } htmlFor="tag">
        Tag
        <select value={ tag } name="tag" onChange={ onChange } id="tag">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }
}

SelectTag.propTypes = {
  tag: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classL: PropTypes.string.isRequired,
};

export default SelectTag;
