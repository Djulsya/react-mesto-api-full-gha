import React from "react";
import { NavLink } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function handleSetEmail(event) {
    setEmail(event.target.value);
  }

  function handleSetPassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">Регистрация</h2>
        <form className="authorization__form" name="register" id="register-form" onSubmit={handleSubmit}>
          <input className="authorization__input" name="email" id="register-email" type="email" placeholder="Введите Ваш Email" required value={email} onChange={handleSetEmail} />
          <input className="authorization__input" name="password" id="register-password" type="password" placeholder="Придумайте пароль" required value={password} onChange={handleSetPassword} />
          <button className="authorization__savebutton link" type="submit" id="register-savebutton">Зарегистрироваться</button>
          <NavLink to="/sign-in" className={({ authorization__entrybutton, link }) => ({ authorization__entrybutton, link } ? " authorization__entrybutton link" : "")}>
            Уже зарегистрированы? Войти
          </NavLink>
        </form>
      </div>
    </section>
  )
}

export default Register