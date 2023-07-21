import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setTitle] = React.useState(" ");
  const [link, setLink] = React.useState(" ");

  React.useEffect(() => {
    setTitle(" ");
    setLink(" ");
  }, [props.popupOpen]);

  function handleName(event) { setTitle(event.target.value) }
  function handleLink(event) { setLink(event.target.value) }
  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({ name, link })
  }

  return (

    <PopupWithForm
      name="addphoto"
      popupTitle="Новое место"
      button="Создать"
      popupOpen={props.popupOpen}
      popupClose={props.popupClose}
      onSubmit={handleSubmit}>
      <input className="popup__input popup__input-addphoto popup__input-addphoto_type_title"
        id="photoname-input" type="text" name="title" placeholder="Название"
        minLength="2" maxLength="30" required value={name}
        onChange={handleName} />
      <span className="popup__input-error popup__input-error_type_title"></span>
      <input className="popup__input popup__input-addphoto popup__input-addphoto_type_link"
        id="photourl-input" type="url" name="link" placeholder="Ссылка на картинку" required value={link}
        onChange={handleLink} />
      <span className="popup__input-error popup__input-error_type_link"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup

