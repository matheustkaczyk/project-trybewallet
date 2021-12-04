/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import SelectApi from '../components/SelectApi';
import SelectPayment from '../components/SelectPayment';
import SelectTag from '../components/SelectTag';
import Button from '../components/Button';
import { fetchCurrent } from '../actions';
import Table from '../components/Table';
import goldCoin from '../goldCoin.png';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.submitState = this.submitState.bind(this);
  }

  handleInputs({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // lógica feita com auxilio de meu colega Rodrigo Merlone
  sum() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      (sum) += (Number(value) * exchangeRates[currency].ask);
    });
    return sum.toFixed(2);
  }

  submitState() {
    const { fetchCotacao } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    fetchCotacao(this.state);
  }

  render() {
    const { emailState } = this.props;
    const {
      currenciesKeys, value, description, currency, method, tag } = this.state;
    return (
      <>
        <header className="wallet-header">
          <h3
            className="header-item-email"
            data-testid="email-field"
          >
            { `E-mail: ${emailState}` }
          </h3>
          <h3 className="header-item-value" data-testid="total-field" label="Valor">{`R$ ${this.sum()}`}</h3>
          <h3 className="header-item-currency" data-testid="header-currency-field">BRL</h3>
          <img className="header-coin" src={ goldCoin } alt="coin" />
        </header>
        <form className="form-wallet">
          <Input
            type="number"
            onChange={ this.handleInputs }
            classL="input-item-label"
            value={ value }
            label="Valor"
            name="value"
          />
          <Input
            type="text"
            onChange={ this.handleInputs }
            classL="input-item-label"
            value={ description }
            label="Descrição"
            name="description"
          />
          <SelectApi
            onChange={ this.handleInputs }
            classL="input-item-label"
            value={ currency }
            endpoint={ currenciesKeys }
          />
          <SelectPayment
            value={ method }
            classL="input-item-label"
            onChange={ this.handleInputs }
          />
          <SelectTag
            value={ tag }
            classL="input-item-label"
            onChange={ this.handleInputs }
          />
          <Button onClick={ this.submitState } itemName="Adicionar despesa" />
        </form>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  emailState: PropTypes.string.isRequired,
  fetchCotacao: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCotacao: (currencies) => dispatch(fetchCurrent(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
