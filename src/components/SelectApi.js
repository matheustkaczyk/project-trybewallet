import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor() {
    super();

    this.state = {
      currency: [],
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const fetchApi = await fetch(url);
    const response = await fetchApi.json();
    this.setState({
      currency: Object.keys(response).filter((coin) => coin !== 'USDT'),
    });
  }

  render() {
    const { value, onChange, classL } = this.props;
    const { currency } = this.state;
    return (
      <label className={ classL } htmlFor="currency">
        Moeda
        <select value={ value } name="currency" id="currency" onChange={ onChange }>
          { currency.map((coin) => (
            <option
              key={ coin }
            >
              { coin }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classL: PropTypes.string.isRequired,
};

export default Select;
