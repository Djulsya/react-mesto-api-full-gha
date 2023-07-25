/* eslint-disable no-undef */
import logo from '../images/headerlogo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  function signOut() {
    localStorage.removeItem('isAuth');
    props.onLogout()
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сервиса место" />
      <span className="header__email">{props.email}</span>
      <div className="header__form">
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link link">Регистрация</Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link link">Войти</Link>
        )}
        {location.pathname === '/' && (
          <Link to="/sign-in" className="header__out link" onClick={() => signOut()}>Выйти</Link>
        )}
      </div>
    </header>
  )
}

export default Header
