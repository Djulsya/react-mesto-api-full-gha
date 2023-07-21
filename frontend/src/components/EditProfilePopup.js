import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(" ");
  const [description, setUserDescription] = React.useState(" ");

  React.useEffect(() => {
    setName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [currentUser, props.popupOpen]);

  function handleName(name) { setName(name.target.value) }
  function handleDescription(description) { setUserDescription(description.target.value) }
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name, about: description
    });
  }

  return (

    <PopupWithForm
      name="profile"
      popupTitle="Редактировать профиль"
      button="Сохранить"
      popupOpen={props.popupOpen}
      popupClose={props.popupClose}
      onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_name"
        id="profilename-input" type="text" name="name" placeholder="Имя"
        minLength="2" maxLength="40" required value={name}
        onChange={handleName} />
      <span className="popup__input-error popup__input-error_type_name"></span>
      <input className="popup__input popup__input_type_about"
        id="profileabout-input" type="text" name="about" placeholder="О себе"
        minLength="2" maxLength="200" required value={description}
        onChange={handleDescription} />
      <span className="popup__input-error popup__input-error_type_about"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup