import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { clearAction } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, clearExpense } = this.props;
    return (
      <table className="table-container">
        <thead className="table-header">
          <tr className="table-line">
            <th className="table-item">Descrição</th>
            <th className="table-item">Tag</th>
            <th className="table-item">Método de pagamento</th>
            <th className="table-item">Valor</th>
            <th className="table-item">Moeda</th>
            <th className="table-item">Câmbio utilizado</th>
            <th className="table-item">Valor convertido</th>
            <th className="table-item">Moeda de conversão</th>
            <th className="table-item">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {
            expenses.map(
              ({ id, description, tag, method, value, currency, exchangeRates }) => (
                <tr key={ id }>
                  <td className="answer-item">{description}</td>
                  <td className="answer-item">{tag}</td>
                  <td className="answer-item">{method}</td>
                  <td className="answer-item">{value}</td>
                  <td className="answer-item">{exchangeRates[currency].name.replace('/Real Brasileiro', '')}</td>
                  <td className="answer-item">{(exchangeRates[currency].ask * 1).toFixed(2)}</td>
                  <td className="answer-item">{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td className="answer-item">Real</td>
                  <td className="answer-item">
                    <Button itemName="Editar" />
                    <Button testId="delete-btn" onClick={ () => clearExpense(id) } itemName="Excluir" />
                  </td>
                </tr>
              ),
            )
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  clearExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  clearExpense: (id) => dispatch(clearAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
