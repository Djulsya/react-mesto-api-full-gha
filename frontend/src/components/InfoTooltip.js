import React from 'react';
import okForm from '../images/OkForm.svg';
import errorForm from '../images/ErrorForm.svg';

function InfoToolTip(props) {
  return (
    <section className={`popup ${props.popupOpen ? "popup_opened" : " "}`}>
      <div className="popup__container-info">
        <button className="popup__closebutton link" type="button" onClick={props.popupClose}></button>
        <img className="popup__errorimage" src={`${props.isSuccess ? okForm : errorForm}`} 
        alt={`${props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`} />
      </div>
    </section>
  );
}

export default InfoToolTip