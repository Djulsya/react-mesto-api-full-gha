import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__button-delete link ${!isOwn && 'element__button-delete_on'}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button-like link ${isLiked ? 'element__button-like_active' : " "}`
  );

  function handleClick() { props.onCardClick(props.card) }
  function handleLikeClick() { props.onCardLike(props.card) }
  function handleDeleteClick() { props.onCardDelete(props.card) }

  return (
    <div className="element">
      <img className="element__photo link" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      {isOwn && <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />}
      <div className="element__content">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__button">
          <button className={cardLikeButtonClassName} type="button" name="like-button" onClick={handleLikeClick} />
          <span className="element__button-quantity">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card