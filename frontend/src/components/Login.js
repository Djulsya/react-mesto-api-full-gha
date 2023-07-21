import React from 'react';

function Login(props) { 
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
     props.onLogin(email, password);
   }

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">Вход</h2>
        <form className="authorization__form" name="login" id="login-form" onSubmit={handleSubmit}>
          <input className="authorization__input" name="login-email" type="email" id="login-email" placeholder="Email" required value={email} onChange={handleSetEmail} />
          <input className="authorization__input" name="login-password" type="password" id="login-password" placeholder="Пароль" required value={password} onChange={handleSetPassword} />
          <button className="authorization__savebutton link" type="submit" id="login-savebutton">Войти</button>
        </form>
      </div>
    </section>
  )
}

export default Login