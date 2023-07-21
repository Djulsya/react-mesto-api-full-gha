import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <button className="profile__avatar-editbutton" type="button" onClick={props.editAvatar}>
              <img className="profile__avatar link" src={currentUser.avatar} alt="Изображение аватара пользователя" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__editbutton link" type="button" onClick={props.editProfile}>
              </button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__addbutton link" type="button" onClick={props.addCard}></button>
      </section>
      <section className="elements">
        {props.elements.map((card) => { return (<Card key={card._id} card={card} onCardClick={props.openPhoto} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />) })}
      </section>
    </main>
  )
}

export default Main