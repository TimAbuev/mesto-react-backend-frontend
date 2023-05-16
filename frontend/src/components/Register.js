import React from "react";
import { Link } from "react-router-dom";
import '../components/styles/Register.css';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleRegisterSubmit(password, email);
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2 className="register__header">Регистрация</h2>
        <input name="email" className="register__input" type="text" minLength="2" maxLength="40" placeholder="Email"
          onChange={handleChangeEmail} value={email} required/>
        {/* <span className="error input-name-error"></span> */}

        <input name="password" className="register__input" type="password" placeholder="Пароль"
          onChange={handleChangePassword} value={password} required/>
        {/* <span class="error input-link-error"></span> */}

        <button className="register__button" type="submit">Зарегистрироваться</button>
        <p className="register__capture">Уже зарегистрированы?
          <Link to="/sign-in" className="register__btn-enter"> Войти</Link>
        </p>
      </form>
    </div>

  );
}

export default Register;