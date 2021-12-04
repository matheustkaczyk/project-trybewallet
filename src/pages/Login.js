import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';
import { user } from '../actions';
import '../index.css';
import goldCoin from '../goldCoin.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.inputValidation = this.inputValidation.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.inputValidation();
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const passwordRegex = /^[\S*]{5,}$/;
    const testEmail = emailRegex.test(email);
    const testPassword = passwordRegex.test(password);
    if ((testEmail) && (testPassword)) {
      this.setState({
        disabled: false,
      });
    }
  }

  submitForm() {
    const { history, userAction } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    userAction(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    const classN = 'btn-login';
    return (
      <div className="container">
        <form className="form-container">
          <Input
            type="text"
            name="email"
            classN="form-item"
            classL="label-text"
            label="Insira o seu e-mail: "
            testId="email-input"
            value={ email }
            onChange={ this.handleInput }
          />
          <Input
            type="password"
            name="password"
            classN="form-item"
            classL="label-text"
            label="Insira a sua senha: "
            value={ password }
            testId="password-input"
            onChange={ this.handleInput }
          />
          <Button
            itemName="Entrar"
            classN={ disabled ? classN : 'approved' }
            onClick={ this.submitForm }
            disabled={ disabled }
          />
        </form>
        <div className="hero-container">
          <img className="coin-form" src={ goldCoin } alt="coin" />
          <h2 className="hero-text">
            Os seus gastos, em um só lugar!
          </h2>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userAction: (email) => dispatch(user(email)),
});

export default connect(null, mapDispatchToProps)(Login);
